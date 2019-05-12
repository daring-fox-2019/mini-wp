# Mini - WP

### Register :
```sh
URL: http://127.0.0.1:3000/register
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {	
        firstName: "firstNameExample"
        lastName: "lastNameExample",
        email: "example@mail.com",
        password: "examplePassword"
    }
Response Status : 201
Data Output :
    {
        "_id": "5ccf109c227c7e1387ab12f1",
        "firstName" : "firstNameExample",
        "lastName": "lastNameExample",
        "email": "example@mail.com",
        "password": "$2a$10$BwEf3Bwsa8PJfliNr7UVOOoHPU0z8ucUdyt9JyJzM4KU3hdTwxHTW",
        "__v": 0
    }

Response Status : 400 Bad Request
Output :
    "User validation failed: name: Name is required, email: Email is required, password: Password is required,email : Email already used "
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Login :

```sh
URL: http://127.0.0.1:3000/login
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "example@mail.com",
        password: "examplePassword"
    }
Response Status : 200
Data Output :
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDY2MjM1YjM5NWYxNDNmNzU5YzY3YiIsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsImlhdCI6MTU1NzYxOTUwNywiZXhwIjoxNTU3NzA1OTA3fQ.ybuqEKrYVIzCJBGP6QjzD1Lcrd-lS08q5BOwNtnNFCo",
        "email" : "example@mail.com",
        "name" : "fisrtNameExample lastNameExample",
    }
    
Response Status : 400 Bad Request
Output :
    {
        "err": "username / password invalid"
    }

Response Status : 500
Output :
    "Internal Server Error"


Output :
    "Internal Server Error"

```
### Login Google :

```sh
URL: http://127.0.0.1:3000/google/login
METHOD : POST
Authenticated Required : NO
Authorized Required : NO
Data Input :
    {
        email: "example@mail.com"
    }
Response Status : 200
Data Output :
    {
        "access_token": 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDY2MjM1YjM5NWYxNDNmNzU5YzY3YiIsImVtYWlsIjoibmFydXRvQGdtYWlsLmNvbSIsImlhdCI6MTU1NzYxOTUwNywiZXhwIjoxNTU3NzA1OTA3fQ.ybuqEKrYVIzCJBGP6QjzD1Lcrd-						 lS08q5BOwNtnNFCo"
    }
    
Response Status : 500 Bad Request
Output :
    {
        "err": "internal server error "
    }

```

### list Articles:

```sh
http://localhost:3000/articles
METHOD : GET
Authenticated Required : YES
Authorized Required : YES
Response Status : 200
[
    {
        "_id": "5cd6d56b2fc1c94b08fde8c9",
        "title": tittleExample",
        "description": "exampleDescription",
        "updated_at": "2019-05-11T14:00:11.801Z",
        "created_at": "2019-05-11T14:00:11.801Z",
        "author": {
            "_id": "5cd66235b395f143f759c67b"},
        "image": "url_example",
        "__v": 0
    },
    {...},{...},{...}
]

Response Status : 500
Output :
    "Internal Server Error"
```

### Create Article :

```sh
http://localhost:3000/articles
METHOD : POST
Authenticated Required : YES
Authorized Required : NO

Data Input :
    {
        title: "titleExample",
        description: "descriptionExample",
        image: <image>,
        auhtor: <UserId>
    }
    
Response Status : 200
Data Output :
    {
        "_id": "5cd767ebaaa5a74b2da055fc",
        "title": "Naruto Shipuden",
        "content": "ini content ceritanya",
        "author": { "_id": "5cd66235b395f143f759c67b" },
        "image": "url_example",
        "__v": 0
    }
    
Response Status : 400 Bad Request
Output :
    "Article validation failed: title: Title required, description: description required"
    
Response Status : 400 Bad Request
Output :
    "You must loggin to access this endpoint"

Response Status : 500
Output :
    "Internal Server Error"
```

### Delete Article :

```sh
http://localhost:3000/articles/5cd6d56b2fc1c94b08fde8c9
METHOD : DELETE
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
    {
        "_id": "5cd6d56b2fc1c94b08fde8c9",
        "title": "titleExample",
        "description": "descriptionExample",
        "updated_at": "2019-05-11T14:00:11.801Z",
        "created_at": "2019-05-11T14:00:11.801Z",
        "author": "5cd66235b395f143f759c67b",
        "image": "url_example",
        "__v": 0
    }

Response Status : 404
Output :
    {
        "msg": "user is not valid"
    }

Response Status : 401
Output :
    {
        "msg": "Unauthorized"
    }
    
Response Status : 400 Bad Request
Output :
    "You must loggin to access this endpoint"
    
Response Status : 500
Output :
    "Internal Server Error"
```

### Update Article :

```sh
http://localhost:3000/articles/5cd6d56b2fc1c94b08fde8c9
METHOD : PUT
Authenticated Required : YES
Authorized Required : YES

Response Status : 200
    "updated succesfully"
Response Status : 401
Output :
    {
        "msg": "Unauthorized"
    }
    
Response Status : 400 Bad Request
Output :
    "You must loggin to access this endpoint"
    
Response Status : 500
Output :
    "Internal Server Error"
```

```
Mini WP License
----
**Free Software, Yeah!**