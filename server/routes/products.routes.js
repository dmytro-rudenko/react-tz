import { Router } from 'express';
import knex from '../services/knex.service.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await knex('products').select('id', 'name', 'price', 'stock');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;