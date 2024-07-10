const { Pool } = require("pg");
const logger = require("../utils/logger");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { log } = require("console");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,

  ssl: {
    require: true,
  },
});

pool.connect().then(() => {
  logger.info(`Connected to Neon database!`);
});

exports.logger = logger;
exports.crypto = crypto;
exports.pool = pool;
