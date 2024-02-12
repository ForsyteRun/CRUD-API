import * as dotenv from 'dotenv';
import * as http from 'http';
import { validate as isValidUUID, v4 as uuidv4 } from 'uuid';
import { getUsers, setUsers } from './../db';
import { type IUser } from './../types';

dotenv.config();

const port = process.env.PORT;

export const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      const users = getUsers();

      if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';

        req.on('data', (chunk) => {
          try {
            body += chunk.toString();
          } catch (error) {
            throw new Error();
          }
        });

        req.on('end', () => {
          try {
            const { username, age, hobbies }: IUser = JSON.parse(body);

            if (!username || !age || !hobbies) throw new Error();

            const newUser: IUser = {
              id: uuidv4(),
              username,
              age,
              hobbies,
            };

            users.push(newUser);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
          } catch {
            throw new Error();
          }
        });
      } else if (req.method === 'GET' && req.url?.startsWith('/users/')) {
        const baseURL = 'https' + '://' + req.headers.host + '/';
        const parsedUrl = new URL(req.url, baseURL);
        const pathname = parsedUrl.pathname;
        const parts = pathname.split('/');
        const id = parts[2];

        const userById = users.find((user: IUser) => user.id === id);

        if (!isValidUUID(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ msg: 'Inccorect user id' }));
        } else if (!userById) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ msg: '404 Not Found' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(userById));
        }
      } else if (req.method === 'PUT' && req.url?.startsWith('/users/')) {
        const baseURL = 'https' + '://' + req.headers.host + '/';
        const parsedUrl = new URL(req.url, baseURL);
        const pathname = parsedUrl.pathname;
        const parts = pathname.split('/');
        const id = parts[2];

        let body = '';

        req.on('data', (chunk) => {
          try {
            body += chunk.toString();
          } catch (error) {
            throw new Error();
          }
        });

        req.on('end', () => {
          try {
            const data: IUser = JSON.parse(body);

            const userById = users.find((user: IUser) => user.id === id);

            if (!isValidUUID(id)) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ msg: 'Inccorect user id' }));
            } else if (!userById) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ msg: '404 Not Found' }));
            } else {
              const modifyUser = { ...userById, ...data };
              const filterUsers = users.filter((user: IUser) => user.id !== id);

              const modifyUsers = [...filterUsers, modifyUser];
              setUsers(modifyUsers);

              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(modifyUser));
            }
          } catch {
            throw new Error();
          }
        });
      } else if (req.method === 'DELETE' && req.url?.startsWith('/users/')) {
        const baseURL = 'https' + '://' + req.headers.host + '/';
        const parsedUrl = new URL(req.url, baseURL);
        const pathname = parsedUrl.pathname;
        const parts = pathname.split('/');
        const id = parts[2];

        const userToRemove = getUsers().find((user: IUser) => user.id === id);
        const modifyUsers = getUsers().filter((user: IUser) => user.id !== id);

        if (!isValidUUID(id)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ msg: 'Inccorect user id' }));
        } else if (!userToRemove) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ msg: '404 Not Found' }));
        } else {
          setUsers(modifyUsers);
          res.writeHead(204, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(userToRemove));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: '404 Not Found' }));
      }
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ msg: 'server side error' }));
    }
  }
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
