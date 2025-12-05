import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';
import apiClient from '../api';
import EventDetailModal from './modals/EventDetailModal';
import { Link } from 'react-router-dom';

const CalendarWidget = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/calendar/events');
                // Filter only future events and sort by date/time
                const now = new Date();
                const upcoming = response.data
                    .filter(e => e.type === 'event') // Only show meetings/events, not tasks
                    .filter(e => {
                        const eventDate = new Date(`${e.date}T${e.start_time}`);
                        return eventDate >= now;
                    })
                    .sort((a, b) => new Date(`${a.date}T${a.start_time}`) - new Date(`${b.date}T${b.start_time}`))
                    .slice(0, 4); // Show top 4

                setEvents(upcoming);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events', error);
                setLoading(false);
            }
        };

        fetchEvents();
        // Poll every minute for "real-time" feel
        const interval = setInterval(fetchEvents, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <CalendarIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Upcoming Events</h3>
                    </div>
                    <Link to="/calendar" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center transition-colors">
                        View Calendar
                        <ChevronRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="space-y-4 flex-1">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : events.length > 0 ? (
                        events.map(event => (
                            <div
                                key={event.id}
                                onClick={() => handleEventClick(event)}
                                className="group flex items-start p-3 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-indigo-100"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex flex-col items-center justify-center text-indigo-700 font-bold mr-4 group-hover:bg-indigo-200 transition-colors">
                                    <span className="text-xs uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-lg leading-none">{new Date(event.date).getDate()}</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-slate-800 font-bold truncate group-hover:text-indigo-700 transition-colors">{event.title}</h4>
                                    <div className="flex items-center text-xs text-slate-500 mt-1 font-medium">
                                        <Clock className="w-3 h-3 mr-1" />
                                        <span>{event.start_time} - {event.end_time}</span>
                                    </div>

                                    {/* Participants Preview */}
                                    {event.participants && event.participants.length > 0 && (
                                        <div className="flex items-center mt-2 -space-x-2">
                                            {event.participants.slice(0, 3).map((p, i) => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600" title={p.name}>
                                                    {p.name.charAt(0)}
                                                </div>
                                            ))}
                                            {event.participants.length > 3 && (
                                                <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                                                    +{event.participants.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            <p>No upcoming events</p>
                        </div>
                    )}
                </div>
            </div>

            <EventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </>
    );
};

export { CalendarWidget };