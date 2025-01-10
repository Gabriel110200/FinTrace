package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.GoalRequest;
import com.uff.project.fintrace.DTO.UpdateGoalRequest;
import com.uff.project.fintrace.model.Goal;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.GoalRepository;
import com.uff.project.fintrace.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class GoalTest {

    @Mock
    private GoalRepository goalRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private GoalController goalController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateGoal_UserExists() {
        GoalRequest goalRequest = new GoalRequest();
        goalRequest.setUserId(1);
        goalRequest.setDescription("Save for a car");
        goalRequest.setNecessaryValue(10000.0);

        User user = new User();
        user.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Goal savedGoal = new Goal();
        savedGoal.setId(1L);
        savedGoal.setDescription("Save for a car");
        savedGoal.setNecessaryValue(10000.0);
        savedGoal.setCurrentValue(0.0);
        savedGoal.setUser(user);

        when(goalRepository.save(any(Goal.class))).thenReturn(savedGoal);

        ResponseEntity<?> response = goalController.createGoal(goalRequest);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    public void testCreateGoal_UserNotFound() {
        GoalRequest goalRequest = new GoalRequest();
        goalRequest.setUserId(1);

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = goalController.createGoal(goalRequest);

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void testGetAllGoals() {
        Goal goal1 = new Goal();
        goal1.setId(1L);
        goal1.setDescription("Save for a car");

        Goal goal2 = new Goal();
        goal2.setId(2L);
        goal2.setDescription("Save for a house");

        List<Goal> goals = Arrays.asList(goal1, goal2);

        when(goalRepository.findByUserId(1L)).thenReturn(goals);

        ResponseEntity<List<Goal>> response = goalController.getAllGoals(1L);

        assertEquals(200, response.getStatusCodeValue());

    }

    @Test
    public void testUpdateGoal_GoalExists() {
        UpdateGoalRequest updateGoalRequest = new UpdateGoalRequest();
        updateGoalRequest.setDescription("Save for a vacation");
        updateGoalRequest.setNecessaryValue(5000.0);

        Goal existingGoal = new Goal();
        existingGoal.setId(1L);
        existingGoal.setDescription("Old description");
        existingGoal.setNecessaryValue(1000.0);

        Goal updatedGoal = new Goal();
        updatedGoal.setId(1L);
        updatedGoal.setDescription("Save for a vacation");
        updatedGoal.setNecessaryValue(5000.0);

        when(goalRepository.findById(1L)).thenReturn(Optional.of(existingGoal));
        when(goalRepository.save(existingGoal)).thenReturn(updatedGoal);

        ResponseEntity<?> response = goalController.updateGoal(1L, updateGoalRequest);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void testUpdateGoal_GoalNotFound() {
        UpdateGoalRequest updateGoalRequest = new UpdateGoalRequest();

        when(goalRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = goalController.updateGoal(1L, updateGoalRequest);

        assertEquals("Meta não encontrada", response.getBody());
    }

    @Test
    public void testDeleteGoal_GoalExists() {
        Goal goal = new Goal();
        goal.setId(1L);

        when(goalRepository.findById(1L)).thenReturn(Optional.of(goal));

        ResponseEntity<?> response = goalController.deleteGoal(1L);

        assertEquals(200, response.getStatusCodeValue());
        verify(goalRepository, times(1)).delete(goal);
    }

    @Test
    public void testDeleteGoal_GoalNotFound() {
        when(goalRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = goalController.deleteGoal(1L);

        assertEquals(404, response.getStatusCodeValue());
    }
}
