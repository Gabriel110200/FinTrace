package com.uff.project.fintrace;

import com.uff.project.fintrace.model.FeatureFlag;
import com.uff.project.fintrace.repository.FeatureFlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/feature-flag")
public class FeatureFlagController {
    @Autowired
    private FeatureFlagRepository featureFlagsRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<FeatureFlag>> getAllFeatureFlagsByUser(@PathVariable Long userId) {
        List<FeatureFlag> featureFlags = featureFlagsRepository.findByUserId(userId);
        return ResponseEntity.ok(featureFlags);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFeatureFlagStatus(@PathVariable Long id, @RequestParam boolean isActive) {
        FeatureFlag featureFlag = featureFlagsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FeatureFlag não existe"));

        featureFlag.setActive(isActive);
        featureFlagsRepository.save(featureFlag);
        return ResponseEntity.ok("FeatureFlag atualizada!");
    }
}
