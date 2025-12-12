import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        speaker: '',
        category: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // NOTE: This endpoint requires ROLE_ADMIN
            await api.post('/events/admin/create', formData);
            alert('Event Created Successfully!');
            navigate('/events');
        } catch (error) {
            console.error(error);
            alert('Failed to create event. Are you an Admin?');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h3 className="text-center mb-4">Create New Event</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Event Title</label>
                        <input name="title" className="form-control" onChange={handleChange} required />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" rows="3" onChange={handleChange} required></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date & Time</label>
                            <input type="datetime-local" name="date" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Category</label>
                            <select name="category" className="form-select" onChange={handleChange} required>
                                <option value="">Select...</option>
                                <option value="Tech">Tech</option>
                                <option value="Music">Music</option>
                                <option value="Business">Business</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Venue</label>
                        <input name="venue" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Speaker Name</label>
                        <input name="speaker" className="form-control" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;