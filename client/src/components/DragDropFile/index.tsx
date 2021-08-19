import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragDropFile = ({ extensions = '', onDrop }: any) => {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: extensions,
		onDrop: onDrop,
	});

	return (
		<div className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				{isDragAccept && <span>All files will be accepted</span>}
				{isDragReject && <span>Some files will be rejected</span>}
				{!isDragActive && <span>Drop some files here ...</span>}
			</div>
		</div>
	);
};

export default DragDropFile;
