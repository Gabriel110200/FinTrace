package com.uff.project.fintrace;

import com.uff.project.fintrace.model.FeatureFlag;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.FeatureFlagRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FeatureFlagTest {

    @Mock
    private FeatureFlagRepository featureFlagsRepository;

    @InjectMocks
    private FeatureFlagController featureFlagController;

    @Test
    void testGetAllFeatureFlagsByUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("Test User");

        FeatureFlag feature1 = new FeatureFlag();
        feature1.setId(1L);
        feature1.setName("Feature A");
        feature1.setType(1);
        feature1.setActive(true);
        feature1.setUser(user);

        FeatureFlag feature2 = new FeatureFlag();
        feature2.setId(2L);
        feature2.setName("Feature B");
        feature2.setType(2);
        feature2.setActive(false);
        feature2.setUser(user);

        when(featureFlagsRepository.findByUserId(1L)).thenReturn(List.of(feature1, feature2));

        ResponseEntity<?> response = featureFlagController.getAllFeatureFlagsByUser(1L);

        assertEquals(200, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }


    @Test
    void testUpdateFeatureFlagStatus() {
        User user = new User();
        user.setId(1L);
        user.setUsername("Test User");

        FeatureFlag feature = new FeatureFlag();
        feature.setId(1L);
        feature.setName("Feature A");
        feature.setType(1);
        feature.setActive(true);
        feature.setUser(user);

        when(featureFlagsRepository.findById(1L)).thenReturn(Optional.of(feature));

        ResponseEntity<?> response = featureFlagController.updateFeatureFlagStatus(1L, false);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

}
