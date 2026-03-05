import { Router } from 'express';
import { simulateTransactionsController as controller } from '../controllers';
import validate from '../middlewares/validate';
import requireIdempotencyKey from '../middlewares/require-idempotency-key';
import { simulateTransactionSchema } from '../schemas';

const router = Router();

router.post('/', requireIdempotencyKey, validate(simulateTransactionSchema), controller.simulateTransaction);

export default router;
