import { Router } from 'express';
import { cancelOrder, createOrder, getOrders } from '../services/ig';

export const ordersRouter = Router();

ordersRouter.get('/', async (_req, res) => {
	try {
		const orders = await getOrders();
		res.json(orders);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

ordersRouter.post('/', async (req, res) => {
	try {
		const { epic, direction, size, level, type } = req.body;
		if (!epic || !direction || !size || !level || !type) {
			return res.status(400).json({ error: 'Missing required fields' });
		}
		const result = await createOrder({ epic, direction, size, level, type });
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

ordersRouter.delete('/:dealId', async (req, res) => {
	try {
		const result = await cancelOrder(req.params.dealId);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
