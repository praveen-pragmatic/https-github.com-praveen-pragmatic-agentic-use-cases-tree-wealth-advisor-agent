import type { Order, User, Cocktail } from '../types';

export const getOrdersByStatus = (orders: Order[]) => ({
  pending: orders.filter((order) => order.status === 'pending'),
  preparing: orders.filter((order) => order.status === 'preparing'),
  ready: orders.filter((order) => order.status === 'ready'),
  delivered: orders.filter((order) => order.status === 'delivered')
});

export const hasActiveOrder = (orders: Order[], userId: string) => 
  orders.some(
    (order) =>
      order.userId === userId &&
      !['delivered', 'cancelled'].includes(order.status)
  );

export const getUserById = (users: User[], userId: string) =>
  users.find(user => user.id === userId);

export const getCocktailById = (cocktails: Cocktail[], cocktailId: string) =>
  cocktails.find(cocktail => cocktail.id === cocktailId);