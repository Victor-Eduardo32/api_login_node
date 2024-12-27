import { CreateUserUseCase } from "./application/usecases/user/create-user/create-user.usecase";
import { FindAllUserUseCase } from "./application/usecases/user/find-all-user/find-all-user.usecase";
import { FindUserUseCase } from "./application/usecases/user/find-user/find-user.usecase";
import { ApiExpress } from "./infra/api/express/api.express";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { FindAllUserRoute } from "./infra/api/express/routes/user/find-all-user.express.route";
import { FindUserRoute } from "./infra/api/express/routes/user/find-user.express.route";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";

function main() {
    const aRepository = UserRepositoryPrisma.create(prisma)

    const CreateUserUsecase = CreateUserUseCase.create(aRepository)
    const FindUserUsecase = FindUserUseCase.create(aRepository)
    const FindAllUserUsecase = FindAllUserUseCase.create(aRepository)

    const createRoute = CreateUserRoute.create(CreateUserUsecase)
    const findRoute = FindUserRoute.create(FindUserUsecase)
    const findAllRoute = FindAllUserRoute.create(FindAllUserUsecase)

    const port = 8000
    const api = ApiExpress.create([createRoute, findRoute, findAllRoute])
    api.start(port)
}

main()