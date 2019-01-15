import express from 'express';
import auth from './auth';
import me from './me';
const router = express.Router();

router.use('/auth', auth);
router.use('/me', me);

export default router;
