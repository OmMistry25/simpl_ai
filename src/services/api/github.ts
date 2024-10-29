import axios from 'axios';

export class GithubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getTasks() {
    try {
      const response = await axios.get('https://api.github.com/issues', {
        headers: {
          Authorization: `token ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
      throw error;
    }
  }

  // Add more methods for other GitHub API endpoints
}