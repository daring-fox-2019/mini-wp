# Mini WP

Web application that allows users to write articles. One of my Hacktiv8 phase 2 projects.

Features: 
- Sign in authenticated with [JSON Web Token](https://jwt.io/).
- Users can change their profile picture, change their password, and delete their account.
- Passwords hashed with [bcryptjs](https://www.npmjs.com/package/bcryptjs).
- Front-end uses [Vue](https://vuejs.org/).
- Write articles in rich text, using [CKEditor 5](https://ckeditor.com/ckeditor-5/).
- Add a featured image to your article.
- Featured images stored in Google Cloud Storage.
- Filter articles by title.
- Article and user data stored in a [MongoDB database](https://www.mongodb.com/).