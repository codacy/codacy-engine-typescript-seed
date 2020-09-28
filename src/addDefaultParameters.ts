import {
  Codacyrc,
  Parameter,
  Pattern,
  PatternSpec,
  Specification,
  Tool
} from "."

export function addDefaultParameters(
  codacyrc: Codacyrc,
  specification: Specification
): Codacyrc {
  if (specification.patterns === undefined || codacyrc.tools === undefined)
    return codacyrc

  const newTools = codacyrc.tools.map((tool) => {
    if (tool.name === specification.name) {
      if (tool.patterns === undefined) return tool

      const newPatterns = tool.patterns.map((pattern) =>
        addDefaultParamentersToPattern(pattern, specification.patterns)
      )
      return new Tool(tool.name, newPatterns)
    } else {
      return tool
    }
  })
  return new Codacyrc(codacyrc.files, newTools)
}

function addDefaultParamentersToPattern(
  pattern: Pattern,
  specificationPatterns: PatternSpec[]
): Pattern {
  const specificationPattern = specificationPatterns.find(
    (specPattern) => specPattern.patternId === pattern.patternId
  )

  if (specificationPattern === undefined) return pattern

  const newParameters = specificationPattern.parameters.map((specParameter) => {
    const overrideParameter = pattern.parameters.find(
      (param) => param.name === specParameter.name
    )

    return (
      overrideParameter ??
      new Parameter(specParameter.name, specParameter.default)
    )
  })
  return new Pattern(pattern.patternId, newParameters)
}
