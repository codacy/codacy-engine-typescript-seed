import { deepStrictEqual } from "assert"
import chai from "chai"

import { Specification } from ".."
import { parseCodacyrcFile, parseSpecification } from "../fileUtils"
import { Codacyrc } from "../model/codacyInput"

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
    it("should parse codacyrc files with no parameters in pattern", () => {
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

      const expected: Codacyrc = {
        files: [],
        tools: [
          {
            name: "",
            patterns: [
              {
                patternId: "latedef",
                parameters: []
              }
            ]
          }
        ]
      }

      deepStrictEqual(parsed, expected)
    })
    it("should fail with an invalid codacyrc file", () => {
      const wrongCodacyrcFileContent = `{`
      chai.expect(() => parseCodacyrcFile(wrongCodacyrcFileContent)).to.throw()
    })
  })

  describe("parseSpecification", () => {
    it("should parse specifications with no parameters in patterns", () => {
      const specificationContent = `{
        "name": "tool",
        "version": "10",
        "patterns": [
          {
            "patternId": "a-patternId",
            "level": "Warning",
            "category": "CodeStyle"
          }
        ]
      }`
      const result = parseSpecification(specificationContent)
      const expected: Specification = {
        name: "tool",
        version: "10",
        patterns: [
          {
            patternId: "a-patternId",
            level: "Warning",
            category: "CodeStyle",
            parameters: [],
            enabled: false
          }
        ]
      }
      deepStrictEqual(result, expected)
    })
  })
  it("should parse a codacyrc file with options", () => {
    const codacyrcFileContent = `{
      "options": {
        "language": "typescript"
      }
    }`
    const parsed = parseCodacyrcFile(codacyrcFileContent)
    const expected: Codacyrc = {
      options: { language: "typescript" }
    }
    deepStrictEqual(parsed, expected)
  })
})
