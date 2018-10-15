import express from 'express';
import ApiRouter from './api';

const router = express.Router();

router.use('/api', ApiRouter);

export default router;
