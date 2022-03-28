# Restaurant Reservation System

This is a full-stack development project I created during my time with Thinkful. It is a restaurant-facing application designed to store, display, and retrieve information on reservations and where they are seated once they arrive.

An example of the deployed app can be found [here](https://sobran-reservation-frontend.herokuapp.com/dashboard). Please give the server a few moments to spin up.

This application was built using the following tech stack:
### Front End
* HTML5
* CSS3
* Bootstrap
* JavaScript
* React
### Back End
* Node.js
* Express.js
* Knex.js
* PostgreSQL


## Screenshots
### Dashboard
![dashboard](/screenshots/Dashboard.png)
### Search Reservations
![search](/screenshots/Search.png)
### Create Reservation
![create](/screenshots/Create.png)
### Seat Reservation
![seat](/screenshots/Seat.png)

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance. If deploying the back-end and front-end on two different sites, you will need to specify the front-end's URL as ORIGIN_HOST.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
1. Run `npx knex migrate:latest` and `npx knex seed:run` if you wish to populate your tables with some mock data.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.