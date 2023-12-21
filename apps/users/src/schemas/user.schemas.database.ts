
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
   @Prop()
   name: string;
   @Prop()
   password: string;
   @Prop()
   email:string;

}
export const UserSchema = SchemaFactory.createForClass(User);