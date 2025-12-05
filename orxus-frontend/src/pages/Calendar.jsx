import React, { useEffect, useState } from 'react';
import apiClient from '../api';
import { ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CreateEventModal from '../components/modals/CreateEventModal';
import EventDetailModal from '../components/modals/EventDetailModal';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { user } = useAuth();

    // Real-time clock effect
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch events
    const fetchEvents = () => {
        apiClient.get('/calendar/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events', error));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateEvent = (eventData) => {
        apiClient.post('/events', eventData)
            .then(() => fetchEvents())
            .catch(error => console.error('Error creating event', error));
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsDetailModalOpen(true);
    };

    // Calendar Logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

        const days = [];
        // Add padding for previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const getEventsForDay = (date) => {
        if (!date) return [];
        // Adjust date to local timezone string YYYY-MM-DD
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (offset * 60 * 1000));
        const dateString = localDate.toISOString().split('T')[0];
        return events.filter(e => e.date === dateString);
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h1>
                    <div className="flex gap-2 mt-2">
                        <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded-full"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                        <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded-full"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Real Time Clock */}
                    <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-lg shadow-lg">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span className="text-xl font-mono font-bold tracking-widest">
                            {currentTime.toLocaleTimeString('id-ID', { hour12: false })}
                        </span>
                    </div>

                    {/* Add Event Button (Admin Only) */}
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-all hover:shadow-lg font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Jadwalkan Meeting
                        </button>
                    )}
                </div>
            </div>

            <CreateEventModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateEvent}
            />

            <EventDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                event={selectedEvent}
            />

            {/* Calendar Grid */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                {/* Days Header */}
                <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                        <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Cells */}
                <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                    {days.map((date, index) => (
                        <div
                            key={index}
                            className={`min-h-[120px] border-b border-r border-slate-100 p-2 transition-colors ${date ? 'hover:bg-slate-50' : 'bg-slate-50/30'
                                } ${date && date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()
                                    ? 'bg-blue-50/30'
                                    : ''
                                }`}
                        >
                            {date && (
                                <>
                                    <div className={`text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center rounded-full ${date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-700'
                                        }`}>
                                        {date.getDate()}
                                    </div>
                                    <div className="space-y-1 overflow-y-auto max-h-[100px] custom-scrollbar">
                                        {getEventsForDay(date).map((item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleEventClick(item)}
                                                className={`text-xs px-2 py-1.5 rounded border shadow-sm truncate cursor-pointer transition-transform hover:scale-105 ${item.type === 'event'
                                                        ? 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200'
                                                        : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                                                    }`}
                                                title={item.title}
                                            >
                                                {item.type === 'event' && <span className="font-bold mr-1">{item.start_time}</span>}
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;

