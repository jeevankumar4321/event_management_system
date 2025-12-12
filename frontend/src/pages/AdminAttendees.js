import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

const AdminAttendees = () => {
    const { eventId } = useParams(); // Get the event ID from the URL
    const [attendees, setAttendees] = useState([]);
    const [eventName, setEventName] = useState('');

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            // 1. Fetch the list of registrations for this event
            const response = await api.get(`/registrations/admin/event/${eventId}`);
            setAttendees(response.data);
            
            // Get event name from the first record if it exists
            if(response.data.length > 0) {
                setEventName(response.data[0].event.title);
            }
        } catch (error) {
            console.error("Failed to fetch attendees", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Guest List {eventName && `for "${eventName}"`}</h2>
            
            <div className="card shadow-sm">
                <div className="card-body">
                    {attendees.length === 0 ? (
                        <div className="alert alert-warning">No attendees registered yet.</div>
                    ) : (
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Registration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map((reg, index) => (
                                    <tr key={reg.id}>
                                        <td>{index + 1}</td>
                                        <td>{reg.user.name}</td>
                                        <td>{reg.user.email}</td>
                                        <td>{new Date(reg.registrationDate).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminAttendees;