import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { instanceToInstance } from 'class-transformer';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    console.log(request.user.id);
    const users = await listUsers.handle();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUsers = new CreateUserService();

    const user = await createUsers.handle({ name, email, password });

    return response.json(instanceToInstance(user));
  }
}

export default UsersController;
