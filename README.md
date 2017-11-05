# asynchronous-patterns
================

**Set up**: download and install [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node) version 7.10 or newer.

**Problem statement**:
You are running an ecommerce site and before a person checks out, you need to calculate the total cost of a product in their cart.
The total cost is the original cost + tax - discount. You need to get each of these values from the database and in order
to be performant, you need to make all the db calls at the same time and make the calculations as soon as you are able to.
