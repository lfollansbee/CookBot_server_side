# CookBot - Server Side

Deployed Site: https://cookbot.xyz/

Deployed API Server: https://cookbook-app.herokuapp.com/

## Description
CookBot is the ultimate recipe resource and cooking guide. It is a fully decoupled app that can access thousands of recipes from the Spoonacular Recipe API and allows users to save their favorite recipes. Features include multiple search options, such as Advanced Search and "What's in my fridge", where users can search for recipes based on what they have on hand. Additionally, CookBot includes "Cooking Mode", where it will read aloud recipe instructions using the IBM Watson text-to-speech API and recognize audio commands allowing users to easily navigate recipes hands-free while cooking.

### Connected Resources
[Link to Client-Side Repository:](https://github.com/lfollansbee/CookBot_client_side)

[Link to Database Repo](https://github.com/lfollansbee/CookBot_database)

### Installation
* Set up a postgres database (see [Database Repo](https://github.com/lfollansbee/CookBot_database))
* Create a `.env` file. Refer to env.example file to include your database url.
* `npm install -g knex`
* `npm install`
* `npm start`

### Technologies Used:
* AngularJS
* Sass
* Node.js
* Knex.js
* PostgreSQL
* IBM Watson Text-to-Speech API
* Spoonacular Recipe API
* [angular-adaptive-speech](https://github.com/janantala/angular-adaptive-speech) module
