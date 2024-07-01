export type ParameterValue = any

export class Parameter {
  readonly name: string
  readonly value: ParameterValue

  constructor(name: string, value: ParameterValue) {
    this.name = name
    this.value = value
  }
}

export class Pattern {
  readonly patternId: string
  readonly parameters: Parameter[]

  constructor(patternId: string, parameters: Parameter[] = []) {
    this.patternId = patternId
    this.parameters = parameters
  }
}

export class Tool {
  readonly name: string
  readonly patterns?: Pattern[]

  constructor(name: string, patterns?: Pattern[]) {
    this.name = name
    this.patterns = patterns
  }
}

export type Options = { [k: string]: any }

export class Codacyrc {
  readonly files?: string[]
  readonly tools?: Tool[]
  readonly options?: Options

  constructor(files?: string[], tools?: Tool[], options?: Options) {
    this.files = files
    this.tools = tools
    this.options = options
  }
}
