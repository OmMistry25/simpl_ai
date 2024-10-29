import axios from 'axios';

export class GoogleCalendarService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getEvents() {
    try {
      const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  }

  // Add more methods for other Google Calendar API endpoints
}