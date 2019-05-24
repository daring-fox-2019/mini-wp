# Mini Wordpress

## Link Deploy
Server: `http://mini-wp-server.emrido.site/`

Client: `http://mini-wp.emrido.site/`

## Basic Routes

### Register New User

- Method
    - **POST**
- Route
    - `/register`
- Body
    ```JS
    {
        name: String,
        email: String,
        password: String
    }
    ```
- Response
    - `code: 201`
    ```JS
    {
        _id: "<ObjectId>",
        name: "<name>",
        email: "<email>",
        password: "<hashed password>",
        _v: 0
    }
    ```

### Login

- Method
    - **POST**
- Route
    - `/login`
- Body
    ```JS
    {
        email: String,
        password: String
    }
    ```
- Response
    - `code: 200`
    ```JS
    {
        accesstoken: "<generated access token>"
    }
    ```

### Google Login

- Method
    - **POST**
- Route
    - `/google-login`
- Body
    ```JS
    {
        token: "<google id_token>"
    }
    ```
- Response
    - `code: 200`
    ```JS
    {
        accesstoken: "<generated access token>"
    }
    ```
---

## Article Route

### Get All Article

- Method
    - **POST**
- Route
    - `/articles`
- Response
    - `code: 201`
    ```JS
    [    
        {
            "tags": [
                "freshwater",
                "fish",
                "pet",
                "aquarium"
            ],
            "_id": "5cd8b10f077284239c2cb132",
            "title": "Angelfish",
            "subtitle": "Small Genius of Freshwater",
            "content": "...",
            "featured_image": "https://storage.googleapis.com/porto-mini-wp/upload/1557704975022asset 3.png",
            "owner": {
                "_id": "5cd8af10077284239c2cb12f",
                "name": "Rido",
                "email": "rido@email.com",
                "password": "$2a$10$GTTAcPX5T0m5LmhBozd.X.ghdp3cXtEWpF2g.RXYV5pAWhxJiMWdq",
                "__v": 0
            },
            "created_at": "2019-05-12T23:49:35.451Z",
            "updated_at": "2019-05-12T23:49:35.451Z",
            "__v": 0
        },
        {
            "tags": [
                "crab",
                "sea"
            ],
            "_id": "5cd8b028077284239c2cb131",
            "title": "Crab",
            "subtitle": "Real Life 'Mr. Eugene H. Krabs'",
            "content": "...",
            "featured_image": "https://storage.googleapis.com/porto-mini-wp/upload/1557704744108asset 6.png",
            "owner": {
                "_id": "5cd8af10077284239c2cb12f",
                "name": "Rido",
                "email": "rido@email.com",
                "password": "$2a$10$GTTAcPX5T0m5LmhBozd.X.ghdp3cXtEWpF2g.RXYV5pAWhxJiMWdq",
                "__v": 0
            },
            "created_at": "2019-05-12T23:45:44.512Z",
            "updated_at": "2019-05-12T23:45:44.512Z",
            "__v": 0
        },
    ]
    ```
### Get One Article

- Method
    - **GET**
- Route
    - `/articles/:id`
- Response
    - `code: 200`
    ```JS
    
    {
        "tags": [
            "freshwater",
            "fish",
            "pet",
            "aquarium"
        ],
        "_id": "5cd8b10f077284239c2cb132",
        "title": "Angelfish",
        "subtitle": "Small Genius of Freshwater",
        "content": "...",
        "featured_image": "https://storage.googleapis.com/porto-mini-wp/upload/1557704975022asset 3.png",
        "owner": {
            "_id": "5cd8af10077284239c2cb12f",
            "name": "Rido",
            "email": "rido@email.com",
            "password": "$2a$10$GTTAcPX5T0m5LmhBozd.X.ghdp3cXtEWpF2g.RXYV5pAWhxJiMWdq",
            "__v": 0
        },
        "created_at": "2019-05-12T23:49:35.451Z",
        "updated_at": "2019-05-12T23:49:35.451Z",
        "__v": 0
    },
    ```


### Create New Article

- Method
    - **POST**
- Route
    - `/articles`
- Body
    - FormData
        - tags: text
        - titel: text
        - subtilte: text
        - content: text
        - image: file
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 201`
    ```JS
    {
        "tags": [
            "freshwater",
            "fish",
            "pet",
            "aquarium"
        ],
        "_id": "5cd8b10f077284239c2cb132",
        "title": "Angelfish",
        "subtitle": "Small Genius of Freshwater",
        "content": "...",
        "featured_image": "https://storage.googleapis.com/porto-mini-wp/upload/1557704975022asset 3.png",
        "owner": {
            "_id": "5cd8af10077284239c2cb12f",
            "name": "Rido",
            "email": "rido@email.com",
            "password": "$2a$10$GTTAcPX5T0m5LmhBozd.X.ghdp3cXtEWpF2g.RXYV5pAWhxJiMWdq",
            "__v": 0
        },
        "created_at": "2019-05-12T23:49:35.451Z",
        "updated_at": "2019-05-12T23:49:35.451Z",
        "__v": 0
    },
    ```

### Update Article

- Method
    - **PATCH**
- Route
    - `/articles/:id`
- Body
    - FormData
        - tags: text
        - titel: text
        - subtilte: text
        - content: text
        - image: file
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6694493493378678785",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "operationTime": "6694493493378678785",
        "$clusterTime": {
            "clusterTime": "6694493493378678785",
            "signature": {
                "hash": "JY+p9KIupDSIx1wB6+cxaCE1Nd4=",
                "keyId": "6676677921790230530"
            }
        }
    }
    ```
### Delete Article

- Method
    - **DELETE**
- Route
    - `/articles/:id`
- Headers
    `{ accesstoken: "<generated access token>"}`
- Response
    - `code: 200`
    ```JS
    {
        "n": 1,
        "opTime": {
            "ts": "6694493841271029761",
            "t": 3
        },
        "electionId": "7fffffff0000000000000003",
        "ok": 1,
        "operationTime": "6694493841271029761",
        "$clusterTime": {
            "clusterTime": "6694493841271029761",
            "signature": {
                "hash": "0UAKs4Z/lrKo93ADDR53AIdIWg0=",
                "keyId": "6676677921790230530"
            }
        },
        "deletedCount": 1
    }
    ```
    
---

## Usage

Server: 
```
$ npm install
$ npm run dev
```
Client:
```
$ live-server --host=localhost
```

## Access point:
Server: http://localhost:3000

Client: http://localhost:8080
