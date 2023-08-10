import dayjs from 'dayjs'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { FPEvnet } from './fp/event'

export class Logger {
  static fileDistPath: string = `${process.cwd()}/logs/${dayjs().format('YYYY-MM-DD')}.txt`

  static testAddFileLogger(message: string) {
    const ws = fs.createWriteStream(`${process.cwd()}/logs/${uuidv4()}.txt`, { flags: 'a' })
    ws.write(message)
  }

  static debug(message: string) {
    const ws = fs.createWriteStream(this.fileDistPath, { flags: 'a' })
    FPEvnet.broadCastChannel<string, any>(
      message,
      [
        { cb: console, property: 'log' },
        {
          cb: ws,
          property: 'write',
        },
      ],
      (message, { cb, property }) => {
        cb[property](`\n${dayjs().format('HH:mm:ss')} => ${message}`)
      }
    )
  }
}
