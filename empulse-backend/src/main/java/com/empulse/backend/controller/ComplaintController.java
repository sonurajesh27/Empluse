package com.empulse.backend.controller;

import com.empulse.backend.entity.AuditLog;
import com.empulse.backend.entity.Complaint;
import com.empulse.backend.repository.AuditLogRepository;
import com.empulse.backend.repository.ComplaintRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final AuditLogRepository auditLogRepository;

    public ComplaintController(ComplaintRepository complaintRepository, AuditLogRepository auditLogRepository) {
        this.complaintRepository = complaintRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @PostMapping
    public ResponseEntity<Complaint> create(@RequestBody Complaint complaint) {
        if (complaint.getStatus() == null) {
            complaint.setStatus("pending");
        }
        if (complaint.getBiasFlag() == null) {
            complaint.setBiasFlag("none");
        }
        Complaint saved = complaintRepository.save(complaint);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAll(
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {

        List<Complaint> complaints;

        if (sector != null && !sector.isBlank()) {
            complaints = complaintRepository.findBySector(sector);
        } else if (status != null && !status.isBlank()) {
            complaints = complaintRepository.findByStatus(status);
        } else {
            complaints = complaintRepository.findAll();
        }

        if (category != null && !category.isBlank()) {
            complaints = complaints.stream()
                    .filter(c -> category.equalsIgnoreCase(c.getCategory()))
                    .toList();
        }

        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getById(@PathVariable UUID id) {
        return complaintRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/escalate")
    public ResponseEntity<Complaint> escalate(@PathVariable UUID id) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setStatus("escalated");
                    Complaint saved = complaintRepository.save(complaint);

                    auditLogRepository.save(AuditLog.builder()
                            .actor("System")
                            .actorRole("Auto-escalation")
                            .action("Complaint escalated")
                            .target(complaint.getSector() + " - " + complaint.getCategory())
                            .complaintId(id.toString())
                            .severity("warning")
                            .build());

                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Complaint> resolve(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setStatus("resolved");
                    complaint.setResolvedBy(body.getOrDefault("resolvedBy", "Unknown"));
                    complaint.setResolvedAt(LocalDateTime.now());
                    Complaint saved = complaintRepository.save(complaint);

                    auditLogRepository.save(AuditLog.builder()
                            .actor(body.getOrDefault("resolvedBy", "Unknown"))
                            .actorRole("Admin")
                            .action("Complaint resolved")
                            .target(complaint.getSector() + " - " + complaint.getCategory())
                            .complaintId(id.toString())
                            .severity("info")
                            .build());

                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Complaint> confirm(@PathVariable UUID id, @RequestBody Map<String, Object> body) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    Boolean confirmed = (Boolean) body.get("confirmed");
                    complaint.setWorkerConfirmed(confirmed);

                    if (Boolean.FALSE.equals(confirmed)) {
                        complaint.setStatus("pending");
                        complaint.setBiasFlag("fake-resolution");

                        auditLogRepository.save(AuditLog.builder()
                                .actor("Anonymous Worker")
                                .actorRole("Employee")
                                .action("Denied resolution — issue not fixed")
                                .target(complaint.getSector() + " - " + complaint.getCategory())
                                .complaintId(id.toString())
                                .severity("warning")
                                .build());

                        auditLogRepository.save(AuditLog.builder()
                                .actor("EmPulse AI")
                                .actorRole("System")
                                .action("Fake resolution flagged")
                                .target(complaint.getSector() + " - " + complaint.getCategory())
                                .complaintId(id.toString())
                                .severity("critical")
                                .build());
                    } else {
                        auditLogRepository.save(AuditLog.builder()
                                .actor("Anonymous Worker")
                                .actorRole("Employee")
                                .action("Worker confirmed resolution")
                                .target(complaint.getSector() + " - " + complaint.getCategory())
                                .complaintId(id.toString())
                                .severity("info")
                                .build());
                    }

                    Complaint saved = complaintRepository.save(complaint);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
