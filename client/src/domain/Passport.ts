import PassportProps from '../types/passport';

class Passport implements PassportProps {
	accessToken: string | null;
	isAuthenticated: boolean;

	constructor(
		props: PassportProps = {
			isAuthenticated: false,
			accessToken: null,
		}
	) {
		this.isAuthenticated = props.isAuthenticated;
		this.accessToken = props.accessToken;
	}
}

export default Passport;
