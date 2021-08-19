import React from 'react';
import cx from 'classnames';
import { Intent } from '../../constants';

export interface FieldGroupProps {
	children?: any;
	disabled?: boolean;
	htmlFor?: string;
	intent?: string;
	label: string;
	required?: boolean;
	touched?: boolean;
}

const FieldGroup = (props: FieldGroupProps) => {
	return (
		<div>
			<label
				htmlFor={props.htmlFor}
				className={cx(
					'block uppercase text-blueGray-600 text-xs font-bold mb-2 uppercase-fl',
					{ 'text-red-500': props.intent == Intent.DANGER }
				)}
			>
				{props.label}
			</label>
			{props.children}
		</div>
	);
};

export default FieldGroup;
