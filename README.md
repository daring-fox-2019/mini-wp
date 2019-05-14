# mini-wp

## User Routes
### POST
1. POST /user/googleSignIn
* Route

        POST http://localhost:3000/user/googleSignIn

* Description

        Let user sign in using google sign-in

* Response (Status: 200)

        Returns token of logged in user
        {
            token:...
        }
        (If user is new, will create a new user in database)

* Reject (Status: 500)

        Internal server error

2. POST /user/signIn
* Route

        POST http://localhost:3000/user/signIn

* Description

        Let user sign in

* Response (Status: 200)

        Returns token of logged in user
        {
            token:...
        }

* Reject (Status: 400)

        Wrong email / password

* Reject (Status: 500)

        Internal server error

3. POST /user/register
* Route

        POST http://localhost:3000/user/register

* Description

        Create a new user in database

* Response (Status: 200)

        Object of created user
        {
            _id: ...,
            name: ...,
            email: ...,
            password: ...,
        }

* Reject (Status: 500)

        Internal server error

## Article Routes
### GET
1. GET /article
* Route  

        GET http://localhost:3000/article
* Description

        Get all articles

* Response (Status 200)

        Array of object of all articles
        [
            { 
                _id: ...,
                name: ...,
                description: ...,
                status: ...,
                dueDate: ...,
                user: ...
            },
            .....
        ]

* Reject (Status: 500)

        Internal server error

2. GET /article/findMine
* Route  

        GET http://localhost:3000/article/findMine
* Description

        Get all articles of currently logged in user

* Response (Status 200)

        Array of object of user's articles
        [
            { 
                _id: ...,
                name: ...,
                description: ...,
                status: ...,
                dueDate: ...,
                user: ...
            },
            .....
        ]

* Reject (Status: 500)

        Internal server error

3. GET /article/:id
* Route  

        GET http://localhost:3000/article/:id
* Description

        Get article according to id parameter

* Response (Status 200)

        Object of article
            { 
                _id: ...,
                name: ...,
                description: ...,
                status: ...,
                dueDate: ...,
                user: ...
            }

* Reject (Status: 500)

        Internal server error

### POST
1. POST /article
* Route
        
        POST http://localhost:3000/article

* Description

        Create a new article for the currently logged in user

* Response (Status: 201)

        Object of created article
        { 
            _id: ...,
            title:...,
            content:...,
            image:...,
            user:...,
            createdAt:...,
            tags:...
        }

* Reject (Status: 500)

        Internal server error

### PATCH
1. PATCH /article/:id
* Route

        PATCH http://localhost:3000/article/:id

* Description

        Edit or update an article

* Response (Status: 200)

        Object of updated article
        { 
            _id: ...,
            title:...,
            content:...,
            image:...,
            user:...,
            createdAt:...,
            tags:...
        }

* Reject (Status: 500)

        Internal server error

### DELETE
1. DELETE /article/:id
* Route

        DELETE http://localhost:3000/article/:id

* Description

        Delete an article

* Response (Status: 200)

        Object of deleted article
        { 
            _id: ...,
            title:...,
            content:...,
            image:...,
            user:...,
            createdAt:...,
            tags:...
        }

* Reject (Status: 500)

        Internal server error