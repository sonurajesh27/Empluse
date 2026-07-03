package com.empulse.backend;

import com.empulse.backend.entity.*;
import com.empulse.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final ComplaintRepository complaintRepository;
    private final RewardRepository rewardRepository;
    private final AuditLogRepository auditLogRepository;

    public DataSeeder(EmployeeRepository employeeRepository, ComplaintRepository complaintRepository,
                      RewardRepository rewardRepository, AuditLogRepository auditLogRepository) {
        this.employeeRepository = employeeRepository;
        this.complaintRepository = complaintRepository;
        this.rewardRepository = rewardRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public void run(String... args) {
        if (employeeRepository.count() > 0) {
            return;
        }

        seedEmployees();
        seedComplaints();
        seedRewards();
        seedAuditLogs();

        System.out.println("✅ Database seeded successfully!");
    }

    private void seedEmployees() {
        employeeRepository.save(Employee.builder().employeeCode("EMP-1001").name("Ravi Kumar").sector("Assembly Line A").role("employee").roleType("non-technical").pin("1001").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1002").name("Meena S.").sector("Packaging").role("employee").roleType("non-technical").pin("1002").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1003").name("Arjun P.").sector("Quality Control").role("employee").roleType("technical").pin("1003").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1004").name("Suresh M.").sector("Welding").role("employee").roleType("technical").pin("1004").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1005").name("Lakshmi R.").sector("Paint Shop").role("employee").roleType("non-technical").pin("1005").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1006").name("Dinesh K.").sector("Maintenance").role("employee").roleType("technical").pin("1006").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1007").name("Kavitha N.").sector("Assembly Line B").role("employee").roleType("non-technical").pin("1007").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-1008").name("Muthu R.").sector("Warehouse").role("employee").roleType("non-technical").pin("1008").build());
        employeeRepository.save(Employee.builder().employeeCode("EMP-2001").name("Priya HR").sector("HR").role("hr").roleType("technical").pin("2001").build());
        employeeRepository.save(Employee.builder().employeeCode("ADM-001").name("Murugan A.").sector("Management").role("admin").roleType("technical").pin("0000").build());
        employeeRepository.save(Employee.builder().employeeCode("OWN-001").name("Rajesh R.").sector("Owner").role("owner").roleType("technical").pin("9999").build());
    }

    private void seedComplaints() {
        complaintRepository.save(Complaint.builder()
                .sector("Assembly Line A").category("supervisor").subCategory("Verbal abuse")
                .text("Supervisor uses harsh language during morning briefings. Team is uncomfortable and scared to speak up.")
                .status("escalated").isVoice(false).confidenceScore(92).raisedCount(4)
                .biasFlag("none").slaBreached(false).hoursOpen(56)
                .createdAt(LocalDateTime.of(2024, 1, 15, 8, 30)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Assembly Line A").category("supervisor").subCategory("Forced overtime")
                .text("Workers are asked to stay back without prior notice or extra pay. Happened 4 times this week.")
                .status("escalated").isVoice(true).confidenceScore(87).raisedCount(4)
                .biasFlag("none").slaBreached(false).hoursOpen(38)
                .createdAt(LocalDateTime.of(2024, 1, 16, 10, 15)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Canteen").category("food").subCategory("Food quality poor")
                .text("Canteen food is cold and stale. Break time is only 15 minutes but queue takes 10 minutes.")
                .status("resolved").isVoice(false).confidenceScore(95).raisedCount(6)
                .biasFlag("fake-resolution").slaBreached(false).workerConfirmed(false)
                .resolvedBy("Murugan A. (Admin)").resolvedAt(LocalDateTime.of(2024, 1, 17, 14, 0))
                .hoursOpen(72).createdAt(LocalDateTime.of(2024, 1, 17, 12, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Packaging").category("facility").subCategory("Toilet not clean")
                .text("Bathroom near packaging zone not cleaned in 3 days. Very unhygienic. Workers avoiding it.")
                .status("pending").isVoice(false).confidenceScore(95).raisedCount(3)
                .biasFlag("none").slaBreached(true).hoursOpen(84)
                .createdAt(LocalDateTime.of(2024, 1, 14, 11, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Welding").category("safety").subCategory("No safety equipment")
                .text("Only 2 face shields for 8 welders. Workers taking turns. High injury risk.")
                .status("escalated").isVoice(false).confidenceScore(98).raisedCount(5)
                .biasFlag("none").slaBreached(true).hoursOpen(120)
                .createdAt(LocalDateTime.of(2024, 1, 13, 9, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Assembly Line A").category("supervisor").subCategory("Rude behaviour")
                .text("Supervisor Kannan shouted at me in front of everyone for a minor mistake. Very humiliating.")
                .status("pending").isVoice(false).confidenceScore(31).raisedCount(7)
                .biasFlag("coordinated").slaBreached(false).hoursOpen(12)
                .createdAt(LocalDateTime.of(2024, 1, 17, 9, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Welding").category("safety").subCategory("Floor wet/slippery")
                .text("Water leaking from cooling unit. Floor is slippery near machine 3. Someone will get hurt.")
                .status("pending").isVoice(true).confidenceScore(89).raisedCount(5)
                .biasFlag("none").slaBreached(false).hoursOpen(48)
                .createdAt(LocalDateTime.of(2024, 1, 15, 7, 45)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Paint Shop").category("health").subCategory("Dust/fume exposure")
                .text("Paint fumes are unbearable. No ventilation. 3 workers had headaches yesterday.")
                .status("escalated").isVoice(false).confidenceScore(96).raisedCount(3)
                .biasFlag("none").slaBreached(false).hoursOpen(44)
                .createdAt(LocalDateTime.of(2024, 1, 15, 10, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Warehouse").category("pay").subCategory("Salary delayed")
                .text("Salary for December not credited. Mid-January already. No communication from HR.")
                .status("pending").isVoice(false).confidenceScore(99).raisedCount(1)
                .biasFlag("none").slaBreached(false).hoursOpen(8)
                .createdAt(LocalDateTime.of(2024, 1, 17, 16, 0)).build());

        complaintRepository.save(Complaint.builder()
                .sector("Quality Control").category("health").subCategory("No drinking water")
                .text("Water cooler in QC section broken for a week. Workers buying water from outside pocket.")
                .status("pending").isVoice(false).confidenceScore(93).raisedCount(1)
                .biasFlag("none").slaBreached(false).hoursOpen(14)
                .createdAt(LocalDateTime.of(2024, 1, 17, 11, 0)).build());
    }

    private void seedRewards() {
        rewardRepository.save(Reward.builder().employeeId("EMP-1001").name("Ravi Kumar").sector("Assembly Line A").score(96).streak(18).votes(7).badges("⭐ Star Performer,🔥 Consistent").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1002").name("Meena S.").sector("Packaging").score(88).streak(10).votes(5).badges("🤝 Team Player").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1003").name("Arjun P.").sector("Quality Control").score(91).streak(14).votes(6).badges("🎯 Precision,⭐ Star Performer").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1004").name("Suresh M.").sector("Welding").score(79).streak(7).votes(3).badges("🔥 Consistent").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1005").name("Lakshmi R.").sector("Paint Shop").score(84).streak(9).votes(4).badges("🤝 Team Player,🎯 Precision").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1006").name("Dinesh K.").sector("Maintenance").score(93).streak(21).votes(8).badges("⭐ Star Performer,🔥 Consistent,🛠️ Fixer").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1007").name("Kavitha N.").sector("Assembly Line B").score(72).streak(5).votes(2).badges("").build());
        rewardRepository.save(Reward.builder().employeeId("EMP-1008").name("Muthu R.").sector("Warehouse").score(81).streak(12).votes(4).badges("🤝 Team Player").build());
    }

    private void seedAuditLogs() {
        auditLogRepository.save(AuditLog.builder()
                .actor("EmPulse AI").actorRole("System")
                .action("Fake resolution flagged")
                .target("CMP-003 (Canteen complaint)")
                .complaintId("CMP-003").severity("critical")
                .createdAt(LocalDateTime.of(2024, 1, 17, 15, 31)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("Anonymous Worker").actorRole("Employee")
                .action("Denied resolution — issue not fixed")
                .target("CMP-003 (Canteen complaint)")
                .complaintId("CMP-003").severity("warning")
                .createdAt(LocalDateTime.of(2024, 1, 17, 15, 30)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("Murugan A.").actorRole("Admin")
                .action("Marked complaint resolved (no fix done)")
                .target("CMP-003 (Canteen complaint)")
                .complaintId("CMP-003").severity("critical")
                .createdAt(LocalDateTime.of(2024, 1, 17, 14, 0)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("System").actorRole("Auto-escalation")
                .action("Escalated to Owner — HR SLA breached (72hr)")
                .target("CMP-005 (Safety — Welding)")
                .complaintId("CMP-005").severity("critical")
                .createdAt(LocalDateTime.of(2024, 1, 16, 9, 1)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("System").actorRole("Auto-escalation")
                .action("Escalated to HR — Admin SLA breached (48hr)")
                .target("CMP-004 (Facility — Packaging)")
                .complaintId("CMP-004").severity("warning")
                .createdAt(LocalDateTime.of(2024, 1, 16, 11, 1)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("EmPulse AI").actorRole("System")
                .action("Coordinated complaint detected — sent to neutral review")
                .target("CMP-006 (Supervisor targeting — 7 complaints in 4hrs)")
                .complaintId("CMP-006").severity("warning")
                .createdAt(LocalDateTime.of(2024, 1, 17, 9, 5)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("System").actorRole("Pattern detection")
                .action("Auto-escalated to HR — 4 supervisor complaints same sector")
                .target("CMP-001 (Supervisor — Assembly Line A)")
                .complaintId("CMP-001").severity("warning")
                .createdAt(LocalDateTime.of(2024, 1, 15, 18, 0)).build());

        auditLogRepository.save(AuditLog.builder()
                .actor("Murugan A.").actorRole("Admin")
                .action("Complaint received — no action taken for 48hr")
                .target("CMP-004 (Facility — Packaging)")
                .complaintId("CMP-004").severity("info")
                .createdAt(LocalDateTime.of(2024, 1, 14, 11, 30)).build());
    }
}
