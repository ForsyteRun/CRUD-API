import { IUser } from "./types";

export let users: IUser[] = [{ id: "s", age: 55, hobbies: [], username: "gj" }];

function getUsers() {
  return users;
}

function setUsers(updatedUsers: IUser[]) {
  users = updatedUsers;
}

export { getUsers, setUsers };
