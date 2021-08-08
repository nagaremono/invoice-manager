export class ApiError extends Error {
  error: string;

  constructor(
    public statusCode: number,
    message: string,
    public ext?: Record<string, unknown>[]
  ) {
    super(message);
    this.error = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
