import { User } from "../entities/user";

export interface UserGateway {
    save(user: User): Promise<void>
    findById(id: string): Promise<User | null>
    findAll(): Promise<User[]>
}