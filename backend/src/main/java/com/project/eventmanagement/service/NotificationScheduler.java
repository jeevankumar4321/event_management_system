package com.project.eventmanagement.service;



import com.project.eventmanagement.entity.Registration;
import com.project.eventmanagement.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
public class NotificationScheduler {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EmailService emailService;

    // Runs every day at 9:00 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void sendEventReminders() {
        // 1. Calculate "Tomorrow"
        LocalDate tomorrowDate = LocalDate.now().plusDays(1);

        // 2. Define the range (Start of tomorrow to End of tomorrow)
        LocalDateTime startOfDay = tomorrowDate.atStartOfDay();
        LocalDateTime endOfDay = tomorrowDate.atTime(LocalTime.MAX);

        // 3. Database Query: "Give me only the people having events tomorrow"
        List<Registration> remindersToSend = registrationRepository.findByEvent_DateBetween(startOfDay, endOfDay);

        System.out.println("Found " + remindersToSend.size() + " reminders to send.");

        // 4. Send Emails
        for (Registration reg : remindersToSend) {
            String subject = "Reminder: Upcoming Event - " + reg.getEvent().getTitle();
            String body = "Hello " + reg.getUser().getName() + ",\n\n" +
                    "Don't forget! You have an event tomorrow:\n" +
                    reg.getEvent().getTitle() + " at " + reg.getEvent().getVenue() + ".\n\n" +
                    "See you there!";

            emailService.sendEmail(reg.getUser().getEmail(), subject, body);
        }
    }
}