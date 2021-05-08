import './boilerplate.polyfill';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { ClassModule } from './modules/class/class.module';
import { CheckinModule } from './modules/checkin/checkin.module';
import { join } from 'path';

@Module({
    imports: [
        AuthModule,
        TeacherModule,
        StudentModule,
        ClassModule,
        CheckinModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        MailerModule.forRootAsync({
            imports: [SharedModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    requireSSl: true,
                    auth: {
                        user: 'caochientp1@gmail.com',
                        pass: 'chiengu0',
                    },
                },
                defaults: {
                    from: '"No Reply" caochientp1@gmail.com',
                },
                template: {
                    dir: join(__dirname + '/templates/'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
