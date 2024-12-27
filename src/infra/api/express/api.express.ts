import { Api } from "../api";
import express, { Express, NextFunction, Request, Response } from 'express';
import { Route } from "./routes/route";

export class ApiExpress implements Api {
    private app: Express

    private constructor(routes: Route[]) {
        this.app = express()
        this.app.use(express.json())
        this.addRoutes(routes)
        this.setupErrorHandling()
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()

            this.app[method](path, handler)
        })
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
            this.listRoutes()
        })
    }

    public setupErrorHandling() {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack)
            res.status(500).send('Internal Server Error')
        })
    }

    private listRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.log(routes)
    }
}