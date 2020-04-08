import { walk as fsWalk } from "@nodelib/fs.walk"
import fs from "fs"
import { promisify } from "util"

import { Codacyrc } from "./model/codacyInput"

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
  return JSON.parse(content)
}
