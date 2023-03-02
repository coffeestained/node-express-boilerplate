import logger from '#common/logger.js'; // Application Logger
import { mongooseOperatorsEnum } from '#common/enum.js';

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
    console.log(query['sort'])
    // Generate Query Response
    const builtQuery = {
        query: {},
        sort: {...query['sort']},
        pagination: {
            limit: process.env.API_LIMIT,
            skip: 0,
        }
    };

    // Logging
    logger.info(`${routeFunctionName} queryBuilder Received`);
    logger.debug(`${routeFunctionName} queryBuilder Received`, query);

    // Ierate Query Keys
    Object.keys(query).map((path) => {
        // Does Schema Contain Valid The Query Key
        if (Object.prototype.hasOwnProperty.call(schema.schema.obj, path) && schema.schema.obj[path].queryable) {
            // Transform Query Value
            const transformedValue = transformQueryValue(
                mongooseOperatorsEnum[schema.schema.obj[path].type.name],
                query[path],
                schema.schema.obj[path],
            );

            // Apply Only If A Value
            if (transformedValue && JSON.stringify(transformedValue) !== '{}') {
                builtQuery.query[path] = transformedValue;
            }
        }
    });


    return builtQuery;
}

/**
 * This recursive function validates that query key values are allowed to be queried for
 * to the spec at #common/enum.js
 * @param {array} allowedOps array of operators in #common/enum.js
 * @param {object} queryValue value of any such query key's value in iteration
 * @param {string} declaredQueryKeyType url's req.query object
 * @return {query} return the deeply merged objects
**/
function transformQueryValue(allowedOps, queryValue, declaredQueryKeyType) {
    if (Array.isArray(queryValue)) {
        // Iterate queryValue Recursively
        queryValue = queryValue.map((value) => transformQueryValue(allowedOps, value, declaredQueryKeyType))
    } else if (queryValue !== null && typeof queryValue == 'object') {
        // Allowed Mongoose Operator in JSON for this Schema Property Type
        Object.keys(queryValue).forEach((key) => {
            // Determine if allowed Mongoose Operator in JSON for this Schema Property Type
            const allowedOperations = [ ...allowedOps, ...mongooseOperatorsEnum.any ]
            let validKey = allowedOperations.some((v) => v === key);

            // Keep & Transform Valid Key
            if (validKey) {
                queryValue[key] = transformQueryValue(allowedOps, queryValue[key], declaredQueryKeyType)
            } else {
                // Remove invalid key
                delete queryValue[key];
            }
        });
    } else {
        switch (declaredQueryKeyType.type.name) {
            case 'String':
                break; // Do Nothing
            case 'Decimal128':
                queryValue = parseFloat(queryValue);
                break;
            case 'Number':
                queryValue = Number(queryValue);
                break;
            case 'Date':
                queryValue = new Date(queryValue);
                break;
            case 'Boolean':
                queryValue = (queryValue === 'true');
                break;
            case 'Buffer':
                break; // Do Nothing
            case 'Mixed':
                break; // Do Nothing
            case 'Map':
                break; // Do Nothing
            case 'ObjectId':
                break; // Do Nothing
            case 'Schema':
                break; // Do Nothing
        }
    }
    return queryValue;
}
