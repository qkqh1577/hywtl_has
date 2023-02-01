export function useInterval(callback: CallableFunction,
                            interval: number
): Interval {
  return new Interval(callback, interval);
}

class Interval {
  private timer = null;

  constructor(private callback,
              private interval
  ) {
  }

  start() {
    // @ts-ignore
    this.timer = setInterval(this.callback, this.interval);
  }

  stop() {
    // @ts-ignore
    clearInterval(this.timer);
    this.timer = null;
  }

  restart(interval = 0) {
    this.stop();

    if (interval) {
      this.interval = interval;
    }

    this.start();
  }
}
