import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

class EtherealMailer {
  public static async sendMail({ to, body }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: 'equipe@apivendas.com.br',
      to,
      subject: 'Redefinição de senha',
      text: body,
    });

    console.log(`Message send: ${message.messageId}`);
    console.log(`Preview url: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMailer;
