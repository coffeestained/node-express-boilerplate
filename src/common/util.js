import logger from '#common/logger.js'; // Application Logger
import { mongooseOperatorsEnum } from '#common/enum.js';

/**
 * This function will accept a parameter in milliseconds. It returns a promise
 * resolving setTimeout. Usage: await sleep(1000) would result in a 1 second delay
 * @param {number} ms number in milliseconds to be resolved in the returned promise
 * @return {Promise} the Promise resolving the setTimeout
**/
export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * This function will accept the two objects as arguments and return the object of deeply
 * merged with nested properties.
 * @param {object} targetObject objects containing the properties to be merged with source.
 * @param {object} sourceObject objects containing the properties you want to apply.
 * @return {object} return the deeply merged objects
**/
export function deepMergeObject(targetObject, sourceObject) {
    // Merge Arrays
    if (Array.isArray(sourceObject)) {
      return [...targetObject, ...sourceObject]
    } else {
      // Reduce Remaining Entries
      return Object.entries(sourceObject).reduce((accumulator, [key, value]) => {
        if (
          Object.keys(accumulator).includes(key) &&
          typeof value === 'object'
        ) {
            accumulator[key] = deepMergeObject(accumulator[key], value)
        } else {
            accumulator[key] = value
        }

        return accumulator
      }, { ...targetObject })
    }
  }

/**
 * This function builds a RESTFUL response object.
 * @param {string} url url of the request.
 * @param {object} query url of the request.
 * @param {object} data quried data.
 * @param {object} count total of the amount of items possible.
 * @param {object} limit limit the amount of items in data.
 * @return {RestResponse} return the RESTFUL response object
**/

/**
 * This is the {RestResponse} Model
 * @param {array or json} data url of the request.
 * @param {object} links object containing when necessary {
 *   @param {string} prev
 *   @param {string} next
 *   @param {string} first
 *   @param {string} last
 * }
 * @param {object} meta response metadata {
 *   @param {object} pagination {
 *     @param {string} total
 *     @param {string} limit
 *     @param {string} page
 *   }
 * }
**/
export const asResponse = async (url, query, data, count, limit) => {
   //console.log(url, query, data, count, limit)
   return data;
}

/**
 * This function builds the applications QueryObject.
 * @param {string} routeFunctionName routeFunctionName only for logging defaults to empty string
 * @param {object} schema mongoose model schema
 * @param {object} query url's req.query object
 * @return {QueryObject} return the QueryObject
**/

/**
 * This function builds the applications QueryObject.
 * @param {object} pagination {
 *   @param {string} total
 *   @param {string} limit
 *   @param {string} page
 * }
 * @param {object} sort {
 *   @param {n of dynamic} any from query
 * }
 * @param {object} query {
 *   @param {n of dynamic} any from query
 * }
**/
export const queryBuilder = async (routeFunctionName = '', schema, query) => {
    // Generate Query Response
    const builtQuery = {
        query: {},
        sort: {...query['sort']},
        pagination: {
            limit: process.env.API_LIMIT,
            skip: 0,
        }
    };

    // Clean Up Sort & Pagination Keys
    // Uneeded Past Generate Response Above
    delete query['sort'];
    delete query['pagination'];

    // Logging
    logger.info(`${routeFunctionName} queryBuilder Received`);
    logger.debug(`${routeFunctionName} queryBuilder Received`, query);

    // Ierate Query Keys
    Object.keys(query).map((queryKey) => {
        // Does Schema Contain Valid The Query Key
        if (Object.prototype.hasOwnProperty.call(schema.schema.obj, queryKey) && schema.schema.obj[queryKey].queryable) {
            // Transform Query Value
            const transformedValue = transformQueryValue(
                mongooseOperatorsEnum[schema.schema.obj[queryKey].type.name].map((op) =>Object.keys(op)[0]),
                query[queryKey],
                queryKey,
                schema.schema.obj[queryKey],
                0
            );

            // Apply Only If A Value
            if (transformedValue && JSON.stringify(transformedValue) !== '{}') {
                builtQuery.query[queryKey] = transformedValue;
            }
        }
    });

    // Logging
    logger.info(`${routeFunctionName} queryBuilder Finished`);
    logger.debug(`${routeFunctionName} queryBuilder Finished`, builtQuery);

    return builtQuery;
}

/**
 * This recursive function validates that query key values are allowed to be queried for
 * to the spec at #common/enum.js. Mongoose / MongoDB does not have functionality to verify a query
 * is valid. This will accomplish that by trimming / converting / confirming query fields are valid dynamically.
 * @param {array} allowedOps array of operators in #common/enum.js
 * @param {object} queryValue value of any such query key's value in iteration
 * @param {string} queryKey url's req.query object
 * @param {object} schemaKeyInfo schema key info
 * @param {number} index index of the nested level in the object
 * @return {query} return the deeply merged objects
**/
function transformQueryValue(allowedOps, queryValue, queryKey, schemaKeyInfo, index) {
    // Declare Final Value
    let finalValue = {};

    if (Array.isArray(queryValue)) {
        // Iterate queryValue Recursively
        finalValue = queryValue.map((value) => transformQueryValue(allowedOps, value, queryKey, schemaKeyInfo, index++))
    } else if (queryValue !== null && typeof queryValue == 'object') {
        // Allowed Mongoose Operator in JSON for this Schema Property Type
        Object.keys(queryValue).forEach((key) => {
            // Build Allowed Operations
            const allowedOperations = [
                ...allowedOps,
                ...mongooseOperatorsEnum['any'].map((op) =>Object.keys(op)[0]),
                ...(index === 0 ? mongooseOperatorsEnum['first'].map((op) =>Object.keys(op)[0]) : []),
            ];

            // Valid Operations
            const validKey = allowedOperations.some((v) => v === key);

            // Valid Check
            if (validKey) {
                // Transform Valid Key Value
                finalValue[key] = transformQueryValue(allowedOps, queryValue[key], queryKey, schemaKeyInfo, index++);

                // Validate Values
                const validValues = mongooseOperatorsEnum[schemaKeyInfo.type.name].map((validValue) => Object.values(validValue)[0]);
                validValues.includes(finalValue[key].constructor) ? null : delete finalValue[key];

                // Additional Date Validation
                if (finalValue[key] instanceof Date && isNaN(finalValue[key])) {
                     delete finalValue[key];
                }
            }
        });
    } else {
        switch (schemaKeyInfo.type.name) {
            case 'String':
                // Null Check
                (queryValue === 'null') ? finalValue = null : finalValue = queryValue;
                break;
            case 'Decimal128':
                // Null Check
                (queryValue === 'null') ? finalValue = null : finalValue = parseFloat(queryValue);
                break;
            case 'Number':
                // Null Check
                (queryValue === 'null') ? finalValue = null : finalValue = Number(queryValue);
                break;
            case 'Date':
                // Null Check
                (queryValue === 'null') ? finalValue = null : finalValue = new Date(queryValue);
                break;
            case 'Boolean':
                finalValue = (queryValue === 'true');
                break;
            case 'Buffer':
                break; // TODO
            case 'Mixed':
                break; // TODO
            case 'Map':
                break; // TODO
            case 'ObjectId':
                break; // TODO
            case 'Schema':
                break; // TODO
        }
    }
    return finalValue;
}
