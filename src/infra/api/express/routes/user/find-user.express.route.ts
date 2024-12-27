import { Request, Response } from "express"
import { FindUserInputDto, FindUserOutputDto, FindUserUseCase } from "../../../../../application/usecases/user/find-user/find-user.usecase"
import { HttpMethod, Route } from "../route"

export type FindUserResponseDto = {
    id: string,
    name: string,
    email: string
}

export class FindUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findUserService: FindUserUseCase
    ){}

    public static create(findUserService: FindUserUseCase) {
        return new FindUserRoute(
            "/user/:id",
            HttpMethod.GET,
            findUserService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const id = request.params.id

            const input: FindUserInputDto = {
                id
            }

            const output: FindUserOutputDto = await this.findUserService.execute(input)
            
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

    private present(input: FindUserOutputDto): FindUserResponseDto {
        const response = {
            id: input.id,
            name: input.name,
            email: input.email
        }

        return response
    }
}