import { Router } from 'express';
import { getHistoricalPrices, getMarket, searchMarkets } from '../services/ig';

export const marketsRouter = Router();

marketsRouter.get('/search', async (req, res) => {
	try {
		const { q } = req.query;
		if (!q) return res.status(400).json({ error: 'Missing q parameter' });
		const markets = await searchMarkets(q as string);
		res.json(markets);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

marketsRouter.get('/:epic', async (req, res) => {
	try {
		const market = await getMarket(req.params.epic);
		res.json(market);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});

marketsRouter.get('/:epic/prices', async (req, res) => {
	try {
		const { resolution = 'HOUR', max = '100' } = req.query;
		const prices = await getHistoricalPrices(
			req.params.epic,
			resolution as string,
			Number(max),
		);
		res.json(prices);
	} catch (error) {
		res.status(500).json({ error: (error as Error).message });
	}
});
