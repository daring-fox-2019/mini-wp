# Mini Wordpress
---
---
### Installation
  1. Clone this repository
  2. There are 2 main folder `/server` and `/clientbaru`, open the `/server` folder first to set up the server side
  3. prepare all of the credentials for the API, this app is using google sign in authentication and google cloud storage API for uploading images 
     - **set up the gcloudstorage.json files**
     this time you have to make a credentials of google cloud storage api and download it. You can get yours by reading and following all the steps in the [documentation](https://cloud.google.com/storage/docs/). After you got your credential, rename the file as gcloudstorage.json and save it inside `/server` folder, your key file structure should look like this
        ```javascript
        {
        "type": "service_account",
        "project_id": "your-project-id",
        "private_key_id": "your-private-key-id",
        "private_key": "-----BEGIN PRIVATE KEY-----\ private key -----END PRIVATE KEY-----\n",
        "client_email": "your client email .iam.gserviceaccount.com",
        "client_id": "your client id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your client email"
        }
        ```
      - **set up the .env file**
    create a google authorization credentials(follow the steps in the [documentation](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin))and place it inside .env files. below are the skeleton of the .env files. Put the necessary string only without the [] bracket with no space, **example :** `MY_KEY=thesecretkey` )
        ```
        MINIWP_DB= [url to your mongo db database, you can use mongo db atlas too!]
        CLOUD_BUCKET=[your google cloud storage bucket name]
        GCLOUD_PROJECT=[your google cloud storage project name]
        KEYFILE_PATH=[where you store gcloudstoragekey.json file]
        CLIENT_ID=[the client id of your google project's credential]
        CLIENT_SECRET=[the client secret of your google project's credential] 
        SECRET_JWT=[your secret to create login token]
        PASSWORD=[default password for user that log in using google sign in]
        ```
  4. install the dependencies using 
       `npm install --save`
  5. Set up the database using mongo DB, there are 2 collections that should you make in your database "users" and "articles".
  6. Done, now you have set the server side files,
  7. next, we can run the app on the server side by opening the path to `/server` folder on the terminal, then type and run this
        ```
        $ nodemon app.js
        ```
    8. finally, run the app on the client side by opening the path to `/clientbaru` folder on the terminal, then type and run this
        ```
        $ live-server --host=localhost
        ```
    8. Done, you can try this app using your browser!
    
---
### Server
**1. Package Dependencies**
"@google-cloud/storage": "^2.5.0" [link][gcstorage]
"bcrypt": "^3.0.6" [link][bcrypt]
"body-parser": "^1.19.0" [link][body-parser]
"cors": "^2.8.5" [link][cors]
"dotenv": "^8.0.0" [link][dotenv]
"express": "^4.16.4" [link][express]
"google-auth-library": "^4.0.0" [link][gauthlib]
"jsonwebtoken": "^8.5.1" [link][jwt]
"mongoose": "^5.5.7" [link][mongoose]
"multer": "^1.4.1" [link][multer]
"vue-google-signin-button-directive": "^1.0.2" [link][vuegsignin]

[multer]: <https://www.npmjs.com/package/multer>
[mongoose]: <https://mongoosejs.com/docs/guide.html>
[gauthlib]: <https://www.npmjs.com/package/google-auth-library>
[dotenv]: <https://www.npmjs.com/package/dotenv>
[cors]: <https://www.npmjs.com/package/cors>
[body-parser]: <https://www.npmjs.com/package/body-parser>
[gcstorage]: <https://www.npmjs.com/package/jsonwebtoken>
[bcrypt]: <https://www.npmjs.com/package/bcrypt>
[jwt]: <https://www.npmjs.com/package/jsonwebtoken>
[express]: <http://expressjs.com>
[vuegsignin]: <https://github.com/phanan/vue-google-signin-button>

**2. REST API Server Routes and Description**
1. Log in using google auth
    - route : `/googleLogin`
    - method : post
    - request :
     - headers { token }
    - response : 
      - on success {id, name, email, token}
      - on error {message}
2. Create new account
    - route : `/register`
    - method : post
    - request :
      - body { name, email, password }
    - response : 
      - on success {id, name, email, password}
      - on error {message}
3. Login to existing account
    - route : `/login`
    - method : post
    - request :
      - body : {email, password}
    - response : 
      - on success {id, name, email, token}
      - on error {message}
  4. View all article (you have to login)
     - route : `/articles`
     - method : get
     - request :
       - headers : {token} 
     - response :
       - on success [{userId, title, snippet, content, createdAt, updatedAt, postedAt, status, image}, ...]
       - on error {message}
     - middlewares : authentication
  5. Create new article (you have to login)
     - route : `/articles`
     - method : post
     - request :
       - headers : {token, id}
       - body : {title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image}
     - response :
       - on success {_id, title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image, __v}
       - on error {message}
     - middlewares : authentication
6. Update article (you have to login and owner of the article)
    - route : `/articles/:id`
    - method : put
    - request :
      - headers : {token, id}
      - body : {title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image}
    - response :
      - on success {_id, title, snippet, content, createdAt, updatedAt, postedAt, userId, status, image, __v}
      - on error {message}
    - middlewares : authentication, authorization
7. Delete article (you have to login and owner of the article)
    - route : `/articles/:id` note : req.params.id is the article id
    - method : delete
    - request :
      - headers : {token, id}
    - response :
      - on success {_id}
      - on error {message}
    - middlewares : authentication, authorization
8. Upload image to cloud bucket
    - route : `/articles/:id` note : req.params.id is the article id
    - method : post
    - request :
      - body : formdata
    - response :
      - on success "cloudstoragePublicUrl"
      - on error "Unable to upload"
---
### Client
**Frameworks for CSS, JavaScript, etc**
  - **Vue**
    - https://vuejs.org/v2/guide/
  - **Axios**
      - (https://www.npmjs.com/package/axios)
  - **Semantic UI** (dependent to [JQuery](https://jquery.com/))
    - (https://semantic-ui.com/) 
  - **Google API Client Library**
    - (https://developers.google.com/api-client-library/javascript/)
  - **Sweet Alert**
      - (https://sweetalert.js.org/guides/)