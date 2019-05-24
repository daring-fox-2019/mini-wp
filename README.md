# mini-wp

## Project setup
```
npm install
```
## Compiles

```javascript
-server
npm run dev

-client
live-server --host=localhost
```

## Routes Users

|        Routes       	| HTTP Method 	| Headers 	|                      Body                      	|                     Response                    	|        Description       	|
|:-------------------:	|:-----------:	|:-------:	|:----------------------------------------------:	|:-----------------------------------------------:	|:------------------------:	|
| `/users/signup`       	|     POST    	|   none  	| name: String, <br /> email: String,  <br /> password: String 	| Success: {object}, <br /> Error: Internal server error 	| Sign up a new user       	|
| `/users/signin`       	|     POST    	|   none  	|        email: String,  <br /> password: String        	| Success: {object}, <br /> Error: Internal server error 	| Sign in user             	|
| `/users/signinGoogle `	|     POST    	|   none  	|                  token: String                 	| Success: {object}, <br /> Error: Internal server error 	| Sign in user via googles 	|


## Routes Articles
|     Routes    | HTTP Method |    Headers    |                                                   Body                                                   |                          Response                         |       Description       |
|:-------------:|:-----------:|:-------------:|:--------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------:|:-----------------------:|
| `/articles`     |     POST    | token: String | title: String,<br /> content: String ,<br /> image: File,<br /> status : Boolean, <br />tags : [String]  | Success: { object },<br /> Error: Internal server error   | Create an article       |
| `/articles`     |     GET     | token: String |                                                   none                                                   | Success: [{ object }],<br /> Error: Internal server error | Get all user's articles |
| `/articles/:id` |     GET     | token: String |                                                   none                                                   | Success: { object },<br /> Error: Internal server error   | Get a user's article    |
| `/articles/:id` |    DELETE   | token: String |                                                   none                                                   | Success: { object },<br /> Error: Internal server error   | Delete an article       |
| `/articles/:id` |     PUT     | token: String | title: String,<br /> content: String ,<br /> image: File,<br /> status : Boolean, <br />tags : [String]  | Success: { object },<br /> Error: Internal server error   | Update an article       |




## Link Deploy
```
http://mini-wp.mprasetiodc.com/
```