import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        speaker: '',
        category: ''
    });

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const response = await api.get(`/events/${id}`);
            setFormData(response.data);
        } catch (error) {
            alert("Error loading event data.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the PUT endpoint
            await api.put(`/events/admin/update/${id}`, formData);
            alert('Event Updated Successfully!');
            navigate('/events');
        } catch (error) {
            alert('Failed to update event.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <h3 className="text-center mb-4">Edit Event</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Event Title</label>
                        <input 
                            name="title" 
                            className="form-control" 
                            value={formData.title} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea 
                            name="description" 
                            className="form-control" 
                            rows="3" 
                            value={formData.description} 
                            onChange={handleChange} 
                            required
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Date & Time</label>
                            <input 
                                type="datetime-local" 
                                name="date" 
                                className="form-control" 
                                value={formData.date} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Category</label>
                            <select 
                                name="category" 
                                className="form-select" 
                                value={formData.category} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="Tech">Tech</option>
                                <option value="Music">Music</option>
                                <option value="Business">Business</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Venue</label>
                        <input 
                            name="venue" 
                            className="form-control" 
                            value={formData.venue} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Speaker Name</label>
                        <input 
                            name="speaker" 
                            className="form-control" 
                            value={formData.speaker} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100">Update Event</button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;