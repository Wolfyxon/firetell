
export type UserRole = "user" | "admin";

export type UserMeta = {
    role: UserRole,
    chatMembership: Record<string, boolean>
};

export type UserResponse = {
    displayName?: string | null,
    uid: string
};
