import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

interface DataApiProps {
	isLoading: boolean;
	isError: boolean;
	data: any;
}

const useDataApi = async (initialUrl: string, initialData: any) => {
	const [url, setUrl] = useState(initialUrl);

	const [state, dispatch] = useReducer(
		(state: any, action: any) => {
			switch (action.type) {
				case FETCH_INIT:
					return { ...state, isLoading: true, data: action.payload };
				case FETCH_SUCCESS:
					return { ...state, isLoading: false };
				case FETCH_FAILURE:
					return { ...state, isLoading: true, isError: true };
				default:
					throw new Error();
			}
		},
		{
			isLoading: false,
			isError: false,
			data: initialData,
		} as DataApiProps
	);

	useEffect(() => {
		let didCancel = false;

		const fetchData = async () => {
			dispatch({ type: FETCH_INIT });

			try {
				const result = await axios(url);

				if (!didCancel) {
					dispatch({ type: FETCH_SUCCESS, payload: result.data });
				}
			} catch (error) {
				if (!didCancel) {
					dispatch({ type: FETCH_FAILURE });
				}
			}
		};

		fetchData();

		return () => {
			didCancel = true;
		};
	}, [url]);

	return [state, setUrl];
};

export default useDataApi;
