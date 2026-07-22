import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};
const basename = path.basename(__filename);

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js"
  );
});

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const modelModule = await import(`./${file}`);
  const model = modelModule.default;
  if (model && model.modelName) {
    db[model.modelName] = model;
  }
}

export default db;