package com.empulse.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String employeeId;
    private String name;
    private String sector;
    private int score;
    private int streak;
    private int votes;

    @Column(length = 500)
    private String badges;

    private LocalDateTime createdAt;

    public Reward() {}

    public Reward(UUID id, String employeeId, String name, String sector, int score, int streak, int votes, String badges, LocalDateTime createdAt) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.sector = sector;
        this.score = score;
        this.streak = streak;
        this.votes = votes;
        this.badges = badges;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }
    public int getVotes() { return votes; }
    public void setVotes(int votes) { this.votes = votes; }
    public String getBadges() { return badges; }
    public void setBadges(String badges) { this.badges = badges; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static RewardBuilder builder() { return new RewardBuilder(); }

    public static class RewardBuilder {
        private UUID id;
        private String employeeId;
        private String name;
        private String sector;
        private int score;
        private int streak;
        private int votes;
        private String badges;
        private LocalDateTime createdAt;

        public RewardBuilder id(UUID id) { this.id = id; return this; }
        public RewardBuilder employeeId(String employeeId) { this.employeeId = employeeId; return this; }
        public RewardBuilder name(String name) { this.name = name; return this; }
        public RewardBuilder sector(String sector) { this.sector = sector; return this; }
        public RewardBuilder score(int score) { this.score = score; return this; }
        public RewardBuilder streak(int streak) { this.streak = streak; return this; }
        public RewardBuilder votes(int votes) { this.votes = votes; return this; }
        public RewardBuilder badges(String badges) { this.badges = badges; return this; }
        public RewardBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Reward build() {
            return new Reward(id, employeeId, name, sector, score, streak, votes, badges, createdAt);
        }
    }
}
