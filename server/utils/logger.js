import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, "..", "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const logger = {
  error: (data) => {
    const logEntry = JSON.stringify({
      level: "ERROR",
      timestamp: getTimestamp(),
      ...data,
    });

    console.error(`[${new Date().toISOString()}] ERROR:`, data.message);
    fs.appendFileSync(path.join(logsDir, "error.log"), logEntry + "\n");
  },

  warn: (data) => {
    const logEntry = JSON.stringify({
      level: "WARN",
      timestamp: getTimestamp(),
      ...data,
    });

    if (process.env.NODE_ENV !== "production") {
      console.warn(`[${new Date().toISOString()}] WARN:`, data.message);
    }
    fs.appendFileSync(path.join(logsDir, "warn.log"), logEntry + "\n");
  },

  info: (data) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[${new Date().toISOString()}] INFO:`, data.message);
    }
  },

  security: (data) => {
    const logEntry = JSON.stringify({
      level: "SECURITY",
      timestamp: getTimestamp(),
      ...data,
    });

    console.warn(`[${new Date().toISOString()}] SECURITY:`, data.message);
    fs.appendFileSync(path.join(logsDir, "security.log"), logEntry + "\n");
  },
};

export default logger;
