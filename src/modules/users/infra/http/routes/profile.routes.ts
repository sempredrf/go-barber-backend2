import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ensureAuthenticated, profileController.show);
profileRouter.put('/', ensureAuthenticated, profileController.update);

export default profileRouter;
