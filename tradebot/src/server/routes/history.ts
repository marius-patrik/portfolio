import { Router } from 'express';
import { getActivityHistory, getTransactionHistory } from '../services/ig';

export const historyRouter = Router();

historyRouter.get('/activity', async (req, res) => {
	try {
		const { from, to } = req.query;
		const history = await getActivityHistory(from as string, to as string);
		res.json(history);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

historyRouter.get('/transactions', async (req, res) => {
	try {
		const { from, to } = req.query;
		const transactions = await getTransactionHistory(
			from as string,
			to as string,
		);
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
