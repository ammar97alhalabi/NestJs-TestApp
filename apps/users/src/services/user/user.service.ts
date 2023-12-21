import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schemas.database';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
    async create(createUserDto: CreateUserDto): Promise<User> {
        let exist = await this.userModel.findOne({ email: createUserDto.email });

        if (!exist) {
            const createdUser = await this.userModel.create(createUserDto);
            return createdUser;
        }

        else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User Already Exist',
            }, HttpStatus.BAD_REQUEST, {
                cause: 'User Already Exist'
            });
        }
    }

    async loginUser(email: string, password: string): Promise<User> {
        let exist = await this.userModel.findOne({ email: email });

        if (exist) {
            if (exist.password == password) {
                return this.userModel.findOne({ email: email, password: password }).exec();
            } else {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Wrong Password',
                }, HttpStatus.BAD_REQUEST, {
                    cause: 'Wrong Password'
                });
            }

        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User Not Found',
            }, HttpStatus.NOT_FOUND, {
                cause: 'User Not Found'
            });
        }

    }

}
