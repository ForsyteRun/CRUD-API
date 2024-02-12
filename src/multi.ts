import * as dotenv from 'dotenv';
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import * as url from 'url';
import { validate as isValidUUID, v4 as uuidv4 } from 'uuid';
// // import { getUsers, setUsers } from "./db";
import { type IUser } from '../types';

dotenv.config();

const initData: unknown[] = [];

const port = process.env.PORT;
const counter = port ? +port : 3000;

if (cluster.isPrimary) {
  for (let i = 0; i < availableParallelism() - 1; i++) {
    const worker = cluster.fork({ WORKER_PORT: counter + i });

    worker.on('message', function (msg) {
      console.log('Worker to master: ', msg);

      initData.push(msg.value?.data);

      worker.send(initData);
    });
  }

  // Object.values(cluster.workers).forEach((worker) => {
  //   worker.send({ message: "Hello from master!" });
  // });

  // cluster.on("message", (worker, message) => {
  //   console.log(`Received message from worker ${message}:`, message);
  //   if (message.type === "updateData") {
  //     initData.push(message, 99);
  //     console.log("Shared data updated:", initData);
  //   } else if (message.type === "requestEnd") {
  //     console.log(`Received end message from worker ${worker?.process.pid}`);
  //     // Handle the end of request processing
  //   }
  // });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const port = process.env.WORKER_PORT;
  let data: Array<IUser | null> = [];
  const childData: unknown[] = [];

  const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      // process.on("message", function (msg: Array<IUser | null>) {
      //   try {
      //     data = msg;
      //   } catch (error) {
      //     throw new Error();
      //   }
      //   // console.log("Master to worker:", msg, 77);
      // });

      // process.on("exit", function () {
      //   console.log(data, "exit");
      // });

      try {
        if (req.method === 'GET' && req.url === '/users') {
          // process.on("message", function (msg: Array<IUser | null>) {
          //   try {
          //     data = msg;
          //   } catch (error) {
          //     throw new Error();
          //   }
          //   // console.log("Master to worker:", msg, 77);
          // });

          // process.on("exit", function () {
          //   console.log(data, "exit");
          // });

          process.on('message', function (msg: Array<IUser | null>) {
            try {
              data = msg;
            } catch (error) {
              throw new Error();
            }

            // const rmEmptyData = msg.filter((n) => n);
            console.log('Master to worker:', data, 77);
          });

          res.writeHead(200, { 'Content-Type': 'application/json' });

          res.end(JSON.stringify({ users: data }));
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

              cluster.worker?.send?.({
                type: 'updateData',
                value: { data: newUser },
              });

              childData.push(newUser);
              // process.send?.({ type: "requestEnd" });

              res.end();
            } catch {
              throw new Error();
            }
          });
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

  process.on('message', function (msg: Array<IUser | null>) {
    try {
      data = msg;
    } catch (error) {
      throw new Error();
    }

    // const rmEmptyData = msg.filter((n) => n);
    console.log('Master to worker:', childData, 77);
  });
}
