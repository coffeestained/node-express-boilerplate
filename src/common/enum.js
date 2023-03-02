export const mongooseOperatorsEnum = {
    'first': [
        {'$and': Array},
        {'$or': Array},
    ],
    'any': [
        {'$in': Array},
        {'$nin': Array},
    ],
    'String': [
        {'$ne': String},
        {'$eq': String},
        {'$regex': String},
    ],
    'Array': [
        {'$all': Array},
    ],
    'Decimal128': [
        {'$gt': Number},
        {'$lt': Number},
        {'$gte': Number},
        {'$lte': Number},
        {'$ne': Number},
        {'$eq': Number},
    ],
    'Number': [
        {'$gt': Number},
        {'$lt': Number},
        {'$gte': Number},
        {'$lte': Number},
        {'$ne': Number},
        {'$eq': Number},
    ],
    'Date': [
        {'$gt': Number},
        {'$lt': Number},
        {'$gte': Number},
        {'$lte': Number},
        {'$ne': Number},
        {'$eq': Number},
    ],
    'Boolean': [
        {'$ne': Boolean},
        {'$eq': Boolean},
    ],
    'Buffer': [
        // TODO if needed
    ],
    'Mixed': [
        {'$ne': String},
        {'$eq': String},
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
