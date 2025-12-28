import cors from 'cors';
import express from 'express';
import authRouter from './auth.js';
import { db, initializeDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Example: Get all users
app.get('/api/users', async (_req, res) => {
  try {
    const users = await db.selectFrom('users').selectAll().execute();
    res.json(users);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Example: Create a user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db
      .insertInto('users')
      .values({ name, email })
      .returning(['id', 'name', 'email', 'created_at'])
      .executeTakeFirstOrThrow();
    res.status(201).json(result);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Start server
async function start() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
