# mini-wp
## API DOCUMENTATION
## Summary

API to access database of mini-wp application

## Routes

### /signIn and signOut

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/signin`     | POST    | user signIn       |          |    email:String, password:String                              |
| `/signup` | POST    | create new user |      |name:String, email:String, password:String    |                              
 



### /articles

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/article`     | GET    | Get all article info from signed in user       |token          |                                  |
| `/article/:id` | GET    | Get a single article based on the article id  | token    |                                  |
| `/article`     | POST   | Create a new article               | token    | title:String, content:String, file:multipart/formdata  |
| `/article/:id` | DELETE | Delete a article               | token    |                                  |
| `/article/:id` | PATCH  | Update a article with new info | token    |  status:Boolean, due_date:Date, reminder:Date|   
 
