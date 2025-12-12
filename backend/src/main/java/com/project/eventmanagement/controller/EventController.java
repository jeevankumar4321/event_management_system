package com.project.eventmanagement.controller;


import com.project.eventmanagement.entity.Event;
import com.project.eventmanagement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    // 1. Browse: Get All Events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 2. Browse: Get Single Event Details
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // 3. Search: By Keyword (Location, Category)
    @GetMapping("/search")
    public List<Event> search(@RequestParam String keyword) {
        return eventRepository.searchEvents(keyword);
    }

    // 4. Admin: Create Event
    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ADMIN')") // Only Admin can do this
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // 5. Admin: Update Event
    @PutMapping("/admin/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setVenue(eventDetails.getVenue());
        event.setSpeaker(eventDetails.getSpeaker());
        event.setCategory(eventDetails.getCategory());

        return eventRepository.save(event);
    }

    // 6. Admin: Delete Event
    @DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return "Event deleted successfully";
    }
}