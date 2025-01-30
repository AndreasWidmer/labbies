import { getDogData } from "@/app/actions/details";

export default async function DogsDetailsPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const data = await getDogData(id);
  return data && (
    <div className="container mx-auto px-4">
      <h1 className="font-extrabold text-3xl">Dog Details</h1>
      <ul>
        {/* <li>{data.id}</li>
        <li>{data.name}</li>
        <li>{data.zbid}</li>
        <li>{data.gender}</li>
        <li>{data.hd}</li>
        <li>{data.ed}</li>
        <li>{data.eyes}</li>
        <li>{data.birth}</li>
        <li>{data.parents.male}</li>
        <li>{data.parents.female}</li>
        <li>{data.color}</li>
        <li>{data.breeder}</li>
        <li>{data.approvalSince}</li>
        <li>{data.results}</li>
        <li>{data.tests}</li>
        <li>{data.notes}</li>
        <li>{data.form}</li>
        <li>{data.formpedigree}</li>
        <li>{data.contact}</li> */}
        <li></li>
      </ul>
    </div>
  );
}
