"use server";

import { assignLinks, createParentObjects } from "@/lib/utils";
import { prisma } from "@/lib/db";
import * as cheerio from "cheerio";

const url = "https://drc.de/geplante-wuerfe/labrador-retriever";

export async function checkCoverDataChanges(): Promise<any> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const tableData: any[] = [];
  $("table tr").each((index, row) => {
    const cells = $(row).find("td");
    if (cells.length === 0) return;
    const rowData: any[] = [];
    cells.each((i, cell) => {
      const htmlContent = $(cell).html()?.trim() || "";
      const textContent =
        $(cell)
          .html()
          ?.replace(/<br\s*\/?>/gi, "\n")
          .replace(/<[^>]*>/g, "")
          .trim() || "";
      const links = $(cell)
        .find("a")
        .map((_, a) => ({
          href: $(a).attr("href"),
          text: $(a).text().trim(),
        }))
        .get();
      rowData.push({ htmlContent, textContent, links });
    });
    tableData.push(rowData);
  });

  const jsonData = tableData
    .filter((row: any) => {
      return row.length > 0;
    })
    .map((row: any, index: number) => {
      const [name, kennel] = row[1] ? row[1].textContent.split("\n") : ["", ""];
      const [zip, city, phone, email] = row[2]
        ? row[2].textContent.split("\n")
        : ["", "", "", ""];

      const pairing = row[4].textContent.replace(/\n/g, " ");
      const parentsCell = row[4] || { textContent: "", links: [] };
      const parentsText = parentsCell.textContent || "";
      const links = parentsCell.links || [];
      const url =
        row[1].links[0].href === "http://" ? null : row[1].links[0].href;

      const [parentMaleTextRaw, parentFemaleTextRaw] = parentsText.includes(
        " X\n"
      )
        ? parentsText.split(" X\n").map((part: string) => part.trim())
        : [parentsText.trim(), ""];

      const { maleObj, femaleObj } = createParentObjects(
        parentMaleTextRaw,
        parentFemaleTextRaw
      );
      assignLinks(links, parentsText, maleObj, femaleObj);

      return {
        name: name || null,
        kennel: kennel || null,
        zip: zip || null,
        city: city || null,
        phone: phone || null,
        email: email || null,
        url: url || null,
        pairing: pairing || null,
        parents: { male: maleObj, female: femaleObj },
      };
    });

  let newCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;
  let deletedCount = 0;

  for (const data of jsonData) {
    if (data) {
      const existingEntry = await prisma.coverPlan.findUnique({
        where: {
          kennel_pairing: {
            kennel: data.kennel,
            pairing: data.pairing,
          },
        },
      });

      if (existingEntry) {
        const changes = [];
        if (existingEntry.name !== data.name) changes.push("name");
        if (existingEntry.zip !== data.zip) changes.push("zip");
        if (existingEntry.city !== data.city) changes.push("city");
        if (existingEntry.phone !== data.phone) changes.push("phone");
        if (existingEntry.email !== data.email) changes.push("email");
        if (existingEntry.url !== data.url) changes.push("url");
        // if (existingEntry.cover !== data.cover) changes.push("cover");
        if (changes.length > 0) {
          console.log("Änderungen festgestellt bei Eintrag:", data);
          console.log("Vorher:", existingEntry);
          console.log("Nachher:", data);
          console.log("Geänderte Attribute:", changes);

          console.log("Änderungen festgestellt bei Eintrag:", data);
          console.log("Vorher:", existingEntry);
          console.log("Nachher:", data);
          await prisma.coverPlan.update({
            where: {
              kennel_pairing: {
                kennel: data.kennel,
                pairing: data.pairing,
              },
            },
            data: {
              name: data.name,
              zip: data.zip,
              city: data.city,
              phone: data.phone,
              email: data.email,
              url: data.url,
              // cover: data.cover,
              status: "updated",
              // parents: data.parents,
            },
          });
          updatedCount++;
        } else {
          await prisma.coverPlan.update({
            where: {
              kennel_pairing: {
                kennel: data.kennel,
                pairing: data.pairing,
              },
            },
            data: {
              status: "existing",
            },
          });
          unchangedCount++;
        }
      } else {
        await prisma.coverPlan.create({
          data: {
            name: data.name,
            kennel: data.kennel,
            zip: data.zip,
            city: data.city,
            phone: data.phone,
            email: data.email,
            url: data.url,
            // cover: data.cover,
            pairing: data.pairing,
            status: "new",
            // parents: data.parents,
          },
        });
        newCount++;
      }
    }
  }

  console.log(`Neue Einträge: ${newCount}`);
  console.log(`Geänderte Einträge: ${updatedCount}`);
  console.log(`Unveränderte Einträge: ${unchangedCount}`);
  console.log(`Gelöschte Einträge: ${deletedCount}`);

  return jsonData;
}

export async function getCoverData() {
  const previousData = await prisma.coverPlan.findMany();
  if (!previousData) {
    console.log("Keine vorherigen Daten gefunden.");
    return [];
  } // Sortiere die Daten nach createdAt
  return previousData.sort(
    (
      a: { createdAt: string | number | Date },
      b: { createdAt: string | number | Date }
    ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// "use server";

// import { assignLinks, createParentObjects } from "@/lib/utils";
// import { getDogDetails } from "./details";
// import previousData from "@/data/planning.json";

// export interface CoverPlanDataListItem {
//   id: number;
//   name: string;
//   url: string;
//   kennel: string;
//   zip: string;
//   city: string;
//   phone: string;
//   email: string;
//   cover: string;
//   parents: {
//     male: {
//       id: number;
//       name: string;
//       breeding: string;
//       url: string;
//       details: any;
//     };
//     female: {
//       id: number;
//       name: string;
//       breeding: string;
//       url: string;
//       details: any;
//     };
//   };
//   createdAt: string;
//   updatedAt: string;
//   status: "new" | "existing" | "deleted";
//   [key: string]:
//     | number
//     | string
//     | {
//         male: { id: number; name: string; breeding: string; url: string };
//         female: { id: number; name: string; breeding: string; url: string };
//       };
// }

// export interface CoverPlanData {
//   lastFetch: string | null;
//   drcLastFetch?: string | null;
//   data: CoverPlanDataListItem[];
// }

// import puppeteer from "puppeteer";
// // const fs = require("fs");
// // const path = require("path");

// const url = "https://drc.de/geplante-wuerfe/labrador-retriever";
// // const previousDataFile = path.resolve(process.cwd(), "data/planning.json");

// export async function checkCoverDataChanges(): Promise<any> {
//   let previousData: CoverPlanData = {
//     lastFetch: null,
//     drcLastFetch: null,
//     data: [],
//   };

//   // if (fs.existsSync(previousDataFile)) {
//   //   try {
//   //     previousData = JSON.parse(
//   //       fs.readFileSync(previousDataFile, "utf-8")
//   //     ) as CoverPlanData;
//   //   } catch (error) {
//   //     console.error(
//   //       "Fehler beim Parsen der JSON-Datei, Initialisierung mit leerem Array"
//   //     );
//   //     previousData = { lastFetch: null, data: [] };
//   //   }
//   // }

//   const lastFetch = previousData.lastFetch
//     ? new Date(previousData.lastFetch)
//     : null;
//   const now = new Date();

//   if (lastFetch && now.getTime() - lastFetch.getTime() < 5 * 1 * 1000) {
//     console.log(
//       "Daten wurden vor weniger als 5 Minuten abgerufen, kein erneuter Fetch erforderlich."
//     );
//     return previousData;
//   }

//   const browser = await puppeteer.launch({
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   const page = await browser.newPage();
//   await page.goto(url);

//   const tableData = await page.evaluate(() => {
//     const rows = Array.from(document.querySelectorAll("table tr"));
//     return rows.map((row) => {
//       const cells = Array.from(row.querySelectorAll("td"));
//       return cells.map((cell) => {
//         const htmlContent = cell.innerHTML.trim();
//         const textContent = cell.innerText.trim();
//         const links = Array.from(cell.querySelectorAll("a")).map((a) => ({
//           href: a.href,
//           text: a.innerText.trim(),
//         }));
//         return { htmlContent, textContent, links };
//       });
//     });
//   });

//   await browser.close();

//   if (!tableData || tableData.length === 0) {
//     console.error("Tabelle nicht gefunden oder leer");
//   }

//   const jsonData: any[] = tableData
//     .filter((row: any) => row.length > 0)
//     .map((row: any[], index: number) => {
//       const [name, kennel] = row[1] ? row[1].textContent.split("\n") : ["", ""];
//       const [zip, city, phone, email] = row[2]
//         ? row[2].textContent.split("\n")
//         : ["", ""];

//       const parentsCell = row[4] || { textContent: "", links: [] };
//       const parentsText = parentsCell.textContent || "";
//       const links = parentsCell.links || [];
//       const [parentMaleTextRaw, parentFemaleTextRaw] = parentsText.includes(
//         " X\n"
//       )
//         ? parentsText.split(" X\n").map((part: string) => part.trim())
//         : [parentsText.trim(), ""];

//       const { maleObj, femaleObj } = createParentObjects(
//         parentMaleTextRaw,
//         parentFemaleTextRaw
//       );
//       assignLinks(links, parentsText, maleObj, femaleObj);

//       return {
//         id: index + 1,
//         name,
//         kennel,
//         zip,
//         city,
//         phone,
//         email,
//         parents: { male: maleObj, female: femaleObj },
//       };
//     });

//   interface ParentDetails {
//     id: number;
//     name: string;
//     breeding: string;
//     url: string;
//     details: any;
//   }

//   interface UpdatedDataItem extends CoverPlanDataListItem {
//     parents: {
//       male: ParentDetails;
//       female: ParentDetails;
//     };
//   }
//   const updatedData: UpdatedDataItem[] = await Promise.all(
//     jsonData.map(
//       async (newItem: CoverPlanDataListItem): Promise<UpdatedDataItem> => {
//         const existingItem = previousData.data.find(
//           (item) => item.id === newItem.id
//         );

//         if (newItem.parents.male.url) {
//           await getDogDetails(newItem.parents.male.id);
//           // newItem.parents.male.details = maleDetails;
//         }
//         if (newItem.parents.female.url) {
//           await getDogDetails(newItem.parents.female.id);
//           // newItem.parents.female.details = femaleDetails;
//         }

//         if (existingItem) {
//           newItem.createdAt = existingItem.createdAt;
//           if (
//             existingItem.name !== newItem.name ||
//             existingItem.url !== newItem.url ||
//             existingItem.kennel !== newItem.kennel ||
//             existingItem.zip !== newItem.zip ||
//             existingItem.city !== newItem.city ||
//             existingItem.phone !== newItem.phone ||
//             existingItem.email !== newItem.email ||
//             existingItem.cover !== newItem.cover ||
//             existingItem.parents !== newItem.parents
//           ) {
//             newItem.updatedAt = new Date().toISOString();
//           } else {
//             newItem.updatedAt = existingItem.updatedAt;
//           }
//           newItem.status = "existing";
//         } else {
//           newItem.createdAt = new Date().toISOString();
//           newItem.updatedAt = newItem.createdAt;
//           newItem.status = "new";
//         }
//         return newItem as UpdatedDataItem;
//       }
//     )
//   );

//   previousData.data.forEach((oldItem) => {
//     if (!updatedData.find((item) => item.id === oldItem.id)) {
//       oldItem.status = "deleted";
//       oldItem.updatedAt = new Date().toISOString();
//       updatedData.push(oldItem);
//     }
//   });

//   previousData.data = updatedData;
//   previousData.lastFetch = new Date().toISOString();
//   previousData.drcLastFetch = previousData.drcLastFetch;

//   const newData = JSON.stringify(previousData, null, 2);

//   if (JSON.stringify(previousData.data) !== newData) {
//     console.log("Die Tabelle hat sich geändert!");
//     fs.writeFileSync(previousDataFile, newData, "utf-8");
//   } else {
//     console.log("Keine Änderungen in der Tabelle.");
//   }

//   return jsonData;
// }

// export async function getCoverData() {
//   // const previousData = fs.readFileSync(previousDataFile, "utf-8");
//   if (!previousData) {
//     console.log("Keine vorherigen Daten gefunden.");
//     return null;
//   }
//   const data = JSON.parse(previousData);
//   // Sortiere die Daten nach createdAt
//   data.data.sort(
//     (
//       a: { createdAt: string | number | Date },
//       b: { createdAt: string | number | Date }
//     ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );
//   return data;
// }
