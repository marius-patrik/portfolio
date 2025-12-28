import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth';
import { historyRouter } from './routes/history';
import { marketsRouter } from './routes/markets';
import { ordersRouter } from './routes/orders';
import { portfolioRouter } from './routes/portfolio';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/history', historyRouter);

app.listen(PORT, () => {
	console.log(`🚀 TradeBot server running on http://localhost:${PORT}`);
	console.log(
		`📊 IG Markets: ${process.env.IG_ENV === 'live' ? 'LIVE' : 'DEMO'} mode`,
	);
});
