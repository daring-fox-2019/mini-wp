# mini-wp


**Usage**

```
npm install
npm run dev
live-server --host=localhost
```

Access client via `http://localhost:8080`
Access server via `http://localhost:3000`
demo : 'miniwp.mri.web.id'

1. **List of users routes:** 

| Route                 | HTTP | Header(s) | Body                                                         | RESPONSE Success | RESPONSE Error        | Description                                |
| --------------------- | ---- | --------- | ------------------------------------------------------------ | ---------------- | --------------------- | ------------------------------------------ |
| /user/register       | POST | none      | name:String(**required**)<br/>email:String(**required**)<br/>password:String(**required**) | Register a user  | Internal server error | register as a user                         |
| /user/login        | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user                            |
| /user/google-login | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user (**Using Google Account**) |

2. **List of articlea routes:** 

| Route               | HTTP   | Header(s) | Body                                                         | RESPONSE Success       | RESPONSE Error        | Description             |
| ------------------- | ------ | --------- | ------------------------------------------------------------ | ---------------------- | --------------------- | ----------------------- |
| article/             | POST   | 'Content-Type': 'multipart/form-data',token     | title:String(**required**)<br />content:String(**required**)<br/>file:file(**required**) | Success add new article  | Internal server error | Create a new article    |
| article/:id | PUT | 'Content-Type': 'multipart/form-data',token      | title:String(**optional*)<br />content:String(**optional**)<br/>file(**optional**)                                                         | Success update  article | Internal Server Error | Complete  a article        |
| article/:id          | DELETE | token     | none                                                         | Success Delete article    | Internal Server Error | Delete a article from Articles |
| /article/        | GET | token     | none                                                         |   array of object[{}] article  | Internal Server Error | get all data article form article |
| /article/:id        | GET | token     | none                                                         |   object{} article  | Internal Server Error | get a data article form article |
| /article/user/list        | GET | token     | none                                                         |   array of object[{}]  | Internal Server Error | get user's article(s) form articles |
| /article/search/:tagName     | GET | token     | none                                                         |   array of object[{}]  | Internal Server Error | get user's article(s) form articles filtering by tagname |
