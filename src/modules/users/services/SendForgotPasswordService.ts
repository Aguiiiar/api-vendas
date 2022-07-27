import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserToken from '../typeorm/entities/UserToken';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

class SendForgotPasswordService {
  public async handle(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokensRepository.generateToken(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordService;
