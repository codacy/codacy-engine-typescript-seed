import { deepStrictEqual } from "assert"
import chai from "chai"

import { parseCodacyrcFile } from "../fileUtils"
import { Codacyrc, Pattern, Tool } from "../model/codacyInput"

describe("fileUtils", () => {
  describe("parseCodacyrcFile", () => {
    it("should parse a codacyrc file", () => {
      const codacyrcFileContent = `{
      "files" : ["foo/bar/baz.js", "foo2/bar/baz.php"],
      "tools":[
        {
          "name":"jshint",
          "patterns":[
            {
              "patternId":"latedef",
              "parameters":[
                {
                  "name":"latedef",
                  "value":"vars"
                }
              ]
            }
          ]
        }
      ]
    }`
      const parsed = parseCodacyrcFile(codacyrcFileContent)
      const expected: Codacyrc = {
        files: ["foo/bar/baz.js", "foo2/bar/baz.php"],
        tools: [
          {
            name: "jshint",
            patterns: [
              {
                patternId: "latedef",
                parameters: [
                  {
                    name: "latedef",
                    value: "vars"
                  }
                ]
              }
            ]
          }
        ]
      }
      deepStrictEqual(parsed, expected)
    })
    it("should parse a codacyrc file with no files", () => {
      const codacyrcFileContent = `{
      "tools":[
        {
          "name":"jshint",
          "patterns":[
            {
              "patternId":"latedef",
              "parameters":[
                {
                  "name":"latedef",
                  "value":"vars"
                }
              ]
            }
          ]
        }
      ]
    }`
      const parsed = parseCodacyrcFile(codacyrcFileContent)
      const expected: Codacyrc = {
        tools: [
          {
            name: "jshint",
            patterns: [
              {
                patternId: "latedef",
                parameters: [
                  {
                    name: "latedef",
                    value: "vars"
                  }
                ]
              }
            ]
          }
        ]
      }
      deepStrictEqual(parsed, expected)
    })
    it("should parse a codacyrc file with no tools", () => {
      const codacyrcFileContent = `{
      "files" : ["foo/bar/baz.js", "foo2/bar/baz.php"]
    }`
      const parsed = parseCodacyrcFile(codacyrcFileContent)
      const expected: Codacyrc = {
        files: ["foo/bar/baz.js", "foo2/bar/baz.php"]
      }
      deepStrictEqual(parsed, expected)
    })
    it("should parse a codacyrc file with no parameters in pattern", () => {
      const codacyrcFileContent = `{
        "files" : [],
        "tools":[
          {
            "name": "",
            "patterns":[
              {
                "patternId":"latedef"
              }
            ]
          }
        ]
      }`
      const parsed = parseCodacyrcFile(codacyrcFileContent)
      const parameters = parsed.tools?.[0].patterns?.[0].parameters
      deepStrictEqual(parameters, [])
    })
    it("should fail with an invalid codacyrc file", () => {
      const wrongCodacyrcFileContent = `{`
      chai.expect(() => parseCodacyrcFile(wrongCodacyrcFileContent)).to.throw()
    })
  })
})
