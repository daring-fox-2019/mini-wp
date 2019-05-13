# mini-wp

API Documentation


| Path          | Method        | Request | Success Respond | Error Respond  |
| ------------- |:-------------:| :------:| :-------------: | :------------: |
| /             | GET | none  | 200 | none
| /user         |   GET   |  none  | 200, {data: all user}| 500, {message}
| /user          | POST     |   body : {name, , email, password}  | 201, {data: created user}| 500, {message}
| /article      | GET | headers: {token}, query : {title,author,content}(optional) | 200 {data: user's article list} | 500, {message} 
| /article     |POST | headers : {token}, body: {title, content, image} | 201 {data: created article list} | 500, {message} 400, {bad request}
| /article/upload    |POST | headers : {token}, formData | 201 {data: uploaded image url} | 500, {message} 400, {bad request}
| /article    |PATCH | headers : {token}, body: {title, image,content, id}| 200 {data: updated article} | 500, {message} 400, {bad request}
|/article    | DELETE | headers: {token}, body : {_id} | 200 {data : deleted data} | 500, {message}
|/article/published   | GET | headers: {token}| 200 {data : all published article} | 500, {message}
|/login | POST | data : {googleToken, email, password} | 200 | 500, {message}