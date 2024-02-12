import { type IUser } from './types';

export let users: IUser[] = [];

function getUsers(): IUser[] {
  return users;
}

function setUsers(updatedUsers: IUser[]): void {
  users = updatedUsers;
}

export { getUsers, setUsers };
