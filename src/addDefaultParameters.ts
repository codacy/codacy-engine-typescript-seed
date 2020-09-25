import {
  Codacyrc,
  Parameter,
  ParameterSpec,
  Pattern,
  PatternSpec,
  Specification
} from "."

export function addDefaultParameters(
  codacyrc: Codacyrc,
  specification?: Specification
) {
  const tools = codacyrc.tools ?? []
  const specificationPatterns = specification ? specification.patterns : []

  tools.map((tool) => {
    const patterns = tool.patterns ?? []
    patterns.map((pattern) =>
      addDefaultParamentersToPattern(pattern, specificationPatterns)
    )
  })
}

function addDefaultParamentersToPattern(
  pattern: Pattern,
  specificationPatterns: PatternSpec[]
) {
  const specificationPattern = specificationPatterns.find(
    (specPattern) => specPattern.patternId === pattern.patternId
  )

  specificationPattern
    ? addMissingParameters(pattern, specificationPattern)
    : pattern.parameters
}

function addMissingParameters(
  pattern: Pattern,
  specificationPattern: PatternSpec
) {
  const finalParameters = specificationPattern.parameters.map(
    (specParameter) => {
      const overrideParameter = pattern.parameters.find(
        (param) => param.name === specParameter.name
      )

      return (
        overrideParameter ??
        new Parameter(specParameter.name, specParameter.default)
      )
    }
  )
  pattern.parameters = finalParameters
}
