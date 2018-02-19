This is my task for McMacler company (V2) .


## Used Technologies

* ES6.
* gulp.js, to build my own workflow.
* SASS for style, to make CSS more maintainable, themeable, and extendable.

## Development server

to run the development server you must install:
* [nodejs](https://nodejs.org/)

After that make sure you are in the project folder, then run `npm i` to insatll all packages.
Finally run `gulp` to strat compiling and developing the project.
Compiled files will be in `assets` folder next of `src` folder.

## Production

For production, just upload `index.html` and `assets` folder.

---------------

## CORS problem

you may face a CORS problem, so there is a copy of the api json on file `db.json` next of `pakage.json`, to use it as api provider follow that:
1. run `npm i json-server -g` to install json server for our db.json api
1. run `json-server --watch db.json` to start json server, will provide a URL for the api.
1. replace the `url` variable placed in `src/js/app.js` with new api url `http://localhost:3000/db`
