// scripts/prisma-make.ts
import * as fs from "fs";
import * as path from "path";

const arg = process.argv[2];
const desPath = "./prisma/models/";
const filename = `${arg}.prisma`;
const filePath = path.join(desPath, filename);

fs.stat(filePath, (exists) => {
  if (exists == null) {
    console.error(filename + " already exists. ==> ", filePath);
  } else if (exists.code === "ENOENT") {

    const dataDefind = `
model ${arg} {
    // defind column in table....
}
`;

    fs.writeFileSync(filePath, dataDefind);

    console.warn("create file ==>", filename , "success.");
  }
});
