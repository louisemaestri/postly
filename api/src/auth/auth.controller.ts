import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User as RequestUser } from './auth.decorator';
import { RequestUserDto } from './dtos/request-user.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ConfirmAccountDto } from './dtos/confirm-account.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.register(registerUserDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a new password' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('confirm-account')
  @ApiOperation({ summary: 'Confirm account' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  confirmAccount(@Body() confirmAccountDto: ConfirmAccountDto): Promise<void> {
    return this.authService.confirmAccount(confirmAccountDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@RequestUser() currentUser: RequestUserDto): Promise<User> {
    const user = await this.usersService.findByEmail(currentUser.username);
    return user;
  }
}
