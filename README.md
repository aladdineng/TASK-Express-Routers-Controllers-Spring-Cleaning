Our code is growing day by day, we need to organize it before we're flooded with more routes!

#### Folders Structure

1. Create a folder called `apis`.
2. Inside `apis`, create a folder called `products`.
3. Inside `products`, create two files `routes.js` and `controllers.js`.

#### Routes

Move your routes into their file.

1. In `products/routes.js`, create a `router` using the `express.Router()` method.
2. Move all your routes to `products/routes.js`. Change the app instance `app` to `router` in all your routes.
3. In `app.js`, **require** your routes file and pass it to an `app.use()` method. Make sure to put it **under** the `express.json()` middleware.

#### Controllers

Create a controller for your functions.

1. Move your functions from `products/routes.js` to `products/controllers.js` and create a **controller function** for each of your routes. **Don't forget to export them.**
2. In `products/routes.js`, require the methods in `products/controllers.js` and pass them to their suitable routes.

#### Testing

- Test all your endpoints through Postman to make sure they're still working properly.

#### Postman

1. In Postman, create a new collection.
2. Create a folder called `Products` and save inside it all your requests (product list, create and delete).
# TASK-Express-Routers-Controllers-Spring-Cleaning2
