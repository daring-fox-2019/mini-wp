# mini-wp

User Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/register` | POST | **Body**<br>first name: `String`<br>last name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create a user
`/login` | POST | **Body**<br>email: `String`<br>password: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error | Sign a user in
`/googleLogin` | POST |**Headers**<br>id_token: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Sign in User via Google

Todo Router:

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/articles` | POST | **Body**<br>formData: `String`| **Success**<br>`201` Created<br>**Fail**<br>`500` Internal Server Error | Create an Article
`/articles/:id` | PATCH | **Headers**<br>id: `String`<br>token: `String`<br>**Body**<br>field: `String`<br>value: `String`| `200` OK<br>**Fail**<br>`401` Authorization Error | Edit an Article
`/articles` | GET | `none` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all articles
`/myArticles` | GET |**Headers**<br>token: `String`| `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all articles of specific user ID
`articles/:id` | GET | **Headers**<br>id: `String`<br>token: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one Article
`/articles/:id` | DELETE | **Headers**<br>id: `String`<br>token: `String` | `200` OK<br>**Fail**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete an Article


