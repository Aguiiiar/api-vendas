import logger from '@lib/logger';
import app from './app';
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  logger.info(`Server started on port ${port}! 🏆`);
});
