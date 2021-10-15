import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

// index, show, create, update, delete
class ForgotPasswordsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPassword = container.resolve(SendForgotPasswordEmailService);

    await forgotPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordsController;
