// DB全局配置JSON
export interface Config {
    readonly host: string,
    readonly port: number,
    readonly user: string,
    readonly password: string,
    database?: string
}

export type SqlFunction = (string, arg1?: any[]) => any