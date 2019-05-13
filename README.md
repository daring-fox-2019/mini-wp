## Usage
Client Side : http://localhost:8080
Server Side : http://localhost:3000

##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/signUp  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/signIn  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|
|/users/googleSignIn  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user via Google, **Error**: Internal server error (Validation)|Login as a user via Google|
|/articles  |GET  |token|none |**Success**: Get user's posted articles, **Error**: Internal server error (Validation)|Get user's posted articles|
|/articles  |POST  |token|title: String (**required**), content: String (**required**), image: File (**optional**), author: String (**optional**)|**Success**: Create an article, **Error**: Internal server error (Validation)|Create an article|
|/articles/:ArticleId  |PATCH  |token|title: String (**optional**), content: String (**optional**), image: File (**optional**), author: String (**optional**)|**Success**: Update an article, **Error**: Internal server error (Validation)|Update an article|
|/articles/:ArticleId  |DELETE  |token|none|**Success**: Delete an article, **Error**: Internal server error (Validation)|Delete an article|