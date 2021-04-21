import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [],
    providers: [],
    exports: [],
})

export class TeacherModule {}