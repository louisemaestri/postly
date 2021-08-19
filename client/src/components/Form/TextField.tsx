import React, { memo } from 'react';
import cx from 'classnames';
import InputMask from 'react-input-mask';

interface TextFieldProps {
	className?: string;
	disabled?: boolean;
	error?: string | undefined;
	fullWith?: boolean;
	intent?: string;
	mask?: string | Array<string | RegExp>;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	readOnly?: boolean;
	type?: string;
	value: any;
}

const TextField = (props: TextFieldProps) => {
	return (
		<div className={cx(props.className)}>
			<InputMask
				mask={props.mask || ''}
				readOnly={props.readOnly}
				value={props.value}
				onChange={props.onChange}
			>
				<input
					className={cx(
						'border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150',
						{ 'w-full': props.fullWith, 'bg-red-50': props.error }
					)}
					id={props.name}
					name={props.name}
					type={props.type || 'text'}
					placeholder={props.placeholder}
				/>
			</InputMask>
			{props.error && (
				<span className="text-red-500 mt-1 block text-xs">{props.error}</span>
			)}
		</div>
	);
};

const MemoizedTextField = memo(TextField, (prevProps: any, nextProps: any) => {
	if (nextProps.useMemo && nextProps.input.value) {
		return nextProps.input.value === prevProps.input.value;
	}

	return false;
});

export default MemoizedTextField;
