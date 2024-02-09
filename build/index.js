(()=>{"use strict";var e={352:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setUsers=t.getUsers=t.users=void 0,t.users=[{id:"s",age:55,hobbies:[],username:"gj"}],t.getUsers=function(){return t.users},t.setUsers=function(e){t.users=e}},148:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var i=Object.getOwnPropertyDescriptor(t,r);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&i(t,e,r);return o(t,e),t},a=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,i=0,o=t.length;i<o;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i]);return e.concat(n||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0});var u=s(r(136)),c=s(r(520)),d=r(104),p=r(352),l=s(r(716));c.config();var f=process.env.PORT;u.createServer((function(e,t){var r,i,o;try{var s=(0,p.getUsers)();if("GET"===e.method&&"/users"===e.url)t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(s));else if("POST"===e.method&&"/users"===e.url){var u="";e.on("data",(function(e){try{u+=e.toString()}catch(e){throw new Error}})),e.on("end",(function(){try{var e=JSON.parse(u),r=e.username,n=e.age,i=e.hobbies;if(!r||!n||!i)throw new Error;var o={id:(0,d.v4)(),username:r,age:n,hobbies:i};s.push(o),t.writeHead(201,{"Content-Type":"application/json"}),t.end(JSON.stringify(o))}catch(e){throw new Error}}))}else if("GET"===e.method&&(null===(r=e.url)||void 0===r?void 0:r.startsWith("/users/"))){var c=l.parse(e.url,!0).pathname.split("/")[2],f=s.find((function(e){return e.id===c}));(0,d.validate)(c)?f?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end("404 Not Found")):(t.writeHead(400,{"Content-Type":"application/json"}),t.end("Inccorect user id"))}else if("PUT"===e.method&&(null===(i=e.url)||void 0===i?void 0:i.startsWith("/users/"))){var v=l.parse(e.url,!0).pathname.split("/")[2],h="";e.on("data",(function(e){try{h+=e.toString()}catch(e){throw new Error}})),e.on("end",(function(){try{var e=JSON.parse(h),r=s.find((function(e){return e.id===v}));if((0,d.validate)(v))if(r){var i=n(n(n({},r),e),{id:(0,d.v4)()}),o=s.filter((function(e){return e.id!==v})),u=a(a([],o,!0),[i],!1);(0,p.setUsers)(u),t.writeHead(201,{"Content-Type":"application/json"}),t.end(JSON.stringify(i))}else t.writeHead(404,{"Content-Type":"application/json"}),t.end("404 Not Found");else t.writeHead(400,{"Content-Type":"application/json"}),t.end("Inccorect user id")}catch(e){throw new Error}}))}else if("DELETE"===e.method&&(null===(o=e.url)||void 0===o?void 0:o.startsWith("/users/"))){var y=l.parse(e.url,!0).pathname.split("/")[2],g=(0,p.getUsers)().find((function(e){return e.id===y})),w=(0,p.getUsers)().filter((function(e){return e.id!==y}));(0,d.validate)(y)?g?((0,p.setUsers)(w),t.writeHead(204,{"Content-Type":"application/json"}),t.end(JSON.stringify(g))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end("404 Not Found")):(t.writeHead(400,{"Content-Type":"application/json"}),t.end("Inccorect user id"))}else t.writeHead(404,{"Content-Type":"text/plain"}),t.end("404 Not Found")}catch(e){t.writeHead(500,{"Content-Type":"text/plain"}),t.end("server side error")}})).listen(f,(function(){console.log("Server is running on port ".concat(f))}))},520:e=>{e.exports=require("dotenv")},104:e=>{e.exports=require("uuid")},136:e=>{e.exports=require("http")},716:e=>{e.exports=require("url")}},t={};!function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(148)})();