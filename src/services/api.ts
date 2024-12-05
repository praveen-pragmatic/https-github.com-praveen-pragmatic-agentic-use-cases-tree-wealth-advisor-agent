import { config } from '../config';

export const api = {
  async getOrders() {
    const response = await fetch(`${config.apiUrl}/orders`);
    return response.json();
  },

  async getUsers() {
    const response = await fetch(`${config.apiUrl}/users`);
    return response.json();
  }
};