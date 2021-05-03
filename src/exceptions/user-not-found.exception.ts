'use strict';

import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(error?: string) {
        super('error.not_found', error);
    }
}
