import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

import { IAwsConfig } from '../../interfaces/IAwsConfig';
import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { UserSubscriber } from '../entity-subscribers/user-subscriber';

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `.${nodeEnv}.env`,
        });

        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production';
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    get fallbackLanguage(): string {
        return this.get('FALLBACK_LANGUAGE');
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
        let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

        if ((<any>module).hot) {
            const entityContext = (<any>require).context(
                './../../modules',
                true,
                /\.entity\.ts$/,
            );
            entities = entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
            const migrationContext = (<any>require).context(
                './../../migrations',
                false,
                /\.ts$/,
            );
            migrations = migrationContext.keys().map((id) => {
                const migrationModule = migrationContext(id);
                const [migration] = Object.values(migrationModule);
                return migration;
            });
        }
        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: 'postgres',
            //To deploy heroku
            // url: "postgres://mpgdahnnnwycit:e7493eb8c0aa1ecf3a276fa911e369f019ddea59f7d7efcb488abd573601dbdf@ec2-3-234-85-177.compute-1.amazonaws.com:5432/d7m22nin19d8c2",
            // ssl: {
            //     rejectUnauthorized: false
            //   },
            host: this.get('POSTGRES_HOST'),
            port: this.getNumber('POSTGRES_PORT'),
            username: this.get('POSTGRES_USERNAME'),
            password: this.get('POSTGRES_PASSWORD'),
            database: this.get('POSTGRES_DATABASE'),
            subscribers: [UserSubscriber],
            migrationsRun: true,
            logging: this.nodeEnv === 'development',
            namingStrategy: new SnakeNamingStrategy(),
        };
    }

    get awsS3Config(): IAwsConfig {
        return {
            accessKeyId: this.get('AWS_S3_ACCESS_KEY_ID'),
            secretAccessKey: this.get('AWS_S3_SECRET_ACCESS_KEY'),
            bucketName: this.get('S3_BUCKET_NAME'),
        };
    }
}
