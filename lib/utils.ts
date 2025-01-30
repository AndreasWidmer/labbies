import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitParents = (parentsText: string) => {
  const separators = [" X ", " X \n", " X\n", " X \n"];
  let parentMale = parentsText;
  let parentFemale = "";

  for (const separator of separators) {
    if (parentsText.includes(separator)) {
      [parentMale, parentFemale] = parentsText
        .split(separator)
        .map((part: string) => part.trim());
      break;
    }
  }

  return { male: parentMale, female: parentFemale };
};

export const cleanText = (text: string) => {
  const breedingTypes = [
    { label: "\n(taugl. f. jagdl. Leistungszucht)", type: "performance" },
    { label: "\n(taugl. f. sp. jagdl. Leistungszucht)", type: "special" },
  ];
  let breeding = "";
  breedingTypes.forEach(({ label, type }) => {
    if (text.includes(label)) {
      text = text.replace(label, "").trim();
      breeding = type;
    }
  });
  return { text, breeding };
};

export const createParentObjects = (
  parentMaleTextRaw: string,
  parentFemaleTextRaw: string
) => {
  const maleData = cleanText(parentMaleTextRaw);
  const femaleData = cleanText(parentFemaleTextRaw);

  const maleObj = {
    id: "",
    name: maleData.text || "",
    breeding: maleData.breeding,
    url: "",
  };

  const femaleObj = {
    id: "",
    name: femaleData.text || "",
    breeding: femaleData.breeding,
    url: "",
  };

  return { maleObj, femaleObj };
};

export const assignLinks = (
  links: any[],
  parentsText: string,
  maleObj: any,
  femaleObj: any
) => {
  let id = 1;
  if (links.length === 1) {
    if (parentsText.indexOf(links[0].text) < parentsText.indexOf(" X ")) {
      maleObj.url = links[0].href;
      maleObj.id = Number(
        new URLSearchParams(new URL(links[0].href).search).get("rvid")
      );
    } else {
      femaleObj.url = links[0].href;
      femaleObj.id = Number(
        new URLSearchParams(new URL(links[0].href).search).get("rvid")
      );
    }
  } else if (links.length >= 2) {
    maleObj.url = links[0].href;
    maleObj.id = Number(
      new URLSearchParams(new URL(links[0].href).search).get("rvid")
    );
    femaleObj.url = links[1].href;
    femaleObj.id = Number(
      new URLSearchParams(new URL(links[1].href).search).get("rvid")
    );
  }
};
