export const formatCurrency = (value: number, currency = 'USD'): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(value);
};
