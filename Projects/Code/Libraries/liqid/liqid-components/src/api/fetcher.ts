export const fetcher = async <T>(
	url: string,
	init?: RequestInit,
): Promise<T> => {
	const res = await fetch(url, init);
	if (!res.ok) {
		throw new Error(`Failed to fetch: ${res.statusText}`);
	}
	return res.json();
};
