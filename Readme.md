
# App.js
-> This is the entry point of the application
-> Which contains all routes and server listening on port
-> inbuilt middlwares and dbConnections

# config folder 
-> This contains the files which need configurations from other services

# utils
-> This package contains the functions which are used frequently like validations

# routes
-> authRoutes -- register login logout
-> connectionRoutes -- sending & Review Connections of other users
-> profileRoutes -- getuserProfile, updateUserProfile, passwordUpdate
-> userRoutes -- getAllConnections, feed , receivedRequests

# middlwares
-> contains custom middlewares and jwt verification

# models
-> contains dbDesgin & Schema Validations

# Controllers
-> contains the business logic

