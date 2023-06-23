<h2>
  Express User and Blog Management System
</h2>

<h4>
  This is a basic Express.js application that provides functionality for managing users and blogs. It utilizes various modules and follows the MVC (Model-View-Controller) architecture.
</h4>

<h2>Usage</h2>
1. Start the application: npm run server

2. Access the application in a web browser at http://localhost:9090.

<h2>User Routes</h2>
GET /user: Retrieves all users.

POST /register: Creates a new user.

POST /login : Login a user

<h2>Blog Routes</h2>

GET /blog: Retrieves all blog posts.

POST /addblog: Creates a new blog post.

GET /update/:id: update a specific blog post by ID.

DELETE /delete/:id: Delete a specific blog post by ID.

<h2>Middleware</h2>
1. authenticate: Authentication middleware that ensures secure access to protected routes.

2. authorize: authorize a user or admin if they have access to the route or not.

<h1>User Router</h1>

* Importing Required Modules and Packages:

1. express: This module allows us to create and configure the Express application.
  
2. dotenv: This package loads environment variables from a .env file.

3. userModel: This is the user model defined in the ../models/user.model file.
4. jwt: This package is used for JSON Web Token (JWT) generation and verification.
5. bcrypt: This package is used for password hashing and comparison.

   
<h2>Creating the User Router:</h2>

* userRouter is an instance of express.Router() that defines the routes for user management.
   
# User Route:

* GET /: This route returns a "User Route" message.
  
# User Registration:

* POST /register: This route handles user registration.
It checks if the user with the provided email already exists in the database.

If the user is not present, the password is hashed using bcrypt and a new user document is created using the userModel.

The new user is saved in the database, and a success message is sent in the response.

# User Login:

POST /login: This route handles user login.

It checks if the provided email and password match an existing user in the database.

If the credentials are valid, a JWT is generated with the user's email, user ID, and role.

A refresh token is also generated without an expiration time.

The tokens are sent in the response along with a success message.

# Token Refresh:

GET /getnewtoken: This route handles token refresh.

It expects a refresh token to be provided in the Authorization header.

The refresh token is verified using jwt.verify().

If the verification is successful, a new access token is generated with an extended expiration time.

The new token is sent in the response along with a success message.

# Exporting the User Router:

The userRouter is exported so that it can be used in other files.


<h1>Blog Router</h1>


# Importing Required Modules and Packages:

1. express: This module allows us to create and configure the Express application. 

2. blogModel: This is the blog model defined in the ../models/blog.model file.

3.jwt: This package is used for JSON Web Token (JWT) generation and verification.

4. dotenv: This package loads environment variables from a .env file.
authorize: This is a custom middleware function defined in the ../middleware/authorize file.

# Creating the Blog Router:

* blogRouter is an instance of express.Router() that defines the routes for blog management.
Get All Blogs:

1. GET /: This route retrieves all blogs associated with the user ID extracted from the JWT token.

2. The authorize middleware is used to ensure that only authenticated users with the "User" role can access this route.

3. The user ID is extracted from the JWT token in the Authorization header and verified using jwt.verify().

4.If the token is valid, the blogs associated with the user ID are fetched from the database using the blogModel.

5. The blogs are sent in the response.

# Add a New Blog:

1. POST /addblog: This route handles the addition of a new blog.

2. The authorize middleware is used to ensure that only authenticated users with the "User" or "Admin" role can access this route.

3. The title, body, and author of the blog are extracted from the request body.

4. The user ID is extracted from the JWT token in the Authorization header and verified using jwt.verify().

5. A new blog document is created using the blogModel and saved in the database.

6. A success message is sent in the response.

# Update a Blog:

1. PATCH /Update/:id: This route handles the updating of a specific blog by ID.
2. The authorize middleware is used to ensure that only authenticated users with the "User" or "Admin" role can access this route.

3. The blog data to be updated is extracted from the request body.

4. The user ID is extracted from the userId property of the request object, which is set by the authorize middleware.
5. The blog is updated in the database using the blogModel and a success message is sent in the response.

# Delete a Blog:

1. DELETE /deleteblog/:id: This route handles the deletion of a specific blog by ID.

2. The authorize middleware is used to ensure that only authenticated users with the "Admin" role can access this route.

3. The blog ID is extracted from the request parameters.

4. The blog is deleted from the database using the blogModel and a success message is sent in the response.

# Exporting the Blog Router:

The blogRouter is exported so that it can be used in other files.
