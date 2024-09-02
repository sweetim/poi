import {
  readFileSync,
  writeFileSync,
} from "fs"
import { EOL } from "os"

const ENV_FILE_PATH = "./.env"

export function persistToEnvFie(keyValue: Record<string, any>) {
  const text = readFileSync(ENV_FILE_PATH).toString()

  const newText = text.split(EOL)
    .map(line => {
      const [ key, value ] = line.split("=")

      return keyValue[key]
        ? `${key}="${keyValue[key]}"`
        : line
    })

  writeFileSync(ENV_FILE_PATH, newText.join(EOL))
}
