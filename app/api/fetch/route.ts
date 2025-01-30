import { checkCoverDataChanges } from "@/app/actions/planning";
export const runtime = "nodejs"; // WICHTIG für Next.js 15!


export async function GET() {
  return Response.json({ data: await checkCoverDataChanges() });
}
