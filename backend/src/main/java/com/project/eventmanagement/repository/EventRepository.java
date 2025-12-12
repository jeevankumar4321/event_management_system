package com.project.eventmanagement.repository;




import com.project.eventmanagement.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    // Enhanced Search: Title, Venue, Category, OR Date (converted to string)
    @Query("SELECT e FROM Event e WHERE " +
            "LOWER(e.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.venue) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(e.date AS string) LIKE CONCAT('%', :keyword, '%')")
    List<Event> searchEvents(String keyword);
}