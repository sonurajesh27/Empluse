package com.empulse.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String actor;
    private String actorRole;
    private String action;
    private String target;
    private String complaintId;
    private String severity;
    private LocalDateTime createdAt;

    public AuditLog() {}

    public AuditLog(UUID id, String actor, String actorRole, String action, String target, String complaintId, String severity, LocalDateTime createdAt) {
        this.id = id;
        this.actor = actor;
        this.actorRole = actorRole;
        this.action = action;
        this.target = target;
        this.complaintId = complaintId;
        this.severity = severity;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getActor() { return actor; }
    public void setActor(String actor) { this.actor = actor; }
    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }
    public String getComplaintId() { return complaintId; }
    public void setComplaintId(String complaintId) { this.complaintId = complaintId; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static AuditLogBuilder builder() { return new AuditLogBuilder(); }

    public static class AuditLogBuilder {
        private UUID id;
        private String actor;
        private String actorRole;
        private String action;
        private String target;
        private String complaintId;
        private String severity;
        private LocalDateTime createdAt;

        public AuditLogBuilder id(UUID id) { this.id = id; return this; }
        public AuditLogBuilder actor(String actor) { this.actor = actor; return this; }
        public AuditLogBuilder actorRole(String actorRole) { this.actorRole = actorRole; return this; }
        public AuditLogBuilder action(String action) { this.action = action; return this; }
        public AuditLogBuilder target(String target) { this.target = target; return this; }
        public AuditLogBuilder complaintId(String complaintId) { this.complaintId = complaintId; return this; }
        public AuditLogBuilder severity(String severity) { this.severity = severity; return this; }
        public AuditLogBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AuditLog build() {
            return new AuditLog(id, actor, actorRole, action, target, complaintId, severity, createdAt);
        }
    }
}
