# Boilerplate For Projects With Gulp, React, Redux, Pug, Webpack, BrowserSync, and HMR

Quickly set up projects where you need React, Redux, and Webpack, and want to benefit
from Gulp automation, BrowserSync reloading, and Pug templates.

Tasks are managed in `gulp/tasks`.

Gulp builds assets to `dist/` which BrowserSync serves.

## Getting Started

```shell
$ npm install
```

## Getting Down To Business

```shell
$ gulp
```

## Tests

Tests can be run for specific files when only those files are changed.

Format for tests is as follows:

```
./App.js
./App_test.js
```

Changes in App.js or App_test.js will run App_test.js. Changes in files that do
not have tests will run entire suite.

Running tests continuously:

```shell
$ gulp watch:tests
```

### License

MIT: http://fixate.mit-license.org/
