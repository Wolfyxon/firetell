import "server-only";

export function getAdminFrbConfig() {
    const jsonEnv = process.env.FRB_ADMIN;
    
    if(jsonEnv) {
        return JSON.parse(jsonEnv);
    }

    throw new Error("FRB_ADMIN env not found");
}
