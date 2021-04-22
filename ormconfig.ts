import './src/boilerplate.polyfill';

import dotenv from 'dotenv';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

if (!(<any>module).hot /* for webpack HMR */) {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

dotenv.config({
    path: `.${process.env.NODE_ENV}.env`,
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

module.exports = {
    type: 'postgres',
    url: "postgres://mpgdahnnnwycit:e7493eb8c0aa1ecf3a276fa911e369f019ddea59f7d7efcb488abd573601dbdf@ec2-3-234-85-177.compute-1.amazonaws.com:5432/d7m22nin19d8c2",
    ssl: {
        rejectUnauthorized: false
      },
    // host: process.env.POSTGRES_HOST,
    // port: +process.env.POSTGRES_PORT,
    // username: process.env.POSTGRES_USERNAME,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
};
