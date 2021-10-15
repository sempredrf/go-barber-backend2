import { Router } from 'express';
import ForgotPasswordsController from '../controllers/ForgotPasswordsController';
import ResetPasswordsController from '../controllers/ResetPasswordsController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordsController();
const resetPasswordController = new ResetPasswordsController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
