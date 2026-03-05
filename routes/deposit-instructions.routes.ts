import { Router } from 'express';
import { depositInstructionsController as controller } from '../controllers';
import validate from '../middlewares/validate';
import { getDepositInstructionsSchema } from '../schemas';

const router = Router();

router.get('/', validate(getDepositInstructionsSchema, 'query'), controller.getDepositInstructions);

export default router;
