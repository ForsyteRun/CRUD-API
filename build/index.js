(() => {
  'use strict';
  var e = {
      352: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.setUsers = t.getUsers = t.users = void 0),
          (t.users = []),
          (t.getUsers = function () {
            return t.users;
          }),
          (t.setUsers = function (e) {
            t.users = e;
          });
      },
      740: function (e, t, r) {
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, t, r, n) {
                  void 0 === n && (n = r);
                  var s = Object.getOwnPropertyDescriptor(t, r);
                  (s &&
                    !('get' in s
                      ? !t.__esModule
                      : s.writable || s.configurable)) ||
                    (s = {
                      enumerable: !0,
                      get: function () {
                        return t[r];
                      },
                    }),
                    Object.defineProperty(e, n, s);
                }
              : function (e, t, r, n) {
                  void 0 === n && (n = r), (e[n] = t[r]);
                }),
          s =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, t) {
                  Object.defineProperty(e, 'default', {
                    enumerable: !0,
                    value: t,
                  });
                }
              : function (e, t) {
                  e.default = t;
                }),
          i =
            (this && this.__importStar) ||
            function (e) {
              if (e && e.__esModule) return e;
              var t = {};
              if (null != e)
                for (var r in e)
                  'default' !== r &&
                    Object.prototype.hasOwnProperty.call(e, r) &&
                    n(t, e, r);
              return s(t, e), t;
            };
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.server = void 0);
        const o = i(r(520)),
          a = i(r(136)),
          d = r(104),
          c = r(352);
        o.config();
        const p = process.env.PORT;
        (t.server = a.createServer((e, t) => {
          try {
            const r = (0, c.getUsers)();
            if ('GET' === e.method && '/users' === e.url)
              t.writeHead(200, { 'Content-Type': 'application/json' }),
                t.end(JSON.stringify(r));
            else if ('POST' === e.method && '/users' === e.url) {
              let n = '';
              e.on('data', (e) => {
                try {
                  n += e.toString();
                } catch (e) {
                  throw new Error();
                }
              }),
                e.on('end', () => {
                  try {
                    const { username: e, age: s, hobbies: i } = JSON.parse(n);
                    if (!e || !s || !i) throw new Error();
                    const o = {
                      id: (0, d.v4)(),
                      username: e,
                      age: s,
                      hobbies: i,
                    };
                    r.push(o),
                      t.writeHead(201, { 'Content-Type': 'application/json' }),
                      t.end(JSON.stringify(o));
                  } catch {
                    throw new Error();
                  }
                });
            } else if ('GET' === e.method && e.url?.startsWith('/users/')) {
              const n = 'https://' + e.headers.host + '/',
                s = new URL(e.url, n).pathname.split('/')[2],
                i = r.find((e) => e.id === s);
              (0, d.validate)(s)
                ? i
                  ? (t.writeHead(200, { 'Content-Type': 'application/json' }),
                    t.end(JSON.stringify(i)))
                  : (t.writeHead(404, { 'Content-Type': 'application/json' }),
                    t.end(JSON.stringify({ msg: '404 Not Found' })))
                : (t.writeHead(400, { 'Content-Type': 'application/json' }),
                  t.end(JSON.stringify({ msg: 'Inccorect user id' })));
            } else if ('PUT' === e.method && e.url?.startsWith('/users/')) {
              const n = 'https://' + e.headers.host + '/',
                s = new URL(e.url, n).pathname.split('/')[2];
              let i = '';
              e.on('data', (e) => {
                try {
                  i += e.toString();
                } catch (e) {
                  throw new Error();
                }
              }),
                e.on('end', () => {
                  try {
                    const e = JSON.parse(i),
                      n = r.find((e) => e.id === s);
                    if ((0, d.validate)(s))
                      if (n) {
                        const i = { ...n, ...e },
                          o = [...r.filter((e) => e.id !== s), i];
                        (0, c.setUsers)(o),
                          t.writeHead(201, {
                            'Content-Type': 'application/json',
                          }),
                          t.end(JSON.stringify(i));
                      } else
                        t.writeHead(404, {
                          'Content-Type': 'application/json',
                        }),
                          t.end(JSON.stringify({ msg: '404 Not Found' }));
                    else
                      t.writeHead(400, { 'Content-Type': 'application/json' }),
                        t.end(JSON.stringify({ msg: 'Inccorect user id' }));
                  } catch {
                    throw new Error();
                  }
                });
            } else if ('DELETE' === e.method && e.url?.startsWith('/users/')) {
              const r = 'https://' + e.headers.host + '/',
                n = new URL(e.url, r).pathname.split('/')[2],
                s = (0, c.getUsers)().find((e) => e.id === n),
                i = (0, c.getUsers)().filter((e) => e.id !== n);
              (0, d.validate)(n)
                ? s
                  ? ((0, c.setUsers)(i),
                    t.writeHead(204, { 'Content-Type': 'application/json' }),
                    t.end(JSON.stringify(s)))
                  : (t.writeHead(404, { 'Content-Type': 'application/json' }),
                    t.end(JSON.stringify({ msg: '404 Not Found' })))
                : (t.writeHead(400, { 'Content-Type': 'application/json' }),
                  t.end(JSON.stringify({ msg: 'Inccorect user id' })));
            } else
              t.writeHead(404, { 'Content-Type': 'application/json' }),
                t.end(JSON.stringify({ msg: '404 Not Found' }));
          } catch {
            t.writeHead(500, { 'Content-Type': 'application/json' }),
              t.end(JSON.stringify({ msg: 'server side error' }));
          }
        })),
          t.server.listen(p, () => {
            console.log(`Server is running on port ${p}`);
          });
      },
      520: (e) => {
        e.exports = require('dotenv');
      },
      104: (e) => {
        e.exports = require('uuid');
      },
      136: (e) => {
        e.exports = require('http');
      },
    },
    t = {};
  !(function r(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var i = (t[n] = { exports: {} });
    return e[n].call(i.exports, i, i.exports, r), i.exports;
  })(740);
})();
