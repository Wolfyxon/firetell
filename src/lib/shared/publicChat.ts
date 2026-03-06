export type ChatInit = {
    name?: string,
    members: Record<string, boolean>
}

export type Chat = ChatInit & {
    createdAt: number
}