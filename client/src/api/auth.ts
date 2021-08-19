import HttpClient from './http';
import RegisterUserBody from '../types/registerUserBody';
import ForgotPasswordBody from '../types/forgotPasswordBody';
import ResetPasswordBody from '../types/resetPasswordBody';
import { getEnv } from '../core/env';

class AuthAPI extends HttpClient {
	public constructor() {
		super(getEnv('API_URL'));
	}

	public register = (body: RegisterUserBody) =>
		this.instance.post('/register', body);

	public forgotPassword = (body: ForgotPasswordBody) =>
		this.instance.post('/forgot-password', body);

	public resetPassword = (body: ResetPasswordBody) =>
		this.instance.post('/reset-password', body);
}

export default new AuthAPI();
