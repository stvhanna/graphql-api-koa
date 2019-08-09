import { Source, execute as executeGraphQL, parse, validate } from 'graphql'
import { checkOptions } from './checkOptions'
import { checkSchema } from './checkSchema'
import { createHttpError } from './createHttpError'
import { isEnumerableObject } from './isEnumerableObject'

/**
 * List of allowed [`ExecuteOptions`]{@link ExecuteOptions} keys for validation
 * purposes.
 * @kind constant
 * @name ALLOWED_EXECUTE_OPTIONS
 * @type {Array<string>}
 * @ignore
 */
const ALLOWED_EXECUTE_OPTIONS = [
  'schema',
  'rootValue',
  'contextValue',
  'fieldResolver',
  'override'
]

/**
 * Creates Koa middleware to execute GraphQL. Use after the
 * [`errorHandler`]{@link errorHandler} and
 * [body parser](https://npm.im/koa-bodyparser) middleware.
 * @kind function
 * @name execute
 * @param {ExecuteOptions} options Options.
 * @returns {Function} Koa middleware.
 * @example <caption>A basic GraphQL API.</caption>
 * ```js
 * import Koa from 'koa'
 * import bodyParser from 'koa-bodyparser'
 * import { errorHandler, execute } from 'graphql-api-koa'
 * import schema from './schema'
 *
 * const app = new Koa()
 *   .use(errorHandler())
 *   .use(bodyParser())
 *   .use(execute({ schema }))
 * ```
 */
export const execute = options => {
  if (typeof options === 'undefined')
    throw createHttpError('GraphQL execute middleware options missing.')

  checkOptions(options, ALLOWED_EXECUTE_OPTIONS, 'GraphQL execute middleware')

  if (typeof options.schema !== 'undefined') checkSchema(options.schema)

  const { override, ...staticOptions } = options

  if (typeof override !== 'undefined' && typeof override !== 'function')
    throw createHttpError(
      'GraphQL execute middleware `override` option must be a function.'
    )

  return async (ctx, next) => {
    if (typeof ctx.request.body === 'undefined')
      throw createHttpError('Request body missing.')

    if (!isEnumerableObject(ctx.request.body))
      throw createHttpError(400, 'Request body must be a JSON object.')

    if (!('query' in ctx.request.body))
      throw createHttpError(400, 'GraphQL operation field `query` missing.')

    let document

    try {
      document = parse(new Source(ctx.request.body.query))
    } catch (error) {
      throw createHttpError(400, `GraphQL query syntax error: ${error.message}`)
    }

    let overrideOptions

    if (override) {
      overrideOptions = await override(ctx)

      checkOptions(
        overrideOptions,
        ALLOWED_EXECUTE_OPTIONS.filter(option => option !== 'override'),
        'GraphQL execute middleware `override` option resolved'
      )

      if (typeof overrideOptions.schema !== 'undefined')
        checkSchema(overrideOptions.schema)
    }

    const requestOptions = { ...staticOptions, ...overrideOptions }

    if (typeof requestOptions.schema === 'undefined')
      throw createHttpError('GraphQL schema is required.')

    const queryValidationErrors = validate(requestOptions.schema, document)
    if (queryValidationErrors.length)
      throw createHttpError(400, 'GraphQL query validation errors.', {
        graphqlErrors: queryValidationErrors
      })

    let result

    try {
      result = await executeGraphQL({
        schema: requestOptions.schema,
        rootValue: requestOptions.rootValue,
        contextValue: requestOptions.contextValue,
        fieldResolver: requestOptions.fieldResolver,
        document,
        variableValues: ctx.request.body.variables,
        operationName: ctx.request.body.operationName
      })
    } catch (error) {
      throw createHttpError(
        400,
        `GraphQL operation field invalid: ${error.message}`
      )
    }

    if (result.data) ctx.response.body = { data: result.data }

    if (result.errors)
      throw createHttpError(200, 'GraphQL errors.', {
        graphqlErrors: result.errors
      })

    ctx.response.status = 200

    await next()
  }
}
