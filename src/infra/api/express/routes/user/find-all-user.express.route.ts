import { Request, Response } from "express"
import { FindAllUserOutputDto, FindAllUserUseCase } from "../../../../../application/usecases/user/find-all-user/find-all-user.usecase"
import { HttpMethod, Route } from "../route"

export type FindAllUserResponseDto = {
    users: {
        id: string,
        name: string,
        email: string
    }[]
}

export class FindAllUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findAllUserService: FindAllUserUseCase
    ){}

    public static create(findAllUserService: FindAllUserUseCase) {
        return new FindAllUserRoute(
            "/user",
            HttpMethod.GET,
            findAllUserService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.findAllUserService.execute()

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

    private present(input: FindAllUserOutputDto): FindAllUserResponseDto {
        const response: FindAllUserResponseDto = {
            users: input.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email
            }))
        }

        return response
    }
}