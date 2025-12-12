import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            // This hits the endpoint: @GetMapping("/registrations/my-events")
            const response = await api.get('/registrations/my-events');
            setBookings(response.data);
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 fw-bold">My Registered Events</h2>
            
            {bookings.length === 0 ? (
                <div className="alert alert-info">
                    You haven't registered for any events yet. 
                    <a href="/events" className="alert-link ms-2">Browse Events</a>
                </div>
            ) : (
                <div className="list-group shadow-sm">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="list-group-item list-group-item-action p-4">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1 text-primary">{booking.event.title}</h5>
                                <small className="text-muted">
                                    Registered on: {new Date(booking.registrationDate).toLocaleDateString()}
                                </small>
                            </div>
                            <p className="mb-1">{booking.event.description}</p>
                            <div className="mt-2">
                                <span className="badge bg-success me-2">Confirmed</span>
                                <small className="text-muted">📍 {booking.event.venue} | 📅 {new Date(booking.event.date).toLocaleString()}</small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;