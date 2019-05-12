# mini-wp
##  User Register
```
    URL : /users/register
    Method : POST
    Headers: None
    Authenticate = None
    Body : name=[string], password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "_id": "5ccb24a09d738f4fd1011de0",
                "name": "komangmahendra",
                "email": "mail@mail.com",
                "password": "$2a$10$.HDPulTBd1.M0vTnU7oyDe4j8b3o68uj2FWAFJc.jhEgF4478rxna",
                "__v": 0
            }
    Error Response :
        Code: 500 
        Content: { message : <error message> }
```
##  User Login
```
    URL : /users/login
    Method : POST
    Headers: None
    Authenticate = None
    Body : password=[string], email=[string]
    Params : None
    Success Response :
        Code 201
            {
                "token": <token> ,
                "id" : <id>,
                "name": <name>
            }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  Google sign in
```
    URL : /oauth/google-sign-in
    Method : POST
    Headers: None
    Authenticate = None
    Body : id_token=[string]
    Params : None
    Success Response :
        Code 201
              {
                "token": <token> ,
                "id" : <id>,
                "name": <name>
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  get all articles
```
    URL : /articles
    Method : GET
    Headers: None
    Authenticate = None
    Body : None
    Params : search=[string],tag=[string],page=[number],published=[boolean]
    Success Response :
        Code 200
            [
                {
                    "tags": [
                        {
                            "text": "hehehe",
                            "tiClasses": [
                                "ti-valid"
                            ]
                        }
                    ],
                    "_id": "5cd6524ebb686d367d497c0c",
                    "title": "kkkkkkkkkkkkkkkkkkkkkk",
                    "content": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
                    "published": true,
                    "createdAt": "2019-05-11T04:40:46.151Z",
                    "updatedAt": "2019-05-11T07:34:48.071Z",
                    "__v": 0
                },
                <object>
            ]

    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  create new article
```
    URL : /articles
    Method : POST
    Headers: None
    Authenticate = YES
    Body : title=[string],content=[string],published=[boolean],tags=[array]
    Params : None
    Success Response :
        Code 200
             {
                 "tags": [],
                 "_id": "5cd6524ebb686d367d497c0c",
                 "title": "xxxx",
                 "content": "xxxx",
                 "published": true,
                 "createdAt": "2019-05-11T04:40:46.151Z",
                 "updatedAt": "2019-05-11T07:34:48.071Z",
                 "author" : 
                    {
                        "_id": "5cd804c2a6b6c32116aef30b",
                        "name": "asik",
                        "email": "hohohi@mail.com",
                    }
                 "__v": 0
             }
    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  update article
```
    URL : /articles/:id
    Method : PATCH
    Headers: None
    Authenticate : YES
    Authorization : YES
    Body : title=[string],content=[string],published=[boolean],tags=[array]
    Params : None
    Success Response :
        Code 200
             {
                "tags": [],
                "_id": "5cd80615507fae237b1e12f1",
                "title": "makan asik asssiikkk",
                "content": "enak",
                "author": "5cd804c2a6b6c32116aef30b",
                "published": false,
                "createdAt": "2019-05-12T11:40:05.561Z",
                "updatedAt": "2019-05-12T11:40:44.591Z",
                "__v": 0
            }

    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  delete article
```
    URL : /articles/:id
    Method : DELETE
    Headers: None
    Authenticate : YES
    Authorization : YES
    Body : None
    Params : None
    Success Response :
        Code 200
             {
                "tags": [],
                "_id": "5cd80615507fae237b1e12f1",
                "title": "makan asik asssiikkk",
                "content": "enak",
                "author": "5cd804c2a6b6c32116aef30b",
                "published": false,
                "createdAt": "2019-05-12T11:40:05.561Z",
                "updatedAt": "2019-05-12T11:40:44.591Z",
                "__v": 0
            }

    Error Response :
        Code: 500/400
        Content: { message : <error message> }
```
##  upload image
```
    URL : /upload
    Method : POST
    Headers: None
    Body : file=[file]
    Params : None
    Success Response :
        Code 200
        https://storage.googleapis.com/miniwpyaqueen/upload/1557661543024.jpeg

    Error Response :
        Code: 500
        Content: { message : <error message> }
```
##  translate
```
    URL : /articles/translate
    Method : POST
    Headers: None
    Authenticate : None
    Authorization : None
    Body : text=[string], target=[string]
    Params : None
    Success Response :
        Code 200
             {
                "translations": [
                    {
                        "translatedText": "it's cool to play in the river",
                        "detectedSourceLanguage": "ms"
                    }
                ]
            }
    Error Response :
        Code: 500
        Content: { message : <error message> }
```