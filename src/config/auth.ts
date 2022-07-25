export default {
  jwt: {
    secret: process.env.JWT_SECRET_KEY as string,
    expiresIn: '1d',
  },
};
