import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class DeleteProductService {
  public async handle(id: string): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
