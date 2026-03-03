import { getAdminFrbConfig } from "@/lib/server/firebaseAdmin";

export async function GET() {
  console.log("hi", getAdminFrbConfig())
  return Response.json({ message: "test" });
}
