import React, { memo } from 'react';
import cx from 'classnames';

interface TextAreaFieldProps {
	disabled?: boolean;
	intent?: string;
	large?: boolean;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	readOnly?: boolean;
	type?: string;
	value: any;
}

const TextAreaField = (props: TextAreaFieldProps) => {
	return (
		<textarea
			className={cx(
				'border-0 px-3 py-3 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150',
				{ 'w-full': props.large }
			)} // fill={true}
			// intent={intent}
			style={{ height: 200 }}
			value={props.value}
			onChange={props.onChange}
		/>
	);
};

const MemoizedTextField = memo(
	TextAreaField,
	(prevProps: any, nextProps: any) => {
		if (nextProps.useMemo && nextProps.input.value) {
			return nextProps.input.value === prevProps.input.value;
		}

		return false;
	}
);

export default MemoizedTextField;
