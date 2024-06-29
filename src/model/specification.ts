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

export type ScanType =
  | "SAST"
  | "SCA"
  | "ContainerSCA"
  | "Secrets"
  | "IaC"
  | "CICD"
  | "License"
  | "PenTesting"
  | "DAST"
  | "CSPM"

export class ParameterSpec {
  name: string
  default: any

  constructor(name: string, d: any) {
    this.name = name
    this.default = d
  }
}
export class PatternSpec {
  patternId: string
  level: Level
  category: Category
  subcategory?: SecuritySubcategory
  scanType?: ScanType
  parameters: ParameterSpec[]
  enabled: Boolean

  constructor(
    patternId: string,
    level: Level,
    category: Category,
    subcategory?: SecuritySubcategory,
    scanType?: ScanType,
    parameters: ParameterSpec[] = [],
    enabled: Boolean = false
  ) {
    this.patternId = patternId
    this.level = level
    this.category = category
    this.subcategory = subcategory
    this.scanType = scanType
    this.parameters = parameters
    this.enabled = enabled
  }
}

export class Specification {
  name: string
  version: string
  patterns: PatternSpec[]
  constructor(name: string, version: string, patterns: PatternSpec[]) {
    this.name = name
    this.version = version
    this.patterns = patterns
  }
}
