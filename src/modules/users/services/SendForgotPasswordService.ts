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

    const { token } = await userTokensRepository.generateToken(user.id);

    console.log(token);
    await EtherealMailer.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] - Recuperação de senha solicitado.',
      templateData: {
        template: `Olá, {{name}}. <a href="/teste" target="_blank">Recuperar senha</a>`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
