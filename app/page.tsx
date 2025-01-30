import CoverPlan from "@/components/cover-plan";
import { getCoverData } from "@/app/actions/planning";

export default async function Home() {
  const data = await getCoverData();
  return (
    <div className="container mx-auto px-4">
      <h1 className="font-extrabold text-3xl pt-4">Labrador Welpen</h1>
      <CoverPlan coverData={data} />
    </div>
  );
}
