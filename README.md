# mini-wp

## REST API Documentation

### Resources

- Auth
    - [Register](#register): `POST /auth/register`
    - [Login](#login): `POST /auth/login`
- Article
    - [Fetch Articles](#fetch-articles): `GET /articles`
    - [Fetch Article by Id](#fetch-article-by-id): `GET /article/:article_id`
    - [Create Article](#create-article): `POST /article`
    - [Update Article](#update-article): `PUT /articles/:article_id`
    - [Delete Arctile](#delete-article): `DELETE /articles/:article_id`



#### Register

<hr>

**Method**: `POST`

**URL**: `/auth/register`

**Request Body**:
```javascript
{
    email: String,
    password: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: String,
        email: String,
        password: String
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



#### Login

<hr>

**Method**: `POST`

**URL**: `/auth/login`

**Request Body**:
```javascript
{
    email: String,
    password: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    user: {
        _id: String,
        email: String,
        password: String
    },
    jwtToken: String
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Bad Credentials"
}
```



#### Fetch Articles

<hr>

**Method**: `GET`

**URL**: `/articles`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    articles: [
        {
            _id: String,
            title: String,
            coverImg: String,
            body: String,
            createdAt: Date,
            tags: [
                {
                    name: String
                },
                ...
            ],
            authorId: String
        },
        ...
    ]
}
```

**Resposne Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```



#### Fetch Article by Id

<hr>

**Method**: `GET`

**URL**: `/articles/:article_id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    article: {
        _id: String,
        title: String,
        coverImg: String,
        body: String,
        createdAt: Date,
        tags: [
            {
                name: String
            },
            ...
        ],
        authorId: String
    }
}
```

**Resposne Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Article Not Found"
}
```



#### Create Article

<hr>

**Method**: `POST`

**URL**: `/articles`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**:

**Status**: `201`

**Body**:
```javascript
{
    article: {
        _id: String,
        title: String,
        coverImg: String,
        body: String,
        tags: [],
        authorId: String
    }
}
```

**Response Failure**:

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```



#### Update Article

<hr>

**Method**: `PUT`

**URL**: `/articles/:article_id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    title: String,
    coverImg: String,
    body: String,
    tags: [
        {
            name: String
        },
        ...
    ]
}
```

**Response Success**:

**Status**: `200`

**Body**:
```javascript
{
    article: {
        _id: String,
        title: String,
        coverImg: String,
        body: String,
        tags: [
            {
                name: String
            },
            ...
        ],
        authorId: String
    }
}
```

**Reponse Failure**:

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `401`

**Body**:
```javascript
{
    message: "UnAuthorized Access"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Article Not Found"
}
```



#### Delete Article

<hr>

**Method**: `DELETE`

**URL**: `/articles/:article_id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**:

**Status**: `200`

**Body**:
```javascript
{
    article: {
        _id: String
    }
}
```

**Reponse Failure**:

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Missing Token"
}
```

**Status**: `400`

**Body**:
```javascript
{
    message: "Invalid Token"
}
```

**Status**: `401`

**Body**:
```javascript
{
    message: "UnAuthorized Access"
}
```

**Status**: `404`

**Body**:
```javascript
{
    message: "Article Not Found"
}
```
