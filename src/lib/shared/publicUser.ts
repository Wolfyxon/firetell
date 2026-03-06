
export type UserRole = "user" | "admin";

export interface UserMeta {
    role: UserRole,
    chatMembership: Record<string, boolean>
};
