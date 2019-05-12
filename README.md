# mini-wp

### Route Home
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/` | GET | `none` | `200` OK | Showing `home` in a JSON format

### User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/register` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`/login` | POST | **Body**<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request | Sign a user in
`/auth/google` | POST | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`400` Bad Request | Sign a user in using Google account
`/users` | GET | `none` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all users
`/users/:id` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one user
`/users/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one user
`/users/:id` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a user

### Article Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/articles` | POST | **Headers**<br>token: `String`<br>**Body**<br>name: `String`<br>description: `String`<br>dueDate: `Date` | **Success**<br>`201` Created<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Create an article
`/articles` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all articles
`/articles/tag` | GET | **Headers**<br>token: `String`<br>**Query**<br>tag: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all articles with given tag
`/articles/myArticle` | GET | **Headers**<br>token: `String`<br> | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all user's articles
`/articles/:articleId` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one article
`/articles/:articleId` | PUT | **Headers**<br>token: `String`<br>**Body**<br>name: `String`<br>description: `String`<br>dueDate: `Date`<br>status: `Boolean` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one article
`/articles/:articleId` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete an article


### Error Handling (Undefined Routes):

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/*` | any | any | **Fail**<br>`404` Not Found | Catch any unmatched routes and redirect them here