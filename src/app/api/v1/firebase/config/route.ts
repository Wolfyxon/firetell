import { getPublicFirebaseConfig } from "@/lib/shared/firebaseUtil";

export function GET() {
    return Response.json(getPublicFirebaseConfig());
}
