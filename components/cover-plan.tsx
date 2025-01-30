"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { format } from "date-fns";

export default function coverPlan({
  coverData: coverData,
}: {
  coverData: any;
}) {
  console.log(coverData);
  // if (coverData == null) {
  //   return (
  //     <div>
  //       <h2>No data</h2>
  //     </div>
  //   );
  // }
  const [sortValue, setSortValue] = useState("plz");
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(coverData);
  }, [coverData]);

  const sortData = (data: any[], sortBy: string) => {
    return data.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1;
      if (a[sortBy] < b[sortBy]) return -1;
      return 0;
    });
  };

  const filterData = (data: any[], filter: string) => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const sortedData = sortData(data, sortValue);
  const filteredData = filterData(sortedData, filterValue);

  return (
    <div>
      <h2 className="py-2">Last Fetch: {/*coverData.lastFetch */}</h2>
      <div className="flex items-center space-x-4">
        <Select onValueChange={(value) => setSortValue(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zip">City</SelectItem>
            <SelectItem value="kennel">Kennel</SelectItem>
            <SelectItem value="createdAt">Created At</SelectItem>
          </SelectContent>
        </Select>

        <input
          type="text"
          placeholder="Filter..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-[200px] p-2 border border-gray-300 rounded"
        />
      </div>

      {filteredData &&
        filteredData.length > 0 &&
        filteredData.map((row: any) => (
          <ul
            className="py-4"
            style={{
              textDecoration:
                row.status === "deleted" ? "line-through" : "none",
            }}
            key={row.id}
          >
            <li key={row.id}>
              <div className="font-bold">
                {row.name} (
                {row.url ? (
                  <Link href={row.url} target="_blank" className="border-b">
                    {row.kennel}
                  </Link>
                ) : (
                  row.kennel
                )}
                )
              </div>
              <div className="text-sm">
                <div>
                  {row.status} ({row.createdAt ? format(new Date(row.createdAt), 'dd.MM.yyyy HH:mm:ss') : 'N/A'} / {row.updatedAt ? format(new Date(row.updatedAt), 'dd.MM.yyyy HH:mm:ss') : 'N/A'})
                </div>
              </div>
              <div>
                {["male", "female"].map((gender) => (
                  <div key={gender}>
                    <span>
                      {/*row.parents[gender].breeding === "special" ? (
                        <span className="text-xl font-bold text-red-800">
                          !!
                        </span>
                      ) : row.parents[gender].breeding === "performance" ? (
                        <span className="text-xl font-bold text-red-800">
                          !
                        </span>
                      ) : (
                        ""
                      )}{" "}
                      {row.parents[gender].url ? (
                        <Link
                          href={`/details/${row.parents[gender].id}`}
                          className="border-b"
                        >
                          {row.parents[gender].name}
                        </Link>
                      ) : (
                        row.parents[gender].name
                      )} */}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                {row.zip} {row.city}
              </div>
              <div>{row.cover}</div>
              <div>{row.phone}</div>
              <div>{row.email}</div>
            </li>
          </ul>
        ))}
    </div>
  );
}
