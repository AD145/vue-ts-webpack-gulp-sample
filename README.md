# Vue-TypeScript-Webpack-Gulp Code Example
This is a very simple, single entry point webpack implementation that features a Vuetify card as primary focus of the page. This solution was created to demonstrate a familiarity with Vue in the context of TypeScript, the Vuetify UI library, Webpack configuration, cross-browser css prefixing in both .vue & .scss files, implementating linting and, chaining Gulp tasks to build different file types in some instances like .ts, but also using Webpack to compile .vue & .scss files.

**Note: I'm still working out the serve task for this stack.*

## Building this Solution
Ensure you are running node 10.x and npm 6+, then do the following:

1. npm i gulp -g 
2. npm i --no-optional 
3. gulp build (clean, eslint, sass, tsc, copy-static-assets, & webpack)

After running build you should see the the lib, dist, and temp directories populate. The lib directory will contain the .js and their accompanying declaration files generated for any .ts files in src, declaration files for any .scss files, and a copied version of .scss and .vue files. Webpack compiles the .vue and .scss files and includes them in the resulting bundle in the dist dir. A Webpack bundle report is included in the temp dir with a breakdown of any modules that are included in that bundle. Note: Neither Vuetify or Vue will be shown in the resulting bundle. Those modules are included externally for multi-entrypoint performance purposes.
