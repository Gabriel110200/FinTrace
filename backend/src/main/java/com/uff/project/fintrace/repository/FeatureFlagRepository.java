package com.uff.project.fintrace.repository;

import com.uff.project.fintrace.model.FeatureFlag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeatureFlagRepository extends JpaRepository<FeatureFlag, Long> {
    List<FeatureFlag> findByUserId(Long userId);
}