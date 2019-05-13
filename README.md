# mini-wp

## List of user routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization | Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | ---
```/api/login``` | POST | none | none | username:String, fullName:String, password:String | no | no | Sign in and get an access token based on credentials | Success: Return token, username, fullName and status 200. Error: Return error message and status 500.
```/api/register``` | POST | none | none | username:String, fullName:String, password:String | no | no | Sign up with new user info | Success: Return token, username, fullName and status 200. Error: Return error message and status 500.
```/api/google-login``` | POST | none | none | none | no | no | Sign in or sign up with google account | Success: Return token, username, fullName and status 200. Error: Return error message and status 500.

## List of article routes:

Route | HTTP | Params | Headers | Body | Authentication | Authorization |Description | Response
--- | --- | --- | --- | --- | --- | --- | --- | --- 
```/api/articles``` | GET | none | token:String | none | yes | no | Get user articles  | Success: Return user articles and status 200. Error: Return error message and status 500.
```/api/articles/all``` | GET | none | token:String | none | yes | no | Get all articles  | Success: Return all articles and status 200. Error: Return error message and status 500.
```/api/articles/:id``` | GET | _id:ObjectID | token:String | none | yes | no | Get a single article info | Success: Return article and status 200. Error: Return error message and status 500.
```/api/articles``` | POST | none | token:String | title:String, content:String, featuredImage:String, userId:ObjectId, tags:[String], createdAt:Date, updatedAt:Date | yes | no | Create an article | Success: Return created article and status 201. Error: Return error message and status 500.
```/api/articles/:id``` | DELETE | _id:ObjectID| token:String | none | yes | yes | Delete a article (Admin only) | Success: Return deleted article and status 200. Error: Return error message and status 500.
```/api/articles/:id``` | PATCH | _id:ObjectID | token:String | none | yes | yes | Update a article with new info | Success: Return updated article and status 200. Error: Return error message and status 500.

# Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ cd server
$ npm init
$ npm install
```

Read ```.env.example``` and then you can create your own ```.env``` file.

After you have finished, on your server run the following command:

```
$ npm run dev
```

On your client, run the following command:

```
$ live-server --host=localhost
```

First step is to register or login.
For register, you need to fill out username, password. For login, insert username and password or you can sign in using your Google account.