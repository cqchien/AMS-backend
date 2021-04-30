import { ClassRepository } from './class.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ClassRepository])],
    exports: [ClassService],
    providers: [ClassService],
    controllers: [ClassController],
})
export class ClassModule {}
