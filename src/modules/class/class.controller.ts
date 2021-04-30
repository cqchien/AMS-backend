import { ClassService } from './class.service';
import { Controller } from '@nestjs/common';

@Controller('class')
export class ClassController {
    constructor(
        private classService: ClassService
    ){}
    
}
