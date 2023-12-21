import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ResponseSchema } from '../../schemas/response.schemas';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {

    }
    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {

        return await this.userService.create(createUserDto).then(user=>{
            return JSON.stringify(new ResponseSchema(user,HttpStatus.CREATED))
        }).catch(error=>{
            return JSON.stringify(new ResponseSchema([],error.status,error.cause))
        });

    }

    @Post('login')
    async loginUser(@Body('email') email: string, @Body('password') password: string) {
        
        return await this.userService.loginUser(email, password).then(user=>{
            return JSON.stringify(new ResponseSchema(user,HttpStatus.OK))
        }).catch(error=>{
          return JSON.stringify(new ResponseSchema([],error.status,error.cause))
        });
    }

}
