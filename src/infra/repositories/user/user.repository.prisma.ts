import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/gateway/user.gateway";
import { User } from "../../../domain/entities/user";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient){}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    } 

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }

        await this.prismaClient.user.create({
            data: data
        })
    }

    public async findById(id: string): Promise<User | null> {
        const userRecord = await this.prismaClient.user.findUnique({
            where: {
                id: id
            }
        });

        if (!userRecord) { 
            return null;
        }

        const user = User.withoutPassword({
            id: userRecord.id,
            name: userRecord.name,
            email: userRecord.email,
        })

        return user
    }

    public async findAll(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany();

        const userList = users.map((user) => {
            return User.withoutPassword({
                id: user.id,
                name: user.name,
                email: user.email
            })
        })

        return userList
    }
}