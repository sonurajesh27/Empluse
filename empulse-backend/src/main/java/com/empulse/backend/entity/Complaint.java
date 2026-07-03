package com.empulse.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String sector;
    private String category;
    private String subCategory;

    @Column(length = 2000)
    private String text;

    private String status;
    private boolean isVoice;
    private int confidenceScore;
    private int raisedCount;
    private String biasFlag;
    private boolean slaBreached;
    private Boolean workerConfirmed;
    private String resolvedBy;
    private LocalDateTime resolvedAt;
    private int hoursOpen;
    private LocalDateTime createdAt;

    public Complaint() {}

    public Complaint(UUID id, String sector, String category, String subCategory, String text,
                     String status, boolean isVoice, int confidenceScore, int raisedCount,
                     String biasFlag, boolean slaBreached, Boolean workerConfirmed,
                     String resolvedBy, LocalDateTime resolvedAt, int hoursOpen, LocalDateTime createdAt) {
        this.id = id;
        this.sector = sector;
        this.category = category;
        this.subCategory = subCategory;
        this.text = text;
        this.status = status;
        this.isVoice = isVoice;
        this.confidenceScore = confidenceScore;
        this.raisedCount = raisedCount;
        this.biasFlag = biasFlag;
        this.slaBreached = slaBreached;
        this.workerConfirmed = workerConfirmed;
        this.resolvedBy = resolvedBy;
        this.resolvedAt = resolvedAt;
        this.hoursOpen = hoursOpen;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isVoice() { return isVoice; }
    public void setVoice(boolean voice) { isVoice = voice; }
    public int getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; }
    public int getRaisedCount() { return raisedCount; }
    public void setRaisedCount(int raisedCount) { this.raisedCount = raisedCount; }
    public String getBiasFlag() { return biasFlag; }
    public void setBiasFlag(String biasFlag) { this.biasFlag = biasFlag; }
    public boolean isSlaBreached() { return slaBreached; }
    public void setSlaBreached(boolean slaBreached) { this.slaBreached = slaBreached; }
    public Boolean getWorkerConfirmed() { return workerConfirmed; }
    public void setWorkerConfirmed(Boolean workerConfirmed) { this.workerConfirmed = workerConfirmed; }
    public String getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
    public int getHoursOpen() { return hoursOpen; }
    public void setHoursOpen(int hoursOpen) { this.hoursOpen = hoursOpen; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static ComplaintBuilder builder() { return new ComplaintBuilder(); }

    public static class ComplaintBuilder {
        private UUID id;
        private String sector;
        private String category;
        private String subCategory;
        private String text;
        private String status;
        private boolean isVoice;
        private int confidenceScore;
        private int raisedCount;
        private String biasFlag;
        private boolean slaBreached;
        private Boolean workerConfirmed;
        private String resolvedBy;
        private LocalDateTime resolvedAt;
        private int hoursOpen;
        private LocalDateTime createdAt;

        public ComplaintBuilder id(UUID id) { this.id = id; return this; }
        public ComplaintBuilder sector(String sector) { this.sector = sector; return this; }
        public ComplaintBuilder category(String category) { this.category = category; return this; }
        public ComplaintBuilder subCategory(String subCategory) { this.subCategory = subCategory; return this; }
        public ComplaintBuilder text(String text) { this.text = text; return this; }
        public ComplaintBuilder status(String status) { this.status = status; return this; }
        public ComplaintBuilder isVoice(boolean isVoice) { this.isVoice = isVoice; return this; }
        public ComplaintBuilder confidenceScore(int confidenceScore) { this.confidenceScore = confidenceScore; return this; }
        public ComplaintBuilder raisedCount(int raisedCount) { this.raisedCount = raisedCount; return this; }
        public ComplaintBuilder biasFlag(String biasFlag) { this.biasFlag = biasFlag; return this; }
        public ComplaintBuilder slaBreached(boolean slaBreached) { this.slaBreached = slaBreached; return this; }
        public ComplaintBuilder workerConfirmed(Boolean workerConfirmed) { this.workerConfirmed = workerConfirmed; return this; }
        public ComplaintBuilder resolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; return this; }
        public ComplaintBuilder resolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; return this; }
        public ComplaintBuilder hoursOpen(int hoursOpen) { this.hoursOpen = hoursOpen; return this; }
        public ComplaintBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Complaint build() {
            return new Complaint(id, sector, category, subCategory, text, status, isVoice,
                    confidenceScore, raisedCount, biasFlag, slaBreached, workerConfirmed,
                    resolvedBy, resolvedAt, hoursOpen, createdAt);
        }
    }
}
