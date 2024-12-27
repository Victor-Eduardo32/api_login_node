import { User } from "../../../../domain/entities/user";
import { UserGateway } from "../../../../domain/gateway/user.gateway";
import { UseCase } from "../../usecase";

export type FindAllUserInputDto = null

export type FindAllUserOutputDto = {
    users: {
        id: string,
        name: string,
        email: string
    }[];
}

export class FindAllUserUseCase implements UseCase<FindAllUserInputDto, FindAllUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway) {
        return new FindAllUserUseCase(userGateway)
    }

    public async execute(): Promise<FindAllUserOutputDto> {
        const aUsers = await this.userGateway.findAll();

        const output = this.presentOutput(aUsers)

        return output
    }

    private presentOutput(users: User[]): FindAllUserOutputDto {
        return {
            users: users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            })
        }
    }
}