import { Codacyrc } from "./model/codacyInput";
import { CodacyResult } from "./model/codacyResult";

export type Engine = (codacyrc?: Codacyrc) => Promise<CodacyResult[]>
