export type ChatInit = {
    name?: string,
    members: Record<string, boolean>
}

export type Chat = {
    name?: string,
    createdAt: number
}
