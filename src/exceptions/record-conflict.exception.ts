'use strict';

import { ConflictException } from '@nestjs/common';

export class RecordConflictException extends ConflictException {
    constructor(mess: string, error?: string) {
        super(mess, error);
    }
}
