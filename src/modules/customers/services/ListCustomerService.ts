import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class ListCustomerService {
  public async handle(): Promise<Customer[]> {
    const listCustomer = getCustomRepository(CustomerRepository);
    const customers = await listCustomer.find();

    return customers;
  }
}

export default ListCustomerService;
