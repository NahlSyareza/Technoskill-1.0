const pg = require("../utils/connect");

exports.getAllManager = async function getAllManager(req, res) {
  const retrieveSuccess = "Retrieved all manager's data";

  try {
    const query = await pg.pool.query("SELECT * FROM manager");

    pg.logger.info(retrieveSuccess);
    return res.status(200).json({
      state: true,
      message: query,
      payload: query.rows,
    });
  } catch (err) {
    pg.logger.error(err);
    return res.status(500).json({
      satte: false,
      message: err,
      payload: null,
    });
  }
};

exports.loginManager = async function loginManager(req, res) {
  const { name, password } = req.query;
  const loginSuccess = "Login success!";
  const loginFailed = "Login failed! Check your name or password!";

  try {
    const query = await pg.pool.query(
      "SELECT * FROM manager WHERE name=$1 AND password=$2",
      [name, password]
    );

    if (query.rowCount != 1) {
      pg.logger.warn(loginFailed);
      return res.status(201).json({
        state: false,
        message: loginFailed,
        payload: null,
      });
    }

    pg.logger.info(loginSuccess);
    return res.status(200).json({
      state: true,
      message: loginSuccess,
      payload: query.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.registerManager = async function registerManager(req, res) {
  const { name, password } = req.body;
  const registerSuccess = "Register successful!";

  try {
    const query = await pg.pool.query(
      "INSERT INTO manager VALUES ($1,$2,$3) RETURNING *",
      [name, password, pg.crypto.randomUUID()]
    );

    pg.logger.info(registerSuccess);
    return res.status(200).json({
      state: true,
      message: registerSuccess,
      payload: query.rows,
    });
  } catch (err) {
    pg.logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};

exports.searchManager = async function seachManager(req, res) {
  const { nameLike } = req.query;
  const searchSuccess = "Manager found!";
  const searchFailed = "No such managers found!";

  try {
    const change = nameLike + "%";

    const query = await pg.pool.query(
      "SELECT * FROM manager WHERE UPPER(name) LIKE UPPER($1)",
      [change]
    );

    if (query.rowCount <= 0) {
      pg.logger.warn(searchFailed);
      return res.status(201).json({
        state: false,
        message: searchFailed,
        payload: query.rows,
      });
    }

    pg.logger.info(searchSuccess);
    return res.status(200).json({
      state: true,
      message: searchSuccess,
      payload: query.rows,
    });
  } catch (err) {
    pg.logger.error(err);
    return res.status(500).json({
      state: false,
      message: err,
      payload: null,
    });
  }
};
