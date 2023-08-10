import { Request, Response, Router } from 'express'
import { reqMiddleware } from '../middlewares/reqMiddleware'
import { Logger } from '../utils/logger'
class HealthCheckController {
  router: Router

  constructor() {
    this.router = Router()
    this.router.get('/health', reqMiddleware, this.healthCheck)
    this.router.get('/logger', reqMiddleware, this.addLoggerfile)
  }

  healthCheck(req: Request, res: Response) {
    return res.status(200).json('success')
  }

  async addLoggerfile(req: Request, res: Response) {
    Logger.testAddFileLogger('hello world')
    return res.status(200).json('success')
  }
}

export const healthCheckController = new HealthCheckController()
