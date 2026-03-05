import type { Response } from 'express';

class APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(res: Response, message: string, data?: T): void {
    res.status(200).json(new APIResponse(true, message, data));
  }

  static created<T>(res: Response, message: string, data?: T): void {
    res.status(201).json(new APIResponse(true, message, data));
  }

  static error(res: Response, status: number, message: string): void {
    res.status(status).json(new APIResponse(false, message));
  }
}

export default APIResponse;
