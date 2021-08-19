import React from 'react';
import cx from 'classnames';

interface CheckboxFieldProps {
	className?: string;
	disabled?: boolean;
	error?: string;
	label?: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	value: any;
}

const CheckboxField = (props: CheckboxFieldProps) => {
	return (
		<label
			className={cx('inline-flex items-center cursor-pointer', props.className)}
		>
			<input
				className={cx(
					'border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 border-0 ml-1 w-5 h-5',
					{ 'bg-red-50': props.error }
				)}
				id={props.name}
				name={props.name}
				type="checkbox"
				onChange={props.onChange}
				value={props.value}
			/>
			{props.label && (
				<span
					className={cx('ml-2 text-sm font-semibold', {
						'text-red-500': props.error,
					})}
				>
					{props.label}
				</span>
			)}
		</label>
	);
};

export default CheckboxField;
