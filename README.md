# Mini Wordpress

## Basic Routes
| Route | HTTP | Request | Response |
|--|--|--|--|
| `/register` | POST | name: String (**required**)<br>email: String (**required**)<br>password: String (**required**) | *Success:*<br>201: User Created<br>*Error:*<br>500: Internal server error |
| `/google-login` | POST | `google token` | *Success:*<br>200: Login Succeed!<br>*Error:*<br>500: Internal server error |
| `/login` | POST | email: String (**required**)<br>password: String (**required**) | *Success:*<br>200: Login Succeed!<br>*Error:*<br>500: Internal server error |

## Article Routes
| Route | HTTP | Headers| Request | Response |
|--|--|--|--|--|
| `/articles/` | GET | `none` |  | *Success:*<br>200: `[{ <object article> }, ... {}]`<br>*Error:*<br>500: Internal server error |
| `/articles/:id` | GET | `none` |  | *Success:*<br>200: `{ <object article> }`<br>*Error:*<br>500: Internal server error |
| `/articles/` | POST | `accesstoken` | title: String (**required**)<br>content: String (**required**)<br>featured_image: String | *Success:*<br>201: Article created<br>*Error:*<br>500: Internal server error |
| `/articles/:id` | PATCH | `accesstoken` | title: String <br>content: String <br>featured_image: String | *Success:*<br>200: Article updated!<br>*Error:*<br>500: Internal server error |
| `/articles/:id` | DELETE | `accesstoken` |  | *Success:*<br>200: Article Deleted!<br>*Error:*<br>500: Internal server error |

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
