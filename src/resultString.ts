import { CodacyResult } from "./model/codacyResult"

export function resultString(results: CodacyResult[]): string {
  const lines = results.map(result => JSON.stringify(result))
  return lines.join("\n")
}
