import logger from '#common/logger.js'; // Application Logger
import { mongooseOperatorsEnum } from '#common/enum.js';

export const asResponse = async (url, query, data, count, limit) => {
    /**
     * Returns Response<object>
        * @param1 data: Array<JSON> or JSON (REQUIRED)
        *  Example: [Article, Article]
        * @param2 links: {
            * @linkParam1 prev: 'string' (OPTIONAL)
            *  Example: '/example-data?page=2'
            * @linkParam2 next: 'string' (OPTIONAL)
            *  Example: '/example-data?page=4'
            * @linkParam3 first: 'string' (OPTIONAL)
            *  Example: '/example-data?page=1'
            * @linkParam4 last: 'string' (OPTIONAL)
            *  Example: '/example-data?page=10'
        * } (OPTIONAL)
        * @param3 meta: {
            * @metaParam1 page: {
            *   total: 'number' (OPTIONAL)
            *   limit: 'number' (OPTIONAL)
            * } (OPTIONAL)
        * } (OPTIONAL)
    **/
   console.log(url, query, data, count, limit)
   return data;
}

export const queryBuilder = async (routeFunctionName, schema, query) => {
    // Generate Query Response
    const builtQuery = {
        query: {},
        sort: {},
        pagination: {
            limit: process.env.API_LIMIT,
            skip: 0,
        }
    };

    // Logging
    logger.info(`${routeFunctionName} queryBuilder Received`);
    logger.debug(`${routeFunctionName} queryBuilder Received`, query);

    console.log(query)
    // Ierate Schema Keys
    Object.keys(schema.schema.obj).map((path) => {
        // Does Query Contain Valid Schema Path?
        if (Object.prototype.hasOwnProperty.call(query, path) && schema.schema.obj[path].queryable) {
            if (validQueryValue(mongooseOperatorsEnum[schema.schema.obj[path].type.name], query[path])) {
                console.log(validQueryValue(mongooseOperatorsEnum[schema.schema.obj[path].type.name], query[path]))
            }
        }
    });
    console.log(builtQuery)


    return builtQuery;
}

function validQueryValue(allowedValues, queryValue) {
    console.log(allowedValues, queryValue, Object.keys(queryValue))
    return allowedValues.includes(Object.keys(queryValue)[0]);
}
