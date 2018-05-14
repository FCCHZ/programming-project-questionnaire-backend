import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export default function httpResult(
  response: Response,
  isSuccess,
  message,
  data,
) {
  return response.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message,
    success: isSuccess,
    data,
  });
}
