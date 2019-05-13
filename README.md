# mini-wp

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
