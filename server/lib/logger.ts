export class Logger {
  private log: (tags: string[], message: string) => void;

  public constructor(server) {
    this.log = (tags: string[], message: string): void =>
      server.log(['reporting_schedulizer', ...tags], message);
  }

  public info(message): void {
    return this.log(['info'], message);
  }
}
