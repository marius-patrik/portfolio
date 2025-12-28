import { Router } from 'express';
import {
	closePosition,
	getAccounts,
	getPositions,
	openPosition,
} from '../services/ig';

export const portfolioRouter = Router();

portfolioRouter.get('/account', async (_req, res) => {
	try {
		const accounts = await getAccounts();
		res.json(accounts);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

portfolioRouter.get('/positions', async (_req, res) => {
	try {
		const positions = await getPositions();
		res.json(positions);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

portfolioRouter.post('/positions', async (req, res) => {
	try {
		const { epic, direction, size, stopDistance, limitDistance } = req.body;
		if (!epic || !direction || !size) {
			return res
				.status(400)
				.json({ error: 'Missing epic, direction, or size' });
		}
		const result = await openPosition({
			epic,
			direction,
			size,
			stopDistance,
			limitDistance,
		});
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

portfolioRouter.delete('/positions/:dealId', async (req, res) => {
	try {
		const { direction, size } = req.body;
		const result = await closePosition(req.params.dealId, direction, size);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
