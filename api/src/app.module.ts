import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContractsModule } from './contracts/contracts.module';
import { PlansModule } from './plans/plans.module';
import { AuthController } from './auth/auth.controller';
import { PlansController } from './plans/plans.controller';
import { UsersController } from './users/users.controller';
import { PagesModule } from './pages/pages.module';
import { PageLinksModule } from './page-links/page-links.module';
import { PagesController } from './pages/pages.controller';
import { PageLinksController } from './page-links/page-links.controller';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailsModule } from './emails/emails.module';
import { BullModule } from '@nestjs/bull';
import configuration from './config/configuration';

const envs = configuration()

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ContractsModule,
    PlansModule,
    PagesModule,
    PageLinksModule,
    EmailsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.production'],
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../dist/', 'client'),
      exclude: ['/api*'],
    }),
    MailerModule.forRoot({
      transport: {
        host: envs.smtp.host,
        port: envs.smtp.port,
        secure: false
      },
      defaults: {
        from: '"no-reply" <noreply@postly.com.br>',
      },
      template: {
        dir: join(__dirname, '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
          partials: {
            dir: join(__dirname, 'templates/partials'),
            options: {
              strict: true,
            },
          },
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        host: envs.redis.host,
        port: envs.redis.port,
      },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    PlansController,
    UsersController,
    PagesController,
    PageLinksController
  ],
  providers: [AppService],
})
export class AppModule {}