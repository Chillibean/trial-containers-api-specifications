import fs from "fs";

const openApiFilePath = "./public/schema.json";
const openApiData = JSON.parse(fs.readFileSync(openApiFilePath, "utf-8"));

const packageJsonPath = "./package.json";
const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const currentPackageVersion = packageJsonData.version;

openApiData.info.version = currentPackageVersion;

// Write the updated OpenAPI data back to the file
fs.writeFileSync(
  openApiFilePath,
  JSON.stringify(openApiData, null, 2),
  "utf-8"
);

console.log(`Updated OpenAPI version to ${currentPackageVersion}`);
