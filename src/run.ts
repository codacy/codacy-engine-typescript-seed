import { Engine } from "./engine"
import { parseCodacyrcFile, readJsonFile } from "./fileUtils"
import { parseTimeoutSeconds } from "./parseTimeoutSeconds"
import { resultString } from "./resultString"

async function runImpl(engine: Engine) {
  const jsonFile = await readJsonFile("/.codacyrc")

  const codacyrc = jsonFile ? parseCodacyrcFile(jsonFile) : undefined

  const codacyResults = await engine(codacyrc)

  const lines = resultString(codacyResults)

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
