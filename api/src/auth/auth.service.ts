import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { get } from 'lodash';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import configuration from 'src/config/configuration';
import { ConfirmAccountDto } from './dtos/confirm-account.dto';

const envs = configuration()

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(username);
    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch ? user : null;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const createUserDto = new CreateUserDto();
    createUserDto.fullname = registerUserDto.fullname;
    createUserDto.email = registerUserDto.email;
    createUserDto.password = registerUserDto.password;

    const user = await this.usersService.create(createUserDto);

    await this.mailerService
      .sendMail({
        to: user.email,
        from: 'noresponse@postly.com.br',
        subject: 'Confirm your account',
        template: 'confirm-account',
        context: {
          user: user.fullname,
          url: ""
        }
      });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload);

    await this.mailerService
      .sendMail({
        to: 'user.email@sdsdd.com',
        subject: 'You requested a new password',
        template: './forgot-password',
        context: {
          token,
          url: `${envs.clientUrl}/?token=${token}`,
          name: user.fullname
        },
      });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const payload = this.jwtService.decode(resetPasswordDto.token);
    const email = get(payload, 'email', null);
    const user = await this.usersService.findByEmail(email);

    await this.mailerService
      .sendMail({
        to: user.email,
        from: 'noresponse@postly.com.br',
        subject: 'Password was successfuly reseted',
        template: 'reset-password',
        context: {
          user: user.fullname
        }
      });
  }

  async confirmAccount(confirmAccountDto: ConfirmAccountDto): Promise<void> {
    const payload = this.jwtService.decode(confirmAccountDto.token);
    const email = get(payload, 'email', null);
    const user = await this.usersService.findByEmail(email);
    
    user.accountVerified = true;
    user.save();
  }
}
