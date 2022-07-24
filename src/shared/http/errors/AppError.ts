class AppError {
  public constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {}
}

export default AppError;
