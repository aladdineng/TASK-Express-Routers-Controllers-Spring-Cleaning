#### Routes

To clean up our routes, we will move them all out of `app.js` into a folder that handles all of our routes. In this folder, we will create multiple **mini express applications**. For now, we'll create one mini-app to handle all products-related functionality in our backend.

1. Let's start with creating a folder called `apis`. Inside it create a folder called `products`.

2. Inside `products`, create a `routes.js` file where we will out our routes.

3. To create our mini-app we will use a method from `express` called `Router()`, which is a _complete router system_ that will handle all routing related to products for our express app. So, in `products.js` we will require `express` and define our mini-app `router`.

   ```javascript
   const express = require("express");
   const router = express.Router();
   ```

4. Go back to `app.js` and cut `(CTRL/CMD + X)` ALL the routes and paste them in `products/routes.js`. Change all `app`'s to `router`'s. So, this `router` will be handling all the routes for now.

   ```javascript
   // Product Create
   router.post("/api/products", (req, res) => {...});

   // Product List
   router.get("/api/products", (req, res) => {...});

   // Product Delete
   router.delete("/api/products/:productId", (req, res) => {...});
   ```

5. Require the `products` dataset inside `products/routes.js`.

   ```javascript
   let products = require("../../products");
   ```

   _You won't need the `products` dataset in `app.js` anymore, remove the require there._

6. Next, export your `router` at the bottom of the file.

   ```javascript
   module.exports = router;
   ```

7. Require your routes instance in `app.js`.

   ```javascript
   const productRoutes = require("./apis/products/routes");
   ```

8. Finally, under the middleware section of our `app.js`, we will call our `productRoutes` using the `app.use()` method.

   ```javascript
   app.use(productRoutes);
   ```

   _Make sure to place this line below all other `app.use()` methods._

9. So what's happening now is that when a **request** is received, express will look inside `productRoutes` to look for the route with the path similar to the **request**'s.

10. Test your routes. Tada!! All is working.

11. Can this be even more cleaned up? Yes! Since all the routes in `productRoutes` start with the path `/api/products` we can modify our router call.

    ```javascript
    app.use("/api/products", productRoutes);
    ```

12. Test one of the products routes, it's not found! Why? The path for retrieving the list of products is now: `/api/products/products`. Why? `app.use` is adding `/api/products` to the beginning of all the routes! So in `products/routes.js`, remove `/products` from all the paths. Now, this router will **only** be called if the request starts with `/api/products`. Your `routes/products.js`'s routes should now look like this:

    ```javascript
    // Product Create
    router.post("/", (req, res) => {...});

    // Product List
    router.get("/", (req, res) => {...});

    // Product Delete
    router.delete("/:productId", (req, res) => {...});
    ```

Our code looks much cleaner now, but our routes still look messy! Let's clean it up by adding controllers. **Controllers are basically the functions that are called by the routes.**

#### Controllers

1. Create a file in your `products` folder called `controllers.js`. This file will have all the functions related to products that our routes will use.

2. Import our `products`:

   ```javascript
   let products = require("../../products");
   ```

   _You won't need the `products` dataset in `routes.js` anymore, remove the import there._

3. Let's start with the product create route. Copy the callback function from your create route and assign it to a function called `productCreate` as shown below. And to make things easier, export it directly.

   ```javascript
   exports.productCreate = (req, res) => {
     products.push(req.body);
     return res.status(201).json(req.body);
   };
   ```

4. Now to use this controller in `products/routes.js`, require the method from the controllers file and pass it to the route.

   ```javascript
   const { productCreate } = require("./controllers");

   // Product Create
   router.post("/", productCreate);
   ```

5. Can you see how cute this looks? IKR! Let's create the other controller methods.

6. Product list:

   - Controller:

   ```javascript
   exports.productList = (req, res) => res.json(products);
   ```

   - Router

   ```javascript
   const { productCreate, productList } = require("./controllers");
   // Product List
   router.get("/", productList);
   ```

7. Product delete:

   - Controller:

   ```javascript
   exports.productDelete = (req, res) => {
     const { productId } = req.params;
     const foundProduct = products.find((product) => product.id === +productId);
     if (foundProduct) {
       products = products.filter((product) => product.id !== +productId);
       return res.status(204).end();
     } else {
       return res.status(404).json({ message: "Product not found" });
     }
   };
   ```

   - Router

   ```javascript
   const {
     productCreate,
     productList,
     productUpdate,
     productDelete,
   } = require("./controllers");

   // Product Delete
   router.delete("/:productId", productDelete);
   ```
