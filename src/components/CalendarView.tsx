import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, X, Plus, MapPin, Video, FileText, Briefcase, User, Users, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { Event } from '../models';

interface CalendarViewProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, setEvents }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    start: new Date(),
    end: new Date(),
    location: '',
    description: '',
    source: 'other',
    category: 'personal'
  });
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal' | 'social' | 'overdue' | 'all'>('all');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && ['work', 'personal', 'social', 'overdue', 'all'].includes(category)) {
      setActiveCategory(category as 'work' | 'personal' | 'social' | 'overdue' | 'all');
    }
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents(prev => [...prev, { ...newEvent, id: Date.now().toString() } as Event]);
      setNewEvent({
        title: '',
        start: new Date(),
        end: new Date(),
        location: '',
        description: '',
        source: 'other',
        category: 'personal'
      });
      setIsCreateModalOpen(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google':
        return <img src="https://www.google.com/favicon.ico" alt="Google Calendar" className="w-4 h-4" />;
      case 'outlook':
        return <img src="https://outlook.live.com/favicon.ico" alt="Outlook Calendar" className="w-4 h-4" />;
      case 'apple':
        return <img src="https://www.apple.com/favicon.ico" alt="Apple Calendar" className="w-4 h-4" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work':
        return <Briefcase size={16} className="text-blue-500" />;
      case 'personal':
        return <User size={16} className="text-green-500" />;
      case 'social':
        return <Users size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : activeCategory === 'overdue'
    ? events.filter(event => new Date(event.start) < oneWeekAgo)
    : events.filter(event => event.category === activeCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add Event
        </button>
      </div>
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('work')}
          className={`px-4 py-2 rounded ${activeCategory === 'work' ? 'bg-blue-500-500 text-white' : 'bg-gray-200'}`}
        >
          Work
        </button>
        <button
          onClick={() => setActiveCategory('personal')}
          className={`px-4 py-2 rounded ${activeCategory === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveCategory('social')}
          className={`px-4 py-2 rounded ${activeCategory === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Social
        </button>
        <button
          onClick={() => setActiveCategory('overdue')}
          className={`px-4 py-2 rounded ${activeCategory === 'overdue' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Overdue
        </button>
      </div>
      <div className="space-y-4 mb-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex-grow">
              <div className="flex items-center">
                {getSourceIcon(event.source)}
                <strong className="ml-2">{event.title}</strong>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {event.start.toLocaleDateString()} at {formatEventTime(event.start)}
              </div>
            </div>
            <div className="ml-3">
              {getCategoryIcon(event.category)}
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-3">
              <p><Calendar size={16} className="inline mr-2" />{selectedEvent.start.toLocaleDateString()} at {formatEventTime(selectedEvent.start)}</p>
              {selectedEvent.location && <p><MapPin size={16} className="inline mr-2" />{selectedEvent.location}</p>}
              {selectedEvent.description && <p><FileText size={16} className="inline mr-2" />{selectedEvent.description}</p>}
              <p>{getCategoryIcon(selectedEvent.category)} {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}</p>
              
              {/* Add relevant links */}
              {selectedEvent.links && selectedEvent.links.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Relevant Links:</h4>
                  <ul className="list-disc list-inside">
                    {selectedEvent.links.map((link, index) => (
                      <li key={index} className="flex items-center">
                        <LinkIcon size={16} className="inline mr-2" />
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create New Event</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="w-full border rounded p-3"
                placeholder="Event title"
                required
              />
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start.toISOString().slice(0, 16)}
                onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                className="w-full border rounded p-3"
                required
              />
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end.toISOString().slice(0, 16)}
                onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                className="w-full border rounded p-3"
                required
              />
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                className="w-full border rounded p-3"
                placeholder="Location (optional)"
              />
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="w-full border rounded p-3"
                placeholder="Description (optional)"
              />
              <select
                name="source"
                value={newEvent.source}
                onChange={handleInputChange}
                className="w-full border rounded p-3"
                required
              >
                <option value="google">Google Calendar</option>
                <option value="outlook">Outlook Calendar</option>
                <option value="apple">Apple Calendar</option>
                <option value="other">Other</option>
              </select>
              <select
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
                className="w-full border rounded p-3"
                required
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="social">Social</option>
              </select>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded">
                Create Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;