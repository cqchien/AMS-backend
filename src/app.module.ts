import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import './boilerplate.polyfill';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { MailModule } from './mail/mail.module';
import { ClassModule } from './modules/class/class.module';
import { CheckinController } from './modules/checkin/checkin.controller';
import { CheckinService } from './modules/checkin/checkin.service';
import { CheckinModule } from './modules/checkin/checkin.module';

@Module({
    imports: [
        AuthModule,
        TeacherModule,
        StudentModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        // MailModule,
        ClassModule,
        CheckinModule,
    ],
    controllers: [CheckinController],
    providers: [CheckinService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
