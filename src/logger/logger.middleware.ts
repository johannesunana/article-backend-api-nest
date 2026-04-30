import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  async use(req: any, res: any, next: () => void) {
    
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;
        
      this.logger.log({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
      }); 

    });


    next();


  }
}
