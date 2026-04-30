import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    this.logger.log({
      method: req.method,
      url: req.url,
    });
    
    next();
  }
}
