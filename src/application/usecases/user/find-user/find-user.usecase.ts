
import { User } from "../../../../domain/entities/user"
import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { UseCase } from "../../usecase"

export type FindUserInputDto = {
    id: string
}

export type FindUserOutputDto = {
    id: string,
    name: string,
    email: string
}

export class FindUserUseCase implements UseCase<FindUserInputDto, FindUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway) {
        return new FindUserUseCase(userGateway)
    }

    public async execute(input: FindUserInputDto): Promise<FindUserOutputDto> {
        const { id } = input
        const aUser = await this.userGateway.findById(id);

        if (!aUser) { 
            throw new Error('User not found');  
        }

       const output = this.presentOutput(aUser)

       return output
    }

    private presentOutput(user: User): FindUserOutputDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}