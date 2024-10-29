import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckSquare, Square, Plus, X, Briefcase, User, Users, AlertCircle } from 'lucide-react';
import { Task } from '../models';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const location = useLocation();
  const [newTask, setNewTask] = useState({ title: '', source: 'other' as Task['source'], category: 'personal' as Task['category'] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'work' | 'personal' | 'social' | 'overdue' | 'all'>('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && ['work', 'personal', 'social', 'overdue', 'all'].includes(category)) {
      setActiveCategory(category as 'work' | 'personal' | 'social' | 'overdue' | 'all');
    }
  }, [location]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      setTasks([...tasks, { 
        id: Date.now().toString(), 
        title: newTask.title, 
        completed: false, 
        source: newTask.source,
        category: newTask.category,
        dueDate: new Date()
      } as Task]);
      setNewTask({ title: '', source: 'other', category: 'personal' });
      setIsCreateModalOpen(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'jira':
        return <img src="https://jira.atlassian.com/favicon.ico" alt="Jira" className="w-4 h-4" />;
      case 'github':
        return <img src="https://github.com/favicon.ico" alt="GitHub" className="w-4 h-4" />;
      case 'asana':
        return <img src="https://asana.com/favicon.ico" alt="Asana" className="w-4 h-4" />;
      case 'trello':
        return <img src="https://trello.com/favicon.ico" alt="Trello" className="w-4 h-4" />;
      case 'todoist':
        return <img src="https://todoist.com/favicon.ico" alt="Todoist" className="w-4 h-4" />;
      case 'apple-reminders':
        return <img src="https://www.apple.com/favicon.ico" alt="Apple Reminders" className="w-4 h-4" />;
      default:
        return <CheckSquare size={16} className="text-gray-500" />;
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

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const filteredTasks = activeCategory === 'all' 
    ? tasks 
    : activeCategory === 'overdue'
    ? tasks.filter(task => !task.completed && new Date(task.dueDate) < oneWeekAgo)
    : tasks.filter(task => task.category === activeCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add Task
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
          className={`px-4 py-2 rounded ${activeCategory === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
      <ul className="space-y-3 mb-6">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center bg-gray-100 p-4 rounded-lg">
            <button onClick={() => toggleTask(task.id)} className="mr-3">
              {task.completed ? (
                <CheckSquare size={20} className="text-green-500" />
              ) : (
                <Square size={20} className="text-gray-400" />
              )}
            </button>
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
            <span className="ml-auto flex items-center">
              {getSourceIcon(task.source)}
              <span className="ml-2">{getCategoryIcon(task.category)}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create New Task</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full border rounded p-3"
                placeholder="Task description"
                required
              />
              <select
                value={newTask.source}
                onChange={(e) => setNewTask({ ...newTask, source: e.target.value as Task['source'] })}
                className="w-full border rounded p-3"
              >
                <option value="jira">Jira</option>
                <option value="github">GitHub</option>
                <option value="asana">Asana</option>
                <option value="trello">Trello</option>
                <option value="todoist">Todoist</option>
                <option value="apple-reminders">Apple Reminders</option>
                <option value="other">Other</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
                className="w-full border rounded p-3"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="social">Social</option>
              </select>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;