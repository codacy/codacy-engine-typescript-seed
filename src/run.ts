import { addDefaultParameters } from "./addDefaultParameters"
import { Engine } from "./engine"
import {
  parseCodacyrcFile,
  parseSpecification,
  readJsonFile
} from "./fileUtils"
import { parseTimeoutSeconds } from "./parseTimeoutSeconds"
import { resultString } from "./resultString"

async function runImpl(engine: Engine) {
  const jsonSpecification = await readJsonFile("/docs/patterns.json")
  const specificaiton = jsonSpecification
    ? parseSpecification(jsonSpecification)
    : undefined

  const jsonCodacyrc = await readJsonFile("/.codacyrc")
  const codacyrc = jsonCodacyrc ? parseCodacyrcFile(jsonCodacyrc) : undefined

  // Adds default parameters to codacyrc when they are not present on the configuration
  codacyrc ? addDefaultParameters(codacyrc, specificaiton) : undefined
  const toolResults = await engine(codacyrc)

  const lines = resultString(toolResults)

  console.log(lines)
}

export function run(engine: Engine): void {
  const timeoutHandle = setTimeout(() => {
    console.error("Timeout occurred. Exiting.")
    process.exit(2)
  }, parseTimeoutSeconds(process.env.TIMEOUT_SECONDS) * 1000)

  runImpl(engine)
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(() => clearTimeout(timeoutHandle))
}
