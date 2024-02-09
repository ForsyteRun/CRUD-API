import { IUser } from "./types";

export let users: IUser[] = [];

function getUsers() {
  return users;
}

function setUsers(updatedUsers: IUser[]) {
  users = updatedUsers;
}

export { getUsers, setUsers };
