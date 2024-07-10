const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  const { name, division, salary } = req.body;
  const registerSuccess = "Employee registration success!";

  try {
    if (name == undefined || division == undefined || salary == undefined) {
      pg.logger.error("Undefined found!");
      return res.status(202).json({
        state: false,
        message: "Undefined found!",
        payload: null,
      });
    }

    const query = await pg.pool.query(
      "INSERT INTO employee VALUES ($1,$2,$3,$4) RETURNING *",
      [name, pg.crypto.randomUUID(), division, salary]
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

exports.getAllEmployee = async function getAllEmployee(req, res) {
  const getAllSuccess = "Retrieved all employee's data!";

  try {
    const query = await pg.pool.query("SELECT * FROM employee");

    pg.logger.info(getAllSuccess);
    return res.status(200).json({
      state: true,
      message: getAllSuccess,
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

exports.getEmployee = async function getEmployee(req, res) {
  const { uid } = req.query;
  const getFailed = "No such employees!";
  const getSuccess = "Successfully fetched employee's data!";

  try {
    const query = await pg.pool.query("SELECT * FROM employee WHERE uid=$1", [
      uid,
    ]);

    if (query.rowCount <= 0) {
      pg.logger.warn(getFailed);
      return res.status(201).json({
        state: false,
        message: getFailed,
        payload: query.rows,
      });
    }

    pg.logger.info(getSuccess);
    return res.status(200).json({
      state: true,
      message: getSuccess,
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

exports.searchEmployee = async function searchEmployee(req, res) {
  const { name } = req.query;
  const searchSuccess = "Found matching employee data!";
  const searchFailed = "No matching data for any employee!";

  try {
    const change = name + "%";

    const query = await pg.pool.query(
      "SELECT * FROM employee WHERE UPPER(name) LIKE UPPER($1)",
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
