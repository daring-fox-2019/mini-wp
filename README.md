# mini-wp



## List of User Routes

|     Routes      | HTTP | Header(s) |                             Body                             |                           Response                           |        Description         |
| :-------------: | :--: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :------------------------: |
| /users/register | POST |   none    | username:String(**required**),email: String (**required**),  password: String (**required**), profilePicture: String | **Success**: Status(201) Register a user, **Error**: Status(500) Internal server error (Validation) |  Registered as a new user  |
|  /users/login   | POST |   none    | email: String (**required**), password: String (**required**) | **Success**: Status(200) Login as a user, **Error**: Status(500) Internal server error (Validation) |      Login as a user       |
|  /users/google  | POST |   none    | email: String (**required**), password: String (**required**) | **Success**: Status(200) Login as a user via Google, **Error**: Status(500) Internal server error (Validation) | Login as a user via Google |



## List of Article Routes

|     Routes      |  HTTP  | Header(s) |                             Body                             |                           Response                           |                Description                 |
| :-------------: | :----: | :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------: |
|    /articles    |  GET   |   token   |                             none                             | **Success**: Status(200) Get all posted articles, **Error**: Status(500) Internal server error (Validation) |       Get all user's posted articles       |
|    /articles    |  POST  |   token   | title: String (**required**), content: String (**required**), photo: File (**optional**), userId: ObjectId (**required**), tags: [ObjectId](generated%20from%20GoogleVision) | **Success**: Status(201) Create an article, **Error**: Status(500) Internal server error (Validation) |            Create a new article            |
| /articles /:id  |  GET   |   token   |                             none                             | **Success**: Status(200) Get details posted articles, **Error**: Status(500) Internal server error | Show details of spesific  posted articles  |
| /articles/user  |  GET   |   token   |                             none                             | **Success**: Status (200) show details of article, **Error**: Status(500) Internal server error | Show posted articles by authenticated user |
|  /articles/:Id  |  PUT   |   token   | title: String (**optional**), content: String (**optional**), photo: File (**optional**), tags: ObjectId(**optional**) | **Success**: Status(200) Update an article, **Error**: Status(500) Internal server error (Validation) |              Updated  article              |
|  /articles/:Id  | DELETE |   token   |                             none                             | **Success**: Status(200) Delete an article, **Error**: Status(500) Internal server error (Validation) |             Delete an article              |
| /articles/likes |  GET   |   token   |                             none                             | **Success**: Status(200) Get favorites article, **Error**: Status(500) Internal server error (Validation) |          Show favorites articles           |



## List of Tags Routes

|  Routes   |  HTTP  | Header(s) |              Body               |                           Response                           |     Description     |
| :-------: | :----: | :-------: | :-----------------------------: | :----------------------------------------------------------: | :-----------------: |
|   /tags   |  POST  |   token   | tagName : String (**required**) | **Success**: Status(200) Generate a tags from Google vision, **Error**: Status(500) Internal server error (Validation) | Show Generated tags |
|   /tags   |  GET   |   token   |              none               | **Success**: Status(200) Get all tags, **Error**: Status(500) Internal server error (Validation) |    Show all tags    |
| /tags/add |  POST  |   token   | tagName: String (**required**)  | **Success**: Status(200) Add a new tag, **Error**: Status(500) Internal server error (Validation) |     Add new tag     |
| /tags/id  | DELETE |   token   |              none               | **Success**: Status(200) delete tag, **Error**: Status(500) Internal server error (Validation) |     Delete tag      |



## Usage

```javascript
$ npm install
$ node app.js or $ npm run dev
```

Access server via `http://localhost:3000`<br>
Access client via `http://localhost:8080`