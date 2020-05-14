import { ToolResult } from "./model/toolResult"

export function resultString(results: ToolResult[]): string {
  const lines = results.map((result) => JSON.stringify(result))
  return lines.join("\n")
}
