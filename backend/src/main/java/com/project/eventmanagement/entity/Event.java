package com.project.eventmanagement.entity;



import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String speaker;
    private String venue;
    private String category;
    private LocalDateTime date;
    private Integer attendeeCount=0;
}