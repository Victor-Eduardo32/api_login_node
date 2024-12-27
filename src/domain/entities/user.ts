import { UserProps } from "../types/userProps";

export class User {
    private constructor(private props: UserProps){}

    public static create(name: string, email: string, password: string) {
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            password
        })
    }

    public static with(props: UserProps): User {
        return new User(props)
    }

    public static withoutPassword(props: Omit<UserProps, 'password'>): User {
        return new User({
            ...props,
            password: ''
        })
    }

    public get id() {
        return this.props.id
    }
    
    public get name() {
        return this.props.name
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }
}