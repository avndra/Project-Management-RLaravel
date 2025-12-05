import React from 'react';
import { X, Calendar, Clock, Users, User } from 'lucide-react';

const EventDetailModal = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Event Details</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h3>
                        <p className="text-slate-600">{event.description || 'No description provided.'}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center text-slate-700">
                            <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                            <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <Clock className="w-5 h-5 mr-3 text-blue-500" />
                            <span className="font-medium">
                                {event.start_time} - {event.end_time}
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-3">
                            <Users className="w-5 h-5 mr-2 text-blue-500" />
                            <h4 className="font-semibold text-slate-800">Participants</h4>
                        </div>

                        {event.participants && event.participants.length > 0 ? (
                            <div className="bg-slate-50 rounded-xl p-3 max-h-40 overflow-y-auto border border-slate-100">
                                <div className="space-y-2">
                                    {event.participants.map(participant => (
                                        <div key={participant.id} className="flex items-center p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs mr-3">
                                                {participant.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{participant.name}</p>
                                                <p className="text-xs text-slate-500">{participant.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 italic ml-7">No specific participants tagged.</p>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
