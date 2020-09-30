import { walk as fsWalk } from "@nodelib/fs.walk"
import { create } from "domain"
import fs from "fs"
import { promisify } from "util"

import { Codacyrc, Pattern, Tool } from "./model/codacyInput"
import { PatternSpec, Specification } from "./model/specification"

export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
export const walk = promisify(fsWalk)

export async function readJsonFile(file: string): Promise<string | undefined> {
  try {
    return await readFile(file, "utf8")
  } catch (e) {
    console.error(`Error reading ${file} file`)
    return undefined
  }
}

export function parseCodacyrcFile(content: string): Codacyrc {
  const parsed: Codacyrc = JSON.parse(content)

  const created: Codacyrc = new Codacyrc(
    parsed.files,
    parsed.tools?.map(
      (tool) =>
        new Tool(
          tool.name,
          tool.patterns?.map(
            (pattern) => new Pattern(pattern.patternId, pattern.parameters)
          )
        )
    )
  )

  return JSON.parse(JSON.stringify(created))
}

export function parseSpecification(content: string): Specification {
  const parsed: Specification = JSON.parse(content)

  const created: Specification = new Specification(
    parsed.name,
    parsed.version,
    parsed.patterns.map(
      (pattern) =>
        new PatternSpec(
          pattern.patternId,
          pattern.level,
          pattern.category,
          pattern.subcategory,
          pattern.parameters,
          pattern.enabled
        )
    )
  )

  return JSON.parse(JSON.stringify(created))
}
