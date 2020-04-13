import { Codacyrc, CodacyResult, Engine, run } from "codacy-seed"

const engine: Engine = async function (
  codacyrc?: Codacyrc
): Promise<CodacyResult[]> {
  function testResult() {
    if (codacyrc) {
      const result: CodacyResult[] = []
      if (codacyrc.files) {
        result.concat(
          codacyrc.files.map(
            (f: string) => new CodacyResult(f, "Found file", "found-file", 1)
          )
        )
      }
      if (codacyrc.tools && codacyrc.tools.length > 0) {
        result.push(
          new CodacyResult("file.js", codacyrc.tools[0].name, "tool-name", 1)
        )
      }
      return result
    } else {
      return [new CodacyResult("file.js", "No .codacyrc", "no-codacyrc", 1)]
    }
  }
  return testResult()
}

run(engine)
