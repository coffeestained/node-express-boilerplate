import logger from '@common/logger.js'; // Application Logger
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export function santizizeAndValidateInputs(req: Request, res: Response, next: NextFunction) {
    // Result
    let valid = true;

    // TODO
    // Sanitization
    // &&
    // Input Validation (Headers, Body, Params, Query, Cookies, etc)

    // Not Valid - Throw Error
    if (!valid) {
        // Logging Object
        const invalid = {
            'code': 0,
            'message': '',
        }

        // Logging
        logger.info(`Validation failed.`);
        logger.error(`Validation failed. Code:`, invalid.code);
        logger.debug(`Validation failed. Message: ${invalid.message}`);

        // Throw Error
        throw new Error('Validation Failed');
    }

    // Valid - Carry On
    next();
}
