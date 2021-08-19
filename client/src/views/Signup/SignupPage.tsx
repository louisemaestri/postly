import React from 'react';
import * as yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { CheckboxField, TextField, FieldGroup } from '../../components/Form';
import { getFormikError, hasFormikErrorWithIntent } from '../../utils/formik';
import RegisterUserBody from '../../types/registerUserBody';
import authAPI from '../../api/auth';

import './SignupPage.css';
import logo from '../../assets/postly..svg';
import bg from '../../assets/bg.png';

const SignupPage = () => {
	const initialValues = {
		email: '',
		fullname: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false,
	};

	const validationSchema = yup.object().shape({
		fullname: yup.string().required(),
		email: yup.string().required(),
		password: yup
			.string()
			.required()
			.min(8, 'Password is too short - should be 8 chars minimum.')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Passwords must match'),
		acceptTerms: yup.boolean().required(),
	});

	const handleSignup = (
		body: RegisterUserBody,
		actions: FormikHelpers<any>
	) => {
		actions.setSubmitting(true);

		authAPI
			.register(body)
			.then(() => {})
			.finally(() => actions.setSubmitting(false));
	};

	const formik = useFormik({
		initialValues,
		onSubmit: (body: RegisterUserBody, actions: FormikHelpers<any>) =>
			handleSignup(body, actions),
		validationSchema,
	});

	return (
		<div
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: '100%',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="flex px-40 py-6">
				<img src={logo} className="w-40" />
			</div>
			<div className="py-20 px-40">
				<div className="grid grid-cols-2 gap-4 w-full">
					<div className="pr-14">
						<div className="text-white text-5xl tracking-wider font-bold leading-snug">
							Compartilhe links em um único lugar de forma totalmente gratuita
							para seu instagram!
						</div>
					</div>
					<div className="shadow-lg rounded bg-gray-200 p-10 py-14">
						<form noValidate onSubmit={formik.handleSubmit}>
							<FieldGroup
								label="Nome Completo"
								intent={hasFormikErrorWithIntent(formik, 'fullname')}
							>
								<TextField
									name="fullname"
									value={formik.values.fullname}
									onChange={({ target }: any) =>
										formik.setFieldValue('fullname', target.value)
									}
									placeholder="Nome Completo"
									fullWith
									className="mb-4"
									error={getFormikError(formik, 'fullname')}
								/>
							</FieldGroup>
							<FieldGroup
								label="E-mail"
								intent={hasFormikErrorWithIntent(formik, 'email')}
							>
								<TextField
									name="email"
									value={formik.values.email}
									onChange={({ target }: any) =>
										formik.setFieldValue('email', target.value)
									}
									placeholder="E-mail"
									fullWith
									className="mb-4"
									error={getFormikError(formik, 'email')}
								/>
							</FieldGroup>
							<FieldGroup
								label="Senha"
								intent={hasFormikErrorWithIntent(formik, 'password')}
							>
								<TextField
									name="password"
									value={formik.values.password}
									onChange={({ target }: any) =>
										formik.setFieldValue('password', target.value)
									}
									placeholder="Senha"
									fullWith
									className="mb-4"
									error={getFormikError(formik, 'password')}
								/>
							</FieldGroup>
							<FieldGroup
								label="Confirmar Senha"
								intent={hasFormikErrorWithIntent(formik, 'confirmPassword')}
							>
								<TextField
									name="confirmPassword"
									value={formik.values.confirmPassword}
									onChange={({ target }: any) =>
										formik.setFieldValue('confirmPassword', target.value)
									}
									placeholder="Confirmar Senha"
									fullWith
									className="mb-4"
									error={getFormikError(formik, 'confirmPassword')}
								/>
							</FieldGroup>
							<CheckboxField
								label="Eu aceito os termos de uso, politicas de privacidade e cookies."
								value={formik.values.acceptTerms}
								onChange={({ target }: any) =>
									formik.setFieldValue('acceptTerms', target.value)
								}
								name="acceptTerms"
								className="mb-4"
								error={getFormikError(formik, 'acceptTerms')}
							/>
							<button className="bg-gray-600 active:bg-gray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow w-full">
								Criar Conta
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignupPage;
