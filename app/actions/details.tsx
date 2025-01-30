"use server";

import { splitParents } from "@/lib/utils";

// import puppeteer from "puppeteer";
// const fs = require("fs");
// const path = require("path");

// const url =
//   "https://drc.de/adr/listen/show_druede.php?what=Hunde&rvid=161257&race=Labrador-Retriever";
// const previousDataFile = path.resolve(process.cwd(), "data/dogs.json");

export async function getDogDetails(id: number) {
  // Lese die vorhandenen Daten aus der dogs.json-Datei
  let existingData = [];
  // if (fs.existsSync(previousDataFile)) {
  //   const fileContent = fs.readFileSync(previousDataFile, "utf-8");
  //   if (fileContent) {
  //     existingData = JSON.parse(fileContent);
  //   }
  // }

  // Überprüfe, ob ein Eintrag mit der gleichen ID existiert
  // const existingEntry = existingData.find(
  //   (entry: { id: number }) => entry.id == id
  // );

  // if (existingEntry) {
  //   console.log(
  //     `Entry with ID ${id} already exists. Returning existing entry.`
  //   );
  //   return existingEntry;
  // }

  // const url = `https://drc.de/adr/listen/show_druede.php?what=Hunde&rvid=${id}&race=Labrador-Retriever`;

  // const browser = await puppeteer.launch({
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  // });
  // const page = await browser.newPage();
  // await page.goto(url);

  // const rawData = await page.evaluate(() => {
  //   const rows = Array.from(document.querySelectorAll("table tbody tr"));
  //   const result: { [key: string]: string } = {};

  //   rows.forEach((row) => {
  //     const ths = row.querySelectorAll("th");
  //     if (ths.length > 1) {
  //       result.name = ths[1]?.innerText || "";
  //     }
  //     const columns = row.querySelectorAll("td");
  //     const key = columns[0]?.innerText || "";
  //     const value = columns[1]?.innerText || "";
  //     if (key) {
  //       result[key] = value;
  //     }
  //   });

  //   return result;
  // });

  // await browser.close();

  // const [hd, ed] = rawData["HD/ED"] ? rawData["HD/ED"].split("\n") : ["", ""];
  // //   const [owner, street, city, phone, mail, website] = rawData["Besitzer"]
  // //     ? rawData["Besitzer"].split("\n")
  // //     : ["", "", "", "", "", ""];

  // const newData = {
  //   id:
  //     Number(
  //       new URLSearchParams(new URL(url).search).get(
  //         "rvid"
  //       ) as unknown as string
  //     ) || 0,
  //   name: rawData["name"] || null,
  //   zbid: rawData["ZB-Nr."] || null,
  //   gender: rawData["Geschlecht"]
  //     ? rawData["Geschlecht"] === "Rüde"
  //       ? "male"
  //       : "female"
  //     : null,
  //   hd: hd || null,
  //   ed: ed || null,
  //   eyes: rawData["Augen"] || null,
  //   birth: rawData["gew. am"] || null,
  //   parents: splitParents(rawData["Eltern"]) || null,
  //   color: rawData["Farbe"] || null,
  //   breeder: rawData["Züchter"] || null,
  //   approvalSince: rawData["ZZL vom"] || null,
  //   results: rawData["Befunde"] || null,
  //   tests: rawData["Titel/Prüfungen"] || null,
  //   notes: rawData["Hinweis"] || null,
  //   form: rawData["Formwert"] || null,
  //   pedigree: rawData["Ahnentafel"] || null,
  //   contact: rawData["Besitzer"] || null,
  //   // owner: owner || null,
  //   // street: street || null,
  //   // city: city || null,
  //   // phone: phone ? phone.replace("Tel. ", "") || null : null,
  //   // mail: mail ? mail.replace("E-Mail ", "") || null : null,
  //   // website: website ? website.replace("Homepage ", "") || null : null,
  // };

  // //   if (existingEntryIndex !== -1) {
  // //     // Eintrag existiert, überprüfe, ob die Daten aktualisiert werden müssen
  // //     const existingEntry = existingData[existingEntryIndex];
  // //     if (JSON.stringify(existingEntry) !== JSON.stringify(newData)) {
  // //       // Daten haben sich geändert, aktualisiere den Eintrag
  // //       existingData[existingEntryIndex] = newData;
  // //       console.log(`Updated entry with ID ${newData.id}`);
  // //     } else {
  // //       console.log(`No changes for entry with ID ${newData.id}`);
  // //     }
  // //   } else {
  // // Eintrag existiert nicht, füge neuen Eintrag hinzu
  // existingData.push(newData);
  // console.log(`Added new entry with ID ${newData.id}`);
  // //   }

  // // Schreibe die aktualisierten Daten zurück in die dogs.json-Datei
  // fs.writeFileSync(previousDataFile, JSON.stringify(existingData, null, 2));
  // return newData;
  return null;
}

export async function getDogData(id: number) {
  // const previousData = fs.readFileSync(previousDataFile, "utf-8");
  // if (!previousData) {
  //   console.log("No previous data found.");
  //   return null;
  // }
  // const jsonData = JSON.parse(previousData);
  // const dogData = jsonData.find((entry: { id: number }) => entry.id == id);
  // return dogData;
  return null;
}
