This is the project One for Udacity's React Fundamentals course. It was built on the starter template developed by [React Training](https://reacttraining.com). The template provided a static example of the CSS and HTML markup that may be used, but without any of the React code. My job was to add interactivity to the app by refactoring the static code in this template.

## Overview
<img src="https://d17h27t6h515a5.cloudfront.net/topher/2017/July/595d48a9_correct-use-of-state/correct-use-of-state.gif"></img>

## Installation
1. Clone or Download this repository, then extract it
2. Open the terminal and CD into the extracted folder
```
cd /PATH_TO_THE_EXTRACTED_FOLDER
```
3. To install the app, Type:
```
npm install
```
4. To run the app, Type:
```
npm start
```

## What You're Getting
```
+--node_modules/ - modules/libraries installed by the nmp
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- icons/ - Images for the app.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - This is the root of the app.
 |-- App(origional).js - This is the static version came with the template. 
 rename it back to App.js and run the development server to see the static version of App.
 |-- App.css - Styles for the app. Provided with the template.
 |-- DropDownMenu.js - React component
 |-- Book.js - React component
 |-- BooksAPI.js - A JavaScript API for the provided Udacity backend. Provided with the template.
 Instructions for the methods are below.
 |-- BookShelf.js - React component
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.Provided with the template.
 |-- index.css - Global styles. Provided with the template.
 |-- MyReads.js - React component
 |-- SearchForBooks.js - React component
|-- .gitignore 
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms 
for you to use with the app. Provided with the template.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this. Provided with the template.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify the development process, Udacity provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods required to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). 

## Link to the starter template

https://github.com/udacity/reactnd-project-myreads-starter
