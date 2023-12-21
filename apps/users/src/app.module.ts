import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UserService } from './services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas.database';

@Module({
    imports:[MongooseModule.forRoot('mongodb+srv://ammar6500:<password>@nest-demo.yno0t9m.mongodb.net/nest?retryWrites=true&w=majority'),MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers: [UsersController],
    providers: [UserService],
})
export class AppModule { };