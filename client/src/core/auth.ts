export const getPassport = () => {
	const passport = sessionStorage.getItem('passport');

	if (passport) {
		return JSON.parse(passport);
	}

	return null;
};
