import { Router } from 'express';
import userRoutes from './user.routes';
import depositInstructionsRoutes from './deposit-instructions.routes';
import simulateTransactionsRoutes from './simulate-transactions.routes';
import dbUser from '../middlewares/db-user';
import requireCustomer from '../middlewares/require-customer';

const router = Router();

router.use('/users', userRoutes);
router.use('/deposit-instructions', dbUser, requireCustomer, depositInstructionsRoutes);
router.use('/simulate-transactions', dbUser, requireCustomer, simulateTransactionsRoutes);

export default router;
