import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers() {
        return this.userService.getUser()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getUserByUsername (@Param('username')username: string) {
        const user = this.userService.getUserByUserName(username)

        if (user) return new SerializedUser(user )
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
    
    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id)
        if (user) return new SerializedUser(user)
        else throw new UserNotFoundException()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUser: CreateUserDto) {
        return this.userService.createUser(createUser)
    }
}
