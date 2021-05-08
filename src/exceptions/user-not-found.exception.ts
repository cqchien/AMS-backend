'use strict';

import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(mess?: string, error?: string) {
        super(mess, error);
    }
}
