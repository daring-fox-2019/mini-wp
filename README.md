## TYPRO - MiniWP

API Documentation

**URLs**

```Client URL : http://localhost:8080,
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

#### Usage

Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a sign in / sign up action on the client-side.

Run `nodemon app.js` to start the server.

Run `live-server --host=localhost` to start the client.

### List of Articles Routes



| Routes          | HTTP   | Header(s)            | Body | Response Success                                             | Response Error        | Description                    |
| :-------------- | ------ | -------------------- | ---- | ------------------------------------------------------------ | --------------------- | ------------------------------ |
| /articles/all   | GET    | Token                | None | `Status code : 200`<br>`dataTypes : []`                      | `Status code : 500` ` | Get all articles list by users |
| /articles       | GET    | Token                | None | `Status code : 200`<br/>`dataTypes : []`                     | `Status code : 500` ` | Get user's article             |
| /articles/likes | GET    | Token                | None | `Status code : 200`<br/>`dataTypes : []`                     | `Status code : 500`   | Get liked article by user      |
| /articles/query | GET    | Token                | None | `Status code : 2001`<br/>`dataTypes : {}`                    | `Status code : 400`   | Create an article by us        |
| /articles/:id   | GET    | Token                | None | `Status code : 2001`<br/>`dataTypes : {}`                    | `Statuc doce : 'd,m'` | Get one article                |
| /articles/:id   | DELETE | Token, Authorization | None | `Status code : 200`<br/>`dataTypes : {}`                     | `Status code : 400`   | Delete an atricle              |
| /articles/:id   | PUT    | Token, Authorization | None | `Status code : 200`<br/>`dataTypes : {}`                     | `Status code : 400`   | Edit an article                |
| /articles       | POST   | Token                | None | userId:String**(Required)**, title:String**(Required)**, content:String**(Required)**, image:**String(Required)**,tags:[ObjectId]; | `Status code : 400`   | Posted new article             |
| /translate      | POST   | None                 | None | Title:(**string**),Text:**string**                           | `Status code 400`     | Translate currentsaatucke      |



### List of User Routes

| Routes              | HTTP | Header(s) | Body                                                         | Response Success                           | Response Error        | Description          |
| ------------------- | ---- | --------- | ------------------------------------------------------------ | ------------------------------------------ | --------------------- | -------------------- |
| /users/register | POST | Token     | None                                                         | ``Status code : 200`<br/>`dataTypes : {}`` | ``Status code : 400`` | Register new user |
| /users/signin/local | POST | None      | username:String**(Required)**, <br>password:String**(Required)**,<br>email:String(**Required**) | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` | Sign in through local  |
| /users/signin/google | POST | None      | password:String**(Required)**,<br/>email:String(**Required**)** | `Status code : 200`<br/>`dataTypes : {}` | `Status code : 400` | Sign in through google |

### List of Tags Routes

| Routes          | HTTP   | Header(s)            | Body | Response Success                                             | Response Error        | Description                    |
| --------------- | ------ | -------------------- | ---- | ------------------------------------------------------------ | --------------------- | ------------------------------ |
| /tags/   | POST    | Token                | None | `Status code : 200`<br>`dataTypes : []`                      | `Status code : 500` ` | Generate tags by google vision |
| /user       | POST    | Token                | None | `Status code : 201`<br/>`dataTypes : []`                    | `Status code : 500` ` | Generate tags by manual input |
