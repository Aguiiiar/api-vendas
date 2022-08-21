import logger from '@lib/logger';
import app from './app';

app.listen(8080, () => {
  logger.info(`Server started on port 8080! 🏆`);
});
