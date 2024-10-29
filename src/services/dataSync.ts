import { Message, Event, Task } from '../models';

export class DataSyncService {
  async syncMessages(): Promise<Message[]> {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      return [
        {
          id: '1',
          sender: 'John Doe',
          content: 'Hey, can we discuss the project timeline?',
          timestamp: today,
          platform: 'slack',
          category: 'work',
          replied: false
        },
        {
          id: '2',
          sender: 'Jane Smith',
          content: 'Don\'t forget about our lunch plans!',
          timestamp: yesterday,
          platform: 'gmail',
          category: 'personal',
          replied: true
        },
        {
          id: '3',
          sender: 'Team Lead',
          content: 'Please submit your weekly reports by Friday.',
          timestamp: today,
          platform: 'outlook',
          category: 'work',
          replied: false
        },
        {
          id: '4',
          sender: 'Mom',
          content: 'Call me when you have a moment.',
          timestamp: twoDaysAgo,
          platform: 'whatsapp',
          category: 'personal',
          replied: false
        },
        {
          id: '5',
          sender: 'Sarah',
          content: 'Are we still on for the party this weekend?',
          timestamp: yesterday,
          platform: 'instagram',
          category: 'social',
          replied: false
        },
        {
          id: '6',
          sender: 'Alex',
          content: 'Don\'t forget to RSVP for the conference next month.',
          timestamp: oneWeekAgo,
          platform: 'email',
          category: 'work',
          replied: false
        },
        {
          id: '7',
          sender: 'David',
          content: 'Check out this new restaurant downtown!',
          timestamp: oneWeekAgo,
          platform: 'slack',
          category: 'social',
          replied: false
        },
        {
          id: '8',
          sender: 'HR Department',
          content: 'Your vacation request has been approved.',
          timestamp: oneWeekAgo,
          platform: 'outlook',
          category: 'work',
          replied: false
        }
      ];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  async syncEvents(): Promise<Event[]> {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      return [
        {
          id: '1',
          title: 'Team Meeting',
          start: new Date(today.getTime() + 2 * 60 * 60 * 1000),
          end: new Date(today.getTime() + 3 * 60 * 60 * 1000),
          location: 'Conference Room A',
          description: 'Weekly team sync-up to discuss ongoing projects and blockers',
          source: 'google',
          category: 'work',
          links: [
            { title: 'Meeting Agenda', url: 'https://example.com/agenda' },
            { title: 'Project Dashboard', url: 'https://example.com/dashboard' }
          ]
        },
        {
          id: '2',
          title: 'Lunch with Sarah',
          start: new Date(today.getTime() + 4 * 60 * 60 * 1000),
          end: new Date(today.getTime() + 5 * 60 * 60 * 1000),
          location: 'Cafe Downtown',
          description: 'Catch up over lunch and discuss potential collaboration',
          source: 'outlook',
          category: 'personal',
          links: [
            { title: 'Restaurant Menu', url: 'https://example.com/cafe-menu' }
          ]
        },
        {
          id: '3',
          title: 'Project Deadline',
          start: tomorrow,
          end: new Date(tomorrow.getTime() + 1 * 60 * 60 * 1000),
          description: 'Submit final project deliverables',
          source: 'google',
          category: 'work',
          links: [
            { title: 'Project Repository', url: 'https://example.com/project-repo' }
          ]
        },
        {
          id: '4',
          title: 'Family Dinner',
          start: new Date(today.getTime() + 8 * 60 * 60 * 1000),
          end: new Date(today.getTime() + 10 * 60 * 60 * 1000),
          location: 'Home',
          description: 'Monthly family dinner',
          source: 'apple',
          category: 'personal'
        },
        {
          id: '5',
          title: 'Movie Night with Friends',
          start: tomorrow,
          end: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000),
          location: 'Local Cinema',
          description: 'Watching the latest blockbuster',
          source: 'google',
          category: 'social',
          links: [
            { title: 'Movie Tickets', url: 'https://example.com/movie-tickets' }
          ]
        },
        {
          id: '6',
          title: 'Missed Dentist Appointment',
          start: oneWeekAgo,
          end: new Date(oneWeekAgo.getTime() + 1 * 60 * 60 * 1000),
          location: 'Dental Clinic',
          description: 'Regular check-up',
          source: 'outlook',
          category: 'personal'
        },
        {
          id: '7',
          title: 'Overdue Client Meeting',
          start: oneWeekAgo,
          end: new Date(oneWeekAgo.getTime() + 2 * 60 * 60 * 1000),
          location: 'Client Office',
          description: 'Discuss project progress and next steps',
          source: 'google',
          category: 'work'
        },
        {
          id: '8',
          title: 'Missed Yoga Class',
          start: oneWeekAgo,
          end: new Date(oneWeekAgo.getTime() + 1 * 60 * 60 * 1000),
          location: 'Yoga Studio',
          description: 'Weekly yoga session',
          source: 'apple',
          category: 'personal'
        }
      ];
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async syncTasks(): Promise<Task[]> {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      return [
        {
          id: '1',
          title: 'Prepare presentation for client meeting',
          description: 'Create slides and gather necessary data',
          dueDate: tomorrow,
          completed: false,
          source: 'asana',
          category: 'work',
        },
        {
          id: '2',
          title: 'Buy groceries',
          description: 'Milk, eggs, bread, and vegetables',
          dueDate: today,
          completed: false,
          source: 'apple-reminders',
          category: 'personal',
        },
        {
          id: '3',
          title: 'Review pull request #42',
          description: 'Check the code changes and provide feedback',
          dueDate: new Date(today.getTime() + 3 * 60 * 60 * 1000),
          completed: false,
          source: 'github',
          category: 'work',
        },
        {
          id: '4',
          title: 'Plan weekend trip',
          description: 'Research destinations and book accommodations',
          dueDate: nextWeek,
          completed: false,
          source: 'todoist',
          category: 'personal',
        },
        {
          id: '5',
          title: 'Organize team building event',
          description: 'Choose activities and send out invitations',
          dueDate: nextWeek,
          completed: false,
          source: 'trello',
          category: 'work',
        },
        {
          id: '6',
          title: 'Call friends for reunion planning',
          description: 'Discuss date and venue options',
          dueDate: tomorrow,
          completed: false,
          source: 'apple-reminders',
          category: 'social',
        },
        {
          id: '7',
          title: 'Overdue: Submit expense report',
          description: 'Compile receipts and fill out the expense form',
          dueDate: oneWeekAgo,
          completed: false,
          source: 'asana',
          category: 'work',
        },
        {
          id: '8',
          title: 'Overdue: Schedule car maintenance',
          description: 'Book an appointment for oil change and tire rotation',
          dueDate: oneWeekAgo,
          completed: false,
          source: 'todoist',
          category: 'personal',
        },
        {
          id: '9',
          title: 'Overdue: RSVP to party invitation',
          description: 'Respond to the email invitation for next month\'s party',
          dueDate: oneWeekAgo,
          completed: false,
          source: 'apple-reminders',
          category: 'social',
        }
      ];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
}