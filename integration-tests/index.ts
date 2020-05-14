import { Codacyrc, Engine, Issue, run, ToolResult } from "codacy-seed"

const engine: Engine = async function (
  codacyrc?: Codacyrc
): Promise<ToolResult[]> {
  function testResult() {
    if (codacyrc) {
      const result: ToolResult[] = []
      if (codacyrc.files) {
        result.concat(
          codacyrc.files.map(
            (f: string) => new Issue(f, "Found file", "found-file", 1)
          )
        )
      }
      if (codacyrc.tools && codacyrc.tools.length > 0) {
        result.push(
          new Issue("file.js", codacyrc.tools[0].name, "tool-name", 1)
        )
      }
      return result
    } else {
      return [new Issue("file.js", "No .codacyrc", "no-codacyrc", 1)]
    }
  }
  return testResult()
}

run(engine)
