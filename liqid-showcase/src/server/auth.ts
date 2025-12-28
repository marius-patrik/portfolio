import { Router } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { db } from './db.js';

const router = Router();

// JWT secret - use environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const CODE_EXPIRY_MINUTES = 10;

// Create nodemailer transport based on NODEMAILER_TRANSPORT env
// 'json' = debug mode (logs to console), 'smtp' = production
const transportType = process.env.NODEMAILER_TRANSPORT || 'json';
const transporter =
  transportType === 'json'
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
      });

// Generate a random 6-digit code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/send-code - Send verification code to email
router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Generate 6-digit code
    const code = generateCode();

    // Delete any existing codes for this user
    await db.deleteFrom('user').where('user', '=', email).execute();

    // Store code in database
    await db.insertInto('user').values({ user: email, code }).execute();

    // Log the code (debug mode - in production, send actual email)
    console.log(`\n========================================`);
    console.log(`📧 VERIFICATION CODE for ${email}`);
    console.log(`🔑 Code: ${code}`);
    console.log(`========================================\n`);

    // Simulate sending email (logs to console)
    await transporter.sendMail({
      from: 'noreply@portfolio.local',
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    });

    res.json({ success: true, message: 'Code sent to email' });
  } catch (error) {
    console.error('Error sending code:', error);
    res.status(500).json({ error: 'Failed to send code' });
  }
});

// POST /api/auth/verify-code - Verify code and return JWT
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ error: 'Email and code are required' });
      return;
    }

    // Find the code in database
    const authCode = await db
      .selectFrom('user')
      .selectAll()
      .where('user', '=', email)
      .where('code', '=', code)
      .executeTakeFirst();

    if (!authCode) {
      res.status(401).json({ error: 'Invalid code' });
      return;
    }

    // Check if code is expired (10 minutes)
    const createdAt = new Date(authCode.created_at);
    const now = new Date();
    const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    if (diffMinutes > CODE_EXPIRY_MINUTES) {
      // Delete expired code
      await db.deleteFrom('user').where('id', '=', authCode.id).execute();
      res.status(401).json({ error: 'Code expired' });
      return;
    }

    // Code is valid - delete it
    await db.deleteFrom('user').where('id', '=', authCode.id).execute();

    // Generate JWT token
    const token = jwt.sign(
      { email, iat: Math.floor(Date.now() / 1000) },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ error: 'Failed to verify code' });
  }
});

// GET /api/auth/me - Get current user data from JWT
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

      // Look up user in database
      const user = await db
        .selectFrom('users')
        .select(['id', 'name', 'email', 'created_at'])
        .where('email', '=', decoded.email)
        .executeTakeFirst();

      if (user) {
        res.json(user);
      } else {
        // User exists in JWT but not in users table - return email only
        res.json({ email: decoded.email, name: null, created_at: null });
      }
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

export default router;
