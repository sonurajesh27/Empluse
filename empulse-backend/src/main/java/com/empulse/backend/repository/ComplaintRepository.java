package com.empulse.backend.repository;

import com.empulse.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
    List<Complaint> findBySector(String sector);
    List<Complaint> findByStatus(String status);
    List<Complaint> findBySlaBreachedTrue();
}
