import express from 'express';
import { ApiResponse } from '@nsilly/response';
import { AsyncMiddleware } from '@nsilly/support';

var router = express.Router();

async function index(req, res) {
  res.json(ApiResponse.success());
}

router.get('/', AsyncMiddleware(index));

export default router;
