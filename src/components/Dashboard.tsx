import React from 'react';
import { Message, Task, Event } from '../models';
import { CheckSquare, MessageSquare, Calendar, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardProps {
  messages: Message[];
  tasks: Task[];
  events: Event[];
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ messages, tasks, events, userName }) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const backlogTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < oneWeekAgo).length;
  const backlogMessages = messages.filter(message => new Date(message.timestamp) < oneWeekAgo && !message.replied).length;
  const backlogEvents = events.filter(event => new Date(event.start) < oneWeekAgo).length;

  const MetricCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; link: string }> = ({ icon, title, value, link }) => (
    <Link to={link} className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Link>
  );

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {userName}!</h1>
        <p className="text-gray-600">Here's your digital life, simplified!</p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Today's Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<CheckSquare size={24} className="text-blue-500" />}
          title="Tasks for Today"
          value={tasks.filter(task => !task.completed && new Date(task.dueDate) >= new Date()).length}
          link="/tasks"
        />
        <MetricCard
          icon={<MessageSquare size={24} className="text-green-500" />}
          title="Unread Messages"
          value={messages.filter(message => !message.replied).length}
          link="/messages"
        />
        <MetricCard
          icon={<Calendar size={24} className="text-purple-500" />}
          title="Upcoming Events"
          value={events.filter(event => new Date(event.start) > new Date()).length}
          link="/calendar"
        />
        <MetricCard
          icon={<AlertCircle size={24} className="text-red-500" />}
          title="Total Backlog Items"
          value={backlogTasks + backlogMessages + backlogEvents}
          link="/tasks?category=overdue"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Overdue Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={<CheckSquare size={24} className="text-red-500" />}
          title="Overdue Tasks"
          value={backlogTasks}
          link="/tasks?category=overdue"
        />
        <MetricCard
          icon={<MessageSquare size={24} className="text-red-500" />}
          title="Overdue Messages"
          value={backlogMessages}
          link="/messages?category=overdue"
        />
        <MetricCard
          icon={<Calendar size={24} className="text-red-500" />}
          title="Overdue Events"
          value={backlogEvents}
          link="/calendar?category=overdue"
        />
      </div>
    </div>
  );
};

export default Dashboard;