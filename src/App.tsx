import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Tasks from './components/Tasks';
import CalendarView from './components/CalendarView';
import Profile from './components/Profile';
import SettingsView from './components/SettingsView';
import { Message, Task, Event } from './models';
import { MessageSquare, CheckSquare, Calendar, User, Settings, LayoutDashboard } from 'lucide-react';
import { DataSyncService } from './services/dataSync';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [productivityGoal, setProductivityGoal] = useState(80);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('John Doe');

  const tabs = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { id: 'tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  useEffect(() => {
    const dataSync = new DataSyncService();
    const fetchData = async () => {
      try {
        const fetchedMessages = await dataSync.syncMessages();
        const fetchedTasks = await dataSync.syncTasks();
        const fetchedEvents = await dataSync.syncEvents();
        setMessages(fetchedMessages);
        setTasks(fetchedTasks);
        setEvents(fetchedEvents);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Switch>
              <Route exact path="/">
                <Dashboard messages={messages} tasks={tasks} events={events} userName={userName} />
              </Route>
              <Route path="/messages">
                <Messages messages={messages} setMessages={setMessages} />
              </Route>
              <Route path="/tasks">
                <Tasks tasks={tasks} setTasks={setTasks} />
              </Route>
              <Route path="/calendar">
                <CalendarView events={events} setEvents={setEvents} />
              </Route>
              <Route path="/profile">
                <Profile
                  setProductivityGoal={setProductivityGoal}
                  productivityGoal={productivityGoal}
                  userName={userName}
                  setUserName={setUserName}
                />
              </Route>
              <Route path="/settings">
                <SettingsView />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;