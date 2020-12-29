import { relative } from "path"

export type ToolResult = Issue | FileError

export class Issue {
  readonly filename: string
  readonly message: string
  readonly patternId: string
  readonly line: number
  readonly suggestion?: string

  constructor(
    filename: string,
    message: string,
    patternId: string,
    line: number,
    suggestion?: string
  ) {
    this.filename = filename
    this.message = message
    this.patternId = patternId
    this.line = line
    this.suggestion = suggestion
  }

  relativeTo(directory: string): Issue {
    const newFilename = relative(directory, this.filename)

    return new Issue(
      newFilename,
      this.message,
      this.patternId,
      this.line,
      this.suggestion
    )
  }
}
export class FileError {
  readonly filename: string
  readonly message: string

  constructor(filename: string, message: string) {
    this.filename = filename
    this.message = message
  }

  relativeTo(directory: string): FileError {
    const newFilename = relative(directory, this.filename)

    return new FileError(newFilename, this.message)
  }
}
