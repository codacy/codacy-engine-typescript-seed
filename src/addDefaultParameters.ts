import { Codacyrc, Parameter, Pattern, Specification } from "."

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
  specificationPatterns: Pattern[]
) {
  const specificationPattern = specificationPatterns.find(
    (specPattern) => specPattern.patternId === pattern.patternId
  )

  specificationPattern
    ? addMissingParameters(pattern.parameters, specificationPattern)
    : pattern.parameters
}

function addMissingParameters(
  parameters: Parameter[],
  specificationPattern: Pattern
) {
  const finalParameters = specificationPattern.parameters.map(
    (specParameter) => {
      const overrideParameter = parameters.find(
        (param) => param.name === specParameter.name
      )
      return overrideParameter ?? specParameter
    }
  )
  parameters = finalParameters
}
