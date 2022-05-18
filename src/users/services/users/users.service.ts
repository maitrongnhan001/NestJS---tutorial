import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, user } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) 
    private readonly userRepository: Repository<User>) {}
    private users: user[] = []

    getUser() {
        return this.users.map(user => new SerializedUser(user))
    }

    getUserByUserName(username: string) {
        return this.users.find(user => user.username === username)
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id)
    }

    createUser(createUserDto: CreateUserDto) {
        const password = encodePassword(createUserDto.password)
        const newUser = this.userRepository.create({...createUserDto, password})
        return this.userRepository.save(newUser)
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOne({ username })
    }
}
