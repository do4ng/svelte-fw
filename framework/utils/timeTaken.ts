export default class TimeTaken {
  public startTime;

  constructor() {
    this.startTime = Date.now();
  }

  get() {
    return Date.now() - this.startTime;
  }
}
