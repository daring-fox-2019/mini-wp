# REST API of Mini-Wordpress - Alvin
## Endpoint
### Basic (doesn't require token)
| Routes      | Method | HTML Body       | Description                                          |
|-------------|--------|-----------------|------------------------------------------------------|
| /users/register | POST   | name, email, password | Sign Up with new user info                           |
| /users/signingoogle | POST   | id_token from google | Sign Up with Google and add new user info                           |
| /users/login | POST   | email, password | Sign in and get an access token based on credentials |

### TODOS (require token)
| Routes         | Method | HTML Body          | Description                                        |
|----------------|--------|--------------------|----------------------------------------------------|
| /posts/read     | GET    | -                  | Get all the user's posts (Authenticated user only) |
| /posts/read/search     | GET    | Query: (title='text')                  | Get all the user's posts that matches the query string (Authenticated user only) |
| /posts/     | POST   | title, content | Create a post (Authenticated user only)            |
| /posts/read/:id | GET    | -                  | Get a single post (Owners only)                    |
| /posts/update/:id | PUT    | title, content | Update a post with a new info (Owners only)        |
| /posts/delete/:id | DELETE | -                  | Delete a single post (Owners only)                 |
