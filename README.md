# jobmock-vis
Experimental visualization for mock job data from Girder Worker

## Build Instructions

1. Clone this repository: `git clone git@github.com:ronichoudhury-work/jobmock-vis`.

2. Install the NPM dependencies: `npm i`.

3. Build the application: `npm run build`.

4. Serve the application: `npm run serve`.

5. Run the application: http://localhost:8081

## To add a new visualization

1. In the `src/vis` directory, add a new component in its own file (`Foobar.js`)
   or directory (`Foobar/index.js`). Use `export default` to export the
   component from the file.

2. Extend `src/vis/index.js` to export the new component.

3. Rebuild the project and verify that the new component appears in the vis
   menu.

## To add a new dataset

1. In the `src/data` directory, add a new data file.

2. Extend `src/data/index.js` to export the new data file. If the file is a
   format other than JSON, you may need to add a new loader type to
   `webpack.config.js`. Make sure that when the file is loaded, it comes into
   JavaScript as an "array of objects".

3. Rebuild the project and verify that the new dataset appears in the data menu.
