package com.empulse.backend.controller;

import com.empulse.backend.entity.Reward;
import com.empulse.backend.repository.RewardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardRepository rewardRepository;

    public RewardController(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }

    @GetMapping
    public ResponseEntity<List<Reward>> getAll() {
        return ResponseEntity.ok(rewardRepository.findAllByOrderByScoreDesc());
    }

    @GetMapping("/sector/{sector}")
    public ResponseEntity<List<Reward>> getBySector(@PathVariable String sector) {
        return ResponseEntity.ok(rewardRepository.findBySectorOrderByScoreDesc(sector));
    }
}
