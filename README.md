# mini-wp# Welcome to Mini-WP!
Write your own blog using this app!

# List of Routes
Route | HTTP | Header(s) | Body | Description | Success Response | Failed Response
--- | --- | --- | --- | --- | --- | --- 
 / | GET | JSON web token generated while logging in (jwtoken) | none | show all your blogs | status code 200 and list of all your blogs | status code 500 and error message
 / | POST | JSON web token generated while logging in (jwtoken) | title, content, createdAt, img, author, user | create new blog | status code 201 and blog created | status code 500 and error message
 / | PATCH | JSON web token generated while logging in (jwtoken) | id, field, value | update specific property od a document | status code 201 and update report | status code 500 and error message
 / | PUT | JSON web token generated while logging in (jwtoken) | title, content, createdAt, img, author, user,id | update whole properties of a document | status code 201 and update report | status code 500 and error message
 / | DELETE | JSON web token generated while logging in (jwtoken) | id | delete a document | status code 200 and delete report | status code 500 and error message
 /user/:id | GET | none | none | show one specific document of User | status code 200 and one data of User | status code 500 and error message
 /user | GET | none | none | show all documents of User | status code 200 and list of all documents of User | status code 500 and error message
 /user/register | POST | none | email, password, pp | register new User | status code 201 and document of created User | status code 500 and error message
 /user/login | POST | none | email, password | log in into application | status code 200 and JSON web token | status code 500 and error message
 /user/update | PUT | none | id, email, password, pp | update property of a document User | status code 200 and update report | status code 500 and error message
 /user/delete | DELETE | none | id | delete one document of User | status code 200 and delete report | status code 500 and error message
 
 # Usage
Make sure you have node.js installed on your computer and then run these commands :
 $ npm install @google-cloud/storage bcryptjs cors dotenv express google-auth-library jsonwebtoken mongoose --save
 

access the API via http://localhost:3000/<*--choose from list 