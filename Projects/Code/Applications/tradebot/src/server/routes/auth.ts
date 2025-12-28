import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { configureIG, startSession } from '../services/ig';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

authRouter.post('/login', async (req, res) => {
	try {
		const { apiKey, username, password, environment = 'demo' } = req.body;

		if (!apiKey || !username || !password) {
			return res
				.status(400)
				.json({ error: 'Missing apiKey, username, or password' });
		}

		configureIG({
			apiKey,
			username,
			password,
			environment: environment as 'demo' | 'live',
		});
		await startSession();

		const token = jwt.sign({ environment }, JWT_SECRET, { expiresIn: '24h' });
		res.json({ success: true, token, environment });
	} catch (error) {
		res.status(401).json({ error: (error as Error).message });
	}
});

authRouter.get('/verify', (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'No token' });
	}

	try {
		const decoded = jwt.verify(authHeader.substring(7), JWT_SECRET);
		res.json({ valid: true, decoded });
	} catch {
		res.status(401).json({ error: 'Invalid token' });
	}
});
