import { currentDirectory, templateDirectory, templateName } from "./constants";
import fs from "fs";
import Yaml from "yaml";
import path from "path";
import fsExtra from "fs-extra"

export async function getTemplateGenerator() {
  const file = fs.readFileSync(
    path.join(currentDirectory, templateName),
    "utf8"
  );
  const parseFile = Yaml.parse(file);
  return formatPathsInTemplate(parseFile);
}

export function formatPathsInTemplate(json) {
  const generator = { ...json };
  generator.templates = generator.templates.map((template) => {
    return {
      ...template,
      path: path.join(currentDirectory,templateDirectory, template.path),
    };
  });
  return generator.templates;
}


export function copyTemplateToCurrentDirectory({from,to}) {
  return fsExtra.copy(from,path.join(currentDirectory,to))
}