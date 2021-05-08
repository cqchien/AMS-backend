import { TeacherEntity } from './teacher.entity';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendTeacherPassword(user: TeacherEntity, password: string) {
  
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: join(__dirname+'../../../templates/sendPassword.hbs'), // `.hbs` extension is appended automatically
            context: {
                // ✏️ filling curly brackets with content
                name: user.name,
                password,
            },
        });
    }
}
