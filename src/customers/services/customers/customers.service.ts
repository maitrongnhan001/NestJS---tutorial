import { Injectable } from '@nestjs/common';
import { createCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { customer } from 'src/customers/types/customer';

@Injectable()
export class CustomersService {
    private customers: Array<customer> = [
        {
            id: 1,
            email: 'danny@gmail.com',
            name: "Danny Danny"
        },
        {
            id: 2,
            email: 'adam@gmail.com',
            name: "Adam Adam"
        },
        {
            id: 3,
            email: 'spencer@gmail.com',
            name: "Spencer Spencer"
        }
    ]
    getCustomer() {
        return [...this.customers]
    }

    findCustomerById(id: number) {
       return this.customers.find(user => user.id === id)
    }

    createCustomer (createCustomerDto: createCustomerDto) {
        return this.customers.push(createCustomerDto)
    }
}
