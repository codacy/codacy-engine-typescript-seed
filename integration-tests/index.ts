import * as seed from "codacy-seed"

const engine: seed.Engine = async function (
  codacyrc?: seed.Codacyrc
): Promise<seed.CodacyResult[]> {
  function testResult() {
    if (codacyrc == undefined) {
      return [
        new seed.CodacyResult("file.js", "No .codacyrc", "no-codacyrc", 1),
      ]
    } else {
      const result: seed.CodacyResult[] = []
      if (codacyrc.files) {
        result.concat(
          codacyrc.files.map(
            (f: string) =>
              new seed.CodacyResult(f, "Found file", "found-file", 1)
          )
        )
      }
      if (codacyrc.tools && codacyrc.tools.length > 0) {
        result.push(
          new seed.CodacyResult(
            "file.js",
            codacyrc.tools[0].name,
            "tool-name",
            1
          )
        )
      }
      return result
    }
  }
  return testResult()
}

seed.run(engine)
