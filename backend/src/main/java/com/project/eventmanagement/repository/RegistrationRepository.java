package com.project.eventmanagement.repository;


import com.project.eventmanagement.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByUserId(Long userId); // Find all events a user booked
    List<Registration> findByEvent_DateBetween(LocalDateTime start, LocalDateTime end);
}