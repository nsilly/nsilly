import express from 'express';
import jwt from 'jsonwebtoken';
import { AsyncMiddleware } from '@nsilly/support';

const router = express.Router();

router.post('/login', AsyncMiddleware(login));
router.post('/register', AsyncMiddleware(register));

async function login(req, res) {
  res.json({});
}

async function register(req, res) {
  const token = jwt.sign({ id: 1, email: 'hieupv.est@gmail.com' }, process.env.JWT_SECRET, { expiresIn: 20160000 });
  res.json({ token: token });
}

module.exports = router;
