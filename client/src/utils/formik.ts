import { get } from 'lodash';
import { Intent } from '../constants';

export const getFormikError = (formik: any, field: string) => {
	const { errors, touched } = formik;
	const errorMessage = get(errors, field, null);
	const isTouched = get(touched, field, false);

	if (isTouched) {
		return errorMessage;
	}

	return null;
};

export const hasFormikError = (formik: any, field: string) => {
	return Boolean(getFormikError(formik, field));
};

export const hasFormikErrorWithIntent = (formik: any, field: string) => {
	return getFormikError(formik, field) ? Intent.DANGER : Intent.NONE;
};
