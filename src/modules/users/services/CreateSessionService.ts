import AppError from '@shared/http/errors/AppError';
import { compareSync } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async handle({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = compareSync(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const token = sign({}, process.env.JWT_SECRET_KEY as string, {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
