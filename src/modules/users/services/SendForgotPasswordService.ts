import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMailer from '@config/mail/EtherealMailer';

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
    await EtherealMailer.sendMail({
      to: email,
      body: `Solicitaçao de redefinição de senha recebida. Token: ${token?.token}`,
    });
  }
}

export default SendForgotPasswordService;
