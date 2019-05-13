# mini-wp
## routes

**POST baseurl /auth/login**
to get a token, to authorize some further access of API

**POST baseurl /auth/register**
to register a credential, to access the api later

**POST baseurl /auth/google-login**
to generate api token, using google oAuth2 token

**GET baseurl /article-home**
to get articles shown at home page

**GET baseurl /article/:id**
to get an article

**POST baseurl /article**
to create an article, require api token

**PATCH baseurl /article/:id**
to update an article, require api token

**DELETE baseurl /article/:id**
to delete an article, require api token



### Authentication

- [Registration](#registration)
- [Getting Access Token](#getting-access-token)
- [Getting Access Token using Google oAuth2 id_token ](#getting-access-token-using-google)

#### Registration

<hr>

**Method**: `POST`

**URL**: `/auth/register`

**Request Body**:

```javascript
{
    name: String,
    email: String,
    password: String
}
```

**Response Success**

**Status**: `201`

**Body**:

```javascript
{
    _id: String //mongoose schema id,
    name: String,
    email: String
}
```

**Response Failure**

**Status**: `500`

**Body**:

```javascript
{
  message: "Internal Server Error";
}
```

#### Getting Access Token

**Method**: `POST`

*URL*: `/auth/login`

*Request Body*:

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
        name: String,
        email: String   
    },
    token: String
}
```

**Response Failure**

**Status**: `500`

**Body**:

```javascript
{
  message: "Internal Server Error";
}
```

#### Getting Access Token using google oAuth2 Token

#### Create Article

**method** POST
**url** /article
**header**

```javascript
{
  token: mini - wp - api_token;
}
```

**response success** 
**status** 201
**body** 

```javascript
{ author: String, title:String, content:String, created_at:Date, featured_image: String, tags:[String] }
```

**response fails**
**status** 500
**body** 

```javascript
{ msg:'internal server error' }
```

#### Delete Article

**method** POST
**url** /article/:id
**header**

```javascript
{
  token: mini - wp - api_token;
}
```

**response success** 
**status** 204
**body** 

```javascript
{ author: String, title:String, content:String, created_at:Date, featured_image: String, tags:[String] }
```

**response fails**
**status** 500
**body** 

```javascript
{ msg:'internal server error' }
```

#### Update Article
**method** POST
**url** /article
**header**

```javascript
{
  token: mini - wp - api_token;
}
```

**response success** 
**status** 201
**body** 

```javascript
{ author: String, title:String, content:String, created_at:Date, featured_image: String, tags:[String] }
```

**response fails**
**status** 500
**body** 

```javascript
{ msg:'internal server error' }
```

#### Get an Article
**method** POST
**url** /article
**header**

```javascript
{
  token: mini - wp - api_token;
}
```

**response success** 
**status** 201
**body** 

```javascript
{ author: String, title:String, content:String, created_at:Date, featured_image: String, tags:[String] }
```

**response fails**
**status** 500
**body** 

```javascript
{ msg:'internal server error' }
```

#### Get All Articles
**method** POST
**url** /article
**header**

```javascript
{
  token: mini - wp - api_token;
}
```

**response success** 
**status** 201
**body** 

```javascript
{ author: String, title:String, content:String, created_at:Date, featured_image: String, tags:[String] }
```

**response fails**
**status** 500
**body** 

```javascript
{ msg:'internal server error' }
```
