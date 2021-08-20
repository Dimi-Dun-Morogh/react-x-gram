class Logger {
  readonly time = new Date().toLocaleTimeString();
  info(namespace:string, message:string,data?:any) {
    console.log(`[INFO] [${this.time}] : [${namespace}] [${message}]`, data? data: null)
  }
  error(namespace:string, message:string,data?:any) {
    console.error(`[INFO][${this.time}] : [${namespace}] [${message}]`, data? data: null)
  }
}

const logger = new Logger();

export default logger;