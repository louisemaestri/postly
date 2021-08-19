export const deepKeys = <T>(t: T, path: Array<any> = []): any => {
	if (Object(t) === t)
		return Object.entries(t).flatMap(([k, v]: any) =>
			deepKeys(v, [...path, k])
		);

	return [path.join('.')];
};