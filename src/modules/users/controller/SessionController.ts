import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionService();

    const user = await createSession.handle({ email, password });

    return response.json(user);
  }
}

export default SessionController;
