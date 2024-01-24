import winston from "winston"


const connectionLogger  =  winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console()
    ]
})


export default connectionLogger