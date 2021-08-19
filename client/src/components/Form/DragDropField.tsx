import React from 'react';
import FieldGroup, { FieldGroupProps } from './FieldGroup';
import DragDropFile from '../DragDropFile';

interface DragDropFieldProps extends FieldGroupProps {
	disabled?: boolean;
	extensions?: string;
	name: string;
	onDrop: any;
	readOnly?: boolean;
	value: any;
}

const DragDropField = (props: DragDropFieldProps) => {
	return (
		<FieldGroup {...props}>
			{() => (
				<DragDropFile extensions={props.extensions} onDrop={props.onDrop} />
			)}
		</FieldGroup>
	);
};

export default DragDropField;
