'use strict';

import { ConflictException } from '@nestjs/common';

export class RecordConflictException extends ConflictException {
    constructor(message?: string | any, error?: string) {
        if (message) {
            super(message, error);
        } else {
            super('error.record_conflict');
        }
    }
}
