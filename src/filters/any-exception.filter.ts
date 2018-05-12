import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
    response.status(500).json({
      statusCode: 500,
      success: false,
      data: null,
      message: '抱歉，服务器发生异常',
    });
  }
}
