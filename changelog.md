# graphql-api-koa changelog

## 4.1.1

### Patch

- Updated dev dependencies.
- Use [`isobject`](https://npm.im/isobject) for checking if values are enumerable, non-array objects.
- Destructure GraphQL execute results.

## 4.1.0

### Minor

- Added a new overridable `execute` middleware option `execute`, to optionally replace [GraphQL.js `execute`](https://graphql.org/graphql-js/execution/#execute). This [adds support](https://twitter.com/jaydenseric/status/1214343687284518912) for [`graphql-jit`](https://npm.im/graphql-jit).

### Patch

- Updated dev dependencies.
- Added a new [`hard-rejection`](https://npm.im/hard-rejection) dev dependency to ensure unhandled rejections in tests exit the process with an error.
- Reorganized the test files.
- Simplified `test/index.js`.
- Tweaked some test names.
- Reduced the `execute` middleware per request validation work.
- Better handling of invalid GraphQL operation `variables` and GraphQL execution errors.

## 4.0.0

### Major

- ESM is no longer published, due to CJS/ESM compatibility issues across recent Node.js versions.
- The file structure and non-index file exports have changed. This should only affect projects using undocumented deep imports.

### Patch

- Stop testing the `statusCode` property of HTTP errors; they are inconsequential as Koa uses the `status` property.

## 3.0.0

### Major

- Updated Node.js support from v8.5+ to v10+.
- Updated dev dependencies, some of which require newer Node.js versions that v8.5.

### Minor

- Added a package `module` field.
- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a `package.json` `funding` field to enable npm CLI funding features.

### Patch

- Removed the now redundant [`eslint-plugin-import-order-alphabetical`](https://npm.im/eslint-plugin-import-order-alphabetical) dev dependency.
- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Replaced the [`tap`](https://npm.im/tap) dev dependency with [`test-director`](https://npm.im/test-director) and [`coverage-node`](https://npm.im/coverage-node), and refactored tests accordingly.
- Added a new [`babel-plugin-transform-require-extensions`](https://npm.im/babel-plugin-transform-require-extensions) dev dependency and ensured ESM import specifiers in both source and published `.mjs` files contain file names with extensions, which [are mandatory in the final Node.js ESM implementation](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions). Published CJS `.js` files now also have file extensions in `require` paths.
- Updated the package description and keywords.
- Updated code examples to use CJS instead of ESM.
- Removed `package-lock.json` from `.gitignore` and `.prettierignore` as it’s disabled in `.npmrc` anyway.
- Use strict mode for scripts.
- Use GitHub Actions instead of Travis for CI.
- Use [jsDelivr](https://jsdelivr.com) for the readme logo instead of [RawGit](https://rawgit.com) as they are shutting down.

## 2.2.0

### Minor

- Added a new `execute` middleware `validationRules` option.

### Patch

- Updated dev dependencies.
- Ensure only desired `execute` middleware options apply to the GraphQL `execute` function.
- Move tests to files adjacent to source files.
- Renamed the `isPlainObject` helper to `isEnumerableObject` and added tests.
- Moved `isEnumerableObject` checks into the `checkOptions` helper and added tests.
- Renamed the `checkSchema` helper to `checkGraphQLSchema` and added tests.
- Tweaked option related error messages.
- Significantly simplified test assertions using `t.throws` and `t.match`.
- Moved JSDoc type defs into `src/index.js`.
- Renamed the `MiddlewareOptionsOverride` JSDoc type to `ExecuteOptionsOverride`.
- Tweaked JSDoc descriptions.
- Consistent JSDoc syntax style for array types.
- Prettier `errorHandler` JSDoc example source code formatting.
- Moved an `execute` middleware constant from function to module scope.
- Added “Minor” and “Patch” subheadings to old changelog entries.

## 2.1.0

### Minor

- `execute` middleware now throws an appropriate error when the `schema` option is undefined, without an override.

### Patch

- Updated dependencies.
- Cleaner readme “API” section table of contents with “See” and “Examples” headings excluded, thanks to [`jsdoc-md` v3.1.0](https://github.com/jaydenseric/jsdoc-md/releases/tag/v3.1.0).
- Removed the `watch` script and [`watch`](https://npm.im/watch) dev dependency.
- Redid the test scripts and added a `.nycrc.json` file for improved reporting and code coverage.
- Simplified the `prepublishOnly` script.
- Reduced the size of the published `package.json` by moving dev tool config to files.
- Removed the package `module` field. By default webpack resolves extensionless paths the same way Node.js (prior to v12) in `--experimental-modules` mode does; `.mjs` files are preferred. Tools misconfigured or unable to resolve `.mjs` can get confused when `module` points to an `.mjs` ESM file and they attempt to resolve named imports from `.js` CJS files.
- Enforced 100% code coverage for tests.
- Test `errorHandler` middleware handles an error correctly after `ctx.response.body` was set.
- Added the Open Graph image design to the logo Sketch file.

## 2.0.0

### Major

- Errors thrown in resolvers without an `expose: true` property have their message masked by `Internal Server Error` in the response body to prevent client exposure. Koa app listeners and middleware still have access to the original errors.

## 1.1.2

### Patch

- Fix event listeners added in v1.1.1 to be compatible with Node.js < v10.
- Downgrade `node-fetch` to fix `--experimental-modules` tests for Node.js < v10.2.0 (see [bitinn/node-fetch#502](https://github.com/bitinn/node-fetch/issues/502)).

## 1.1.1

### Patch

- Updated dependencies.
- Updated package scripts and config for the new [`husky`](https://npm.im/husky) version.
- Silence the `http-errors deprecated non-error status code; use only 4xx or 5xx status codes` warnings that appear (due to [jshttp/http-errors#50](https://github.com/jshttp/http-errors/issues/50)) when there are GraphQL errors.
- Expanded the source into separate files for easier code navigation.
- Add a project logo.

## 1.1.0

### Minor

- Support [`graphql`](https://npm.im/graphql) v14.

### Patch

- Updated dependencies.
- Stopped using [`npm-run-all`](https://npm.im/npm-run-all) for package scripts.
- Configured Prettier to lint `.yml` files.
- Ensure the readme Travis build status badge only tracks `master` branch.
- Use [Badgen](https://badgen.net) for the readme npm version badge.

## 1.0.0

### Patch

- Updated dependencies.
- Lint fixes following dependency updates.
- Use [`jsdoc-md`](https://npm.im/jsdoc-md) instead of [`documentation`](https://npm.im/documentation) to generate readme API docs.
- Removed a temporary workaround for [a fixed Babel CLI bug](https://github.com/babel/babel/issues/8077).
- Updated package description and tags.

## 0.3.1

### Patch

- Updated dependencies.
- Simplified ESLint config with [`eslint-config-env`](https://npm.im/eslint-config-env).

## 0.3.0

### Minor

- Refactored package scripts to use `prepare` to support installation via Git (e.g. `npm install jaydenseric/graphql-api-koa`).

### Patch

- Corrected an `errorHandler` middleware example in the readme.
- Compact package `repository` field.

## 0.2.0

### Minor

- Set Node.js support as v8.5+.

### Patch

- Avoided using a Koa context response shortcut.
- Fixed test snapshot consistency between Node.js versions (see [tapjs/node-tap#450](https://github.com/tapjs/node-tap/issues/450)).
- Manually test error properties instead of using snapshots.
- Added `errorHandler` middleware tests.
- Readme badge changes to deal with [shields.io](https://shields.io) unreliability:
  - Used the more reliable build status badge provided by Travis and placed it first as it loads the quickest.
  - Removed the licence badge. The licence can be found in `package.json` and rarely changes.
  - Removed the Github issues and stars badges. The readme is most viewed on Github anyway.
- Improved documentation.

## 0.1.0

- Initial release.
