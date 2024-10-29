export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  platform: string;
  category: 'work' | 'personal' | 'social';
}

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  source: string;
  category: 'work' | 'personal' | 'social';
  links?: { title: string; url: string }[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  source: string;
  category: 'work' | 'personal' | 'social';
}