package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.GoalRequest;
import com.uff.project.fintrace.DTO.UpdateGoalRequest;
import com.uff.project.fintrace.model.Goal;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.GoalRepository;
import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Autowired
    public GoalController(GoalRepository goalRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> createGoal(@RequestBody GoalRequest goalRequest) {
        Optional<User> user = userRepository.findById((long) goalRequest.getUserId());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não encontrado");
        }

        Goal goal = new Goal();
        goal.setDescription(goalRequest.getDescription());
        goal.setNecessaryValue(goalRequest.getNecessaryValue());
        goal.setCurrentValue(0.0);
        goal.setUser(user.get());

        Goal savedGoal = goalRepository.save(goal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGoal);
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals(@RequestParam Long userId) {
        List<Goal> goals = goalRepository.findByUserId(userId);
        return ResponseEntity.ok(goals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id, @RequestBody UpdateGoalRequest updateGoalRequest) {
        Optional<Goal> existingGoal = goalRepository.findById(id);
        if (existingGoal.isPresent()) {
            Goal goal = existingGoal.get();
            goal.setDescription(updateGoalRequest.getDescription());
            goal.setNecessaryValue(updateGoalRequest.getNecessaryValue());
            Goal savedGoal = goalRepository.save(goal);
            return ResponseEntity.ok(savedGoal);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meta não encontrada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id) {
        Optional<Goal> goal = goalRepository.findById(id);
        if (goal.isPresent()) {
            goalRepository.delete(goal.get());
            return ResponseEntity.ok("Goal deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Meta não encontrada");
        }
    }
}
