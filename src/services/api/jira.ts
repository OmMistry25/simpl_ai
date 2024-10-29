import axios from 'axios';

export class JiraService {
  private token: string;
  private domain: string;

  constructor(token: string, domain: string) {
    this.token = token;
    this.domain = domain;
  }

  async getTasks() {
    try {
      const response = await axios.get(`https://${this.domain}.atlassian.net/rest/api/3/search`, {
        headers: {
          Authorization: `Basic ${btoa(this.token)}`,
          Accept: 'application/json',
        },
      });
      return response.data.issues;
    } catch (error) {
      console.error('Error fetching Jira tasks:', error);
      throw error;
    }
  }

  // Add more methods for other Jira API endpoints
}