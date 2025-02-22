import { injectable } from "tsyringe";
import { UserModel } from "../models/userModel";
import { handleLayersError } from "../helpers/handleLayersErrors.utility";
import { error } from "console";


@injectable() 
export class UserRepository {

    async getUsers (): Promise<UserModel[] | void>{
        try {
           const users: UserModel[] = await UserModel.findAll();
           return users
        } catch (error) {
            handleLayersError('Repository', error);
        }
    }

    async createUser(user: Partial<UserModel>){
        try{
            const userCreated = await UserModel.create(user as UserModel);
            return userCreated
        }catch(error){
            handleLayersError('Repository', error)
        }

    }

    async findUserByEmail(email: string): Promise<UserModel | undefined | null>{
        try {
            const user: UserModel | undefined  | null = await UserModel.findOne({where: {email}})
            return user
        } catch (error) {
            handleLayersError('Repository', error)
        }

    }
}

