import axios from 'axios';

export class GmailService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getMessages() {
    try {
      const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data.messages;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('Gmail authentication failed. Please check your token.');
        return [];
      }
      console.error('Error fetching Gmail messages:', error);
      return [];
    }
  }

  // Add more methods for other Gmail API endpoints
}