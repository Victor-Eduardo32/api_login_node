import { Request, Response } from "express"
import { CreateUserInputDto, CreateUserOutPutDto, CreateUserUseCase } from "../../../../../application/usecases/user/create-user/create-user.usecase"
import { HttpMethod, Route } from "../route"

export type CreateUserResponseDto = {
    id: string
}

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUseCase
    ){}

    public static create(createUserService: CreateUserUseCase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, email, password } = request.body

            const input: CreateUserInputDto = {
                name,
                email,
                password
            }

            const output: CreateUserOutPutDto = await this.createUserService.execute(input)

            const responseBody = this.present(output)

            response.status(201).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: CreateUserOutPutDto): CreateUserResponseDto {
        const response = {id: input.id}
        return response
    }
}