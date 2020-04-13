export type Level = "Error" | "Info" | "Warning"

export type Category =
  | "ErrorProne"
  | "CodeStyle"
  | "Complexity"
  | "UnusedCode"
  | "Security"
  | "Compatibility"
  | "Performance"
  | "Documentation"
  | "BestPractice"

export type SecuritySubcategory =
  | "XSS"
  | "InputValidation"
  | "FileAccess"
  | "HTTP"
  | "Cookies"
  | "UnexpectedBehaviour"
  | "MassAssignment"
  | "InsecureStorage"
  | "InsecureModulesLibraries"
  | "Visibility"
  | "CSRF"
  | "Android"
  | "MaliciousCode"
  | "Cryptography"
  | "CommandInjection"
  | "FirefoxOS"
  | "Auth"
  | "DoS"
  | "SQLInjection"
  | "Routes"
  | "Regex"
  | "SSL"

export class PatternsParameter {
  name: string
  default?: any

  constructor(name: string, d?: any) {
    this.name = name
    this.default = d
  }
}
export class PatternsEntry {
  patternId: string
  level: Level
  category: Category
  subcategory?: SecuritySubcategory
  parameters?: PatternsParameter[]

  constructor(
    patternId: string,
    level: Level,
    category: Category,
    subcategory?: SecuritySubcategory,
    parameters?: PatternsParameter[]
  ) {
    this.patternId = patternId
    this.level = level
    this.category = category
    this.subcategory = subcategory
    this.parameters = parameters
  }
}

export class Patterns {
  name: string
  version: string
  patterns: PatternsEntry[]
  constructor(name: string, version: string, patterns: PatternsEntry[]) {
    this.name = name
    this.version = version
    this.patterns = patterns
  }
}
