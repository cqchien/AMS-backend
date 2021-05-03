'use strict';

import { NotAcceptableException } from '@nestjs/common';

export class DateTimeNotAcceptableException extends NotAcceptableException {
    constructor(message?: string | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('error.date_time.not_accept');
        }
    }
}
