import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async handle(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const products = await productsRepository.find();

    return products || [];
  }
}

export default ListProductService;
