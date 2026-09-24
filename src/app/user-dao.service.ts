import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserDAO {
  private readonly usersKey = 'yerbashop.users';

  private readUsers(): User[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(this.usersKey) || '[]') as User[];
    } catch {
      return [];
    }
  }

  private writeUsers(users: User[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  findByEmail(email: string): User | undefined {
    return this.readUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  create(user: User): User {
    const users = this.readUsers();
    users.push({ ...user, wishlist: user.wishlist || [] });
    this.writeUsers(users);
    return { ...user };
  }

  update(user: User): User {
    const users = this.readUsers();
    const index = users.findIndex(item => item.id === user.id);
    if (index === -1) throw new Error('Usuario no encontrado');
    users[index] = { ...users[index], ...user, password: user.password || users[index].password };
    this.writeUsers(users);
    return { ...users[index] };
  }
}
