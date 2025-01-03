package com.uff.project.fintrace;

import com.uff.project.fintrace.model.FeatureFlag;
import com.uff.project.fintrace.repository.FeatureFlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feature-flag")
public class FeatureFlagController {
    @Autowired
    private FeatureFlagRepository featureFlagsRepository;


    private ResponseEntity<Map<String, Object>> buildResponse(Object data, boolean success, String errorMessage) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        if (success) {
            response.put("data", data);
        } else {
            response.put("error", errorMessage);
        }
        return ResponseEntity.status(success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }



    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllFeatureFlagsByUser(@PathVariable Long userId) {
        List<FeatureFlag> featureFlags = featureFlagsRepository.findByUserId(userId);
        return buildResponse(featureFlags, true, null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFeatureFlagStatus(@PathVariable Long id, @RequestParam boolean isActive) {
        FeatureFlag featureFlag = featureFlagsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FeatureFlag não existe"));

        featureFlag.setActive(isActive);
        featureFlagsRepository.save(featureFlag);
        return buildResponse("Flag atualizada",true,null);
    }
}
