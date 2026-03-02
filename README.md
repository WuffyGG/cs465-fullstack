Travlr Getaways – Full Stack Web Application

Overview

This project is a fully functional MEAN stack web application developed for Travlr Getaways. The system includes both a customer-facing website built with Express and Handlebars and an administrator single-page application (SPA) built with Angular. The backend uses Node.js, Express, MongoDB, and Mongoose, and secure authentication is implemented using JSON Web Tokens (JWT). This project demonstrates full stack architecture design, API integration, database development, and secure application practices.

Architecture

Frontend Comparison: Express vs. Angular SPA

This project includes two types of frontend development: server-rendered Express views using Handlebars (HBS) and a client-side Angular single-page application.

The customer-facing site uses Express with MVC routing. In this model, the browser sends a request to the server, the server processes it, and returns fully rendered HTML. Each navigation event reloads the page. This architecture is straightforward and effective for public-facing content that primarily retrieves and displays information.

In contrast, the administrative interface is built as an Angular SPA. Instead of reloading pages, the SPA dynamically updates the user interface by communicating directly with the RESTful API using HTTP requests. Angular components handle presentation, services manage API calls, and an HTTP interceptor attaches JWT tokens for secure requests. This approach provides a smoother user experience, faster interactions, and richer functionality compared to traditional server-rendered pages.

The Express frontend emphasizes simplicity and server-side rendering, while the Angular SPA emphasizes interactivity, modularity, and client-side logic.

Why MongoDB (NoSQL) Was Used

The backend uses MongoDB, a NoSQL database, because it stores data in flexible JSON-like documents. This structure aligns naturally with JavaScript-based technologies like Node.js and Angular. Since trip and user data are transmitted as JSON between frontend and backend, MongoDB integrates seamlessly with the application.

Using Mongoose, schemas were defined to enforce structure while maintaining flexibility. MongoDB is well-suited for this project because it supports rapid development, integrates smoothly with JavaScript frameworks, allows easy expansion of document structure, and aligns with RESTful API data exchange using JSON.

Functionality

JSON vs. JavaScript

JSON (JavaScript Object Notation) is a lightweight data format used to transmit data between systems. While JSON resembles JavaScript object syntax, it is purely a data representation format and does not contain executable code, functions, or logic.

In this full stack application, JSON acts as the bridge between the frontend and backend. Angular sends trip data as JSON in POST and PUT requests. Express receives and processes JSON request bodies. MongoDB stores documents in JSON-like format. The API returns JSON responses to Angular for rendering. JSON enables consistent communication across the entire stack and ties together the client, server, and database layers.

Refactoring and Reusable UI Components

Throughout development, several refactoring steps improved functionality and efficiency. API logic was moved into Angular services instead of calling HTTP methods directly in components. Reusable components such as TripCard were created to standardize trip display. An Angular HTTP interceptor was implemented to automatically attach JWT tokens to protected API calls instead of manually adding headers in every service method. Authentication logic was centralized in a dedicated AuthenticationService for better state management.

Reusable UI components reduced duplicate code, improved maintainability, supported scalability, and strengthened separation of concerns. These improvements increased overall code quality and long-term efficiency.

Testing

Testing in a full stack application involves validating API endpoints, HTTP methods, and security layers.

This project required testing GET requests to retrieve trips, POST requests to add trips, PUT requests to update trips, and authentication endpoints for login and registration. Protected routes requiring JWT validation were also tested.

API testing was performed using Postman and the Angular frontend. Errors encountered included 400 (Bad Request), 401 (Unauthorized), and CORS-related issues. Debugging required checking request headers, request bodies, route definitions, middleware configuration, and JWT validation.

Security added complexity to testing because tokens expire after a set time, requests must include an Authorization header, middleware blocks unauthorized access, and Angular must properly persist and send the token. Understanding HTTP methods, RESTful endpoints, middleware, and token-based authentication was critical to successfully implementing and testing secure functionality.

Reflection

This course significantly strengthened my understanding of full stack web development. I learned how to design and build a complete MEAN stack application from the ground up, including setting up and configuring a Node.js and Express server, implementing MVC architecture, designing RESTful APIs, creating and managing a MongoDB database with Mongoose, building a rich Angular SPA with components and services, implementing JWT-based authentication and route protection, and debugging full stack integration issues.

The most valuable skill I developed was understanding how frontend, backend, and database layers interact within a single application. I also gained hands-on experience implementing security best practices, including password hashing and token validation.

This project has made me significantly more confident in building scalable, secure web applications. The ability to architect, develop, secure, and test a full stack application makes me a stronger and more marketable candidate for roles in web development and software engineering.
