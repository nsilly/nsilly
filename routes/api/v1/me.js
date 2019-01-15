import express from 'express';
import { AsyncMiddleware } from '@nsilly/support';
import { ApiResponse } from '@nsilly/response';
import { AuthMiddleware } from '@nsilly/auth';

const router = express.Router();

router.all('*', AuthMiddleware);
router.get('/profile', AsyncMiddleware(profile));

async function profile(req, res) {
  console.log('user', req.user);

  res.json(ApiResponse.success());
}

module.exports = router;
