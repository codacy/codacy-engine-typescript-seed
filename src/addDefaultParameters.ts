import {
  Codacyrc,
  Parameter,
  ParameterSpec,
  Pattern,
  PatternSpec,
  Specification,
  Tool} from "."

export function addDefaultParameters(
  codacyrc: Codacyrc,
  specification?: Specification
): Codacyrc {
  const tools = codacyrc.tools ?? []
  const specificationPatterns = specification ? specification.patterns : []

  const toolsWithDefaults = tools.map((tool) => {
    const patterns: Pattern[] = tool.patterns ?? []

    const patternsWithDefaults = patterns.map((pattern) =>
      withDefaultParamenters(pattern, specificationPatterns)
    )
    return new Tool(tool.name, patternsWithDefaults)
  })
  return new Codacyrc(codacyrc.files, toolsWithDefaults)
}

function withDefaultParamenters(
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
