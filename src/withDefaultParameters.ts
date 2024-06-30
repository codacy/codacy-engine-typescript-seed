import {
  Codacyrc,
  Parameter,
  ParameterSpec,
  Pattern,
  PatternSpec,
  Specification,
  Tool
} from "."

export function withDefaultParameters(
  codacyrc: Codacyrc,
  specification?: Specification
): Codacyrc {
  if (codacyrc.tools === undefined || specification?.patterns === undefined)
    return codacyrc

  const toolsWithDefaults = codacyrc.tools.map((tool) => {
    if (tool.patterns === undefined) return tool

    const patternsWithDefaults = tool.patterns.map((pattern) =>
      withDefaultParamentersForPattern(pattern, specification.patterns)
    )
    return new Tool(tool.name, patternsWithDefaults)
  })
  return new Codacyrc(codacyrc.files, toolsWithDefaults, codacyrc.options)
}

function withDefaultParamentersForPattern(
  pattern: Pattern,
  specificationPatterns: PatternSpec[]
): Pattern {
  const specificationPattern = specificationPatterns.find(
    (specPattern) => specPattern.patternId === pattern.patternId
  )

  const parameters = specificationPattern
    ? missingParameters(pattern, specificationPattern)
    : pattern.parameters

  return new Pattern(pattern.patternId, parameters)
}

function missingParameters(
  pattern: Pattern,
  specificationPattern: PatternSpec
): Parameter[] {
  return specificationPattern.parameters.map((specParameter) => {
    const overrideParameter = pattern.parameters.find(
      (param) => param.name === specParameter.name
    )

    return (
      overrideParameter ??
      new Parameter(specParameter.name, specParameter.default)
    )
  })
}
