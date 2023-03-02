export const mongooseOperatorsEnum = {
    'any': [
        '$or', '$and',
    ],
    'String': [
        '$ne', '$equals', '$regex',
    ],
    'Array': [
        '$in', '$nin', '$all',
    ],
    'Decimal128': [
        '$gt', '$lt', '$gte', '$lte', '$ne', '$equals',
    ],
    'Number': [
        '$gt', '$lt', '$gte', '$lte', '$ne', '$equals',
    ],
    'Date': [
        '$gt', '$lt', '$gte', '$lte', '$ne', '$equals',
    ],
    'Boolean': [
        '$ne', '$equals',
    ],
    'Buffer': [
        // TODO if needed
    ],
    'Mixed': [
        '$ne', '$equals',
    ],
    'Map': [
        // TODO if needed
    ],
    'ObjectId': [
        // TODO if needed
    ],
    'Schema': [
        // TODO if needed
    ],
};
