package com.project.eventmanagement.controller;



import com.project.eventmanagement.entity.Event;
import com.project.eventmanagement.entity.Registration;
import com.project.eventmanagement.entity.User;
import com.project.eventmanagement.repository.EventRepository;
import com.project.eventmanagement.repository.RegistrationRepository;
import com.project.eventmanagement.repository.UserRepository;
import com.project.eventmanagement.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // User: Register for an event
    @PostMapping("/{eventId}")
    public String registerForEvent(@PathVariable Long eventId) {
        // 1. Get Logged in User
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = auth.getName(); // Extracted from JWT
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Get Event
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // 3. Save Registration
        Registration registration = new Registration();
        registration.setUser(user);
        registration.setEvent(event);
        registrationRepository.save(registration);

        // 4. Update Attendee Count (Req #5)
        event.setAttendeeCount(event.getAttendeeCount() == null ? 1 : event.getAttendeeCount() + 1);
        eventRepository.save(event);

        // 5. Send Email Notification (Req #6)
        emailService.sendEmail(
                user.getEmail(),
                "Registration Confirmed: " + event.getTitle(),
                "Hello " + user.getName() + ",\n\nYou have successfully registered for " + event.getTitle() +
                        " at " + event.getVenue() + ".\n\nSee you there!"
        );

        return "Registered successfully! Check your email.";
    }

    // User: See my registered events
    @GetMapping("/my-events")
    public List<Registration> getMyEvents() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = auth.getName();
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return registrationRepository.findByUserId(user.getId());
    }
    // Admin: View all users registered for a specific event
    @GetMapping("/admin/event/{eventId}")
    public List<Registration> getEventAttendees(@PathVariable Long eventId) {
        // Note: You would normally add @PreAuthorize("hasRole('ADMIN')") here
        // and create a method in Repository: findByEventId(Long eventId)
        return registrationRepository.findAll().stream()
                .filter(reg -> reg.getEvent().getId().equals(eventId))
                .toList(); // Simple filtering for now
    }
}