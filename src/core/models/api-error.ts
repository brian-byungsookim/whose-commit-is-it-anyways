export class APIError extends Error {
  constructor(
    public name: string,
    public message: string,
    public status: number,
    public stack?: string
  ) {
    super(message);
  }

  public toJSON(): any {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    };
  }
}
