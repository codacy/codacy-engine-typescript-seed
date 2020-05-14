import { Codacyrc } from "./model/codacyInput"
import { ToolResult } from "./model/toolResult"

export type Engine = (codacyrc?: Codacyrc) => Promise<ToolResult[]>
