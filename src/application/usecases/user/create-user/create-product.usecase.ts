import { User } from "../../../../domain/entities/user"
import { UserGateway } from "../../../../domain/gateway/user.gateway"
import { UseCase } from "../../usecase"

export type CreateUserInputDto = {
    name: string,
    email: string,
    password: string
}

export type CreateUserOutPutDto = {
    id: string
}

export class CreateUserUseCase implements UseCase<CreateUserInputDto, CreateUserOutPutDto> {
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new CreateUserUseCase(userGateway)
    }

    public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutPutDto> {
        const aUser = User.create(name, email, password)

        await this.userGateway.save(aUser)

        const output = this.presentOutput(aUser)

        return output
    }

    private presentOutput(user: User): CreateUserOutPutDto{
        const output: CreateUserOutPutDto = {
            id: user.id
        }

        return output
    }
}