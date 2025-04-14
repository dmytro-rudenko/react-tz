import { Router } from 'express';
import knex from '../services/knex.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await knex('users').select('id', 'name', 'email', 'balance').orderBy('name');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;