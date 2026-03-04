export type ChatInit = {
    name?: string,
    members: string[]
}

export type Chat = ChatInit & {
    createdAt: number
}