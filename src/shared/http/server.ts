import logger from '@lib/logger';
import app from './app';

app.listen(3333, () => {
  logger.info('Server started on port 3333! 🏆');
});
