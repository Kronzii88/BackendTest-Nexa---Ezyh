const { Employee, Admin } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const start = req.query.start ? String(req.query.start).safe() : 0;
    const count = req.query.count ? String(req.query.count).safe() : 20;
    const keyword = req.query.keyword ? String(req.query.keyword).safe() : "";

    let employees = await Employee.findAndCountAll({
      where: {
        name: keyword,
        status: "Active",
      },
      offset: start,
      limit: count,
      attributes: ["id", "name", "nip", "status"],
    });

    if (!employees) {
      return res.status(404).json({
        status: "EMPTY",
        data: {
          message: "data employee is empty",
        },
      });
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        message: "Successfully get all employee",
        employees,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, nip } = req.body;
    const photo = req.file.path;

    if (!name || !nip || !photo) {
      return res.status(404).json({
        status: "EMPTY",
        data: {
          message: "field cannot be empty",
        },
      });
    }

    const existEmployee = await Employee.findOne({
      where: {
        [Op.or]: [{ name: name }, { nip: nip }],
      },
    });

    if (existEmployee) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Employee already exists!",
        },
      });
    }

    const newEmployee = await Employee.create({
      name: name,
      nip: nip,
      photo: photo,
      status: "Active",
    });

    res.status(201).json({
      status: "SUCCESS",
      data: {
        message: "New Employee successfully created!",
        newEmployee,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};

exports.updateByNip = async (req, res) => {
  try {
    const employeeNip = req.params.nip;
    const { name } = req.body;
    const photo = req.file.path;

    const employee = await Employee.findOne({
      where: {
        nip: employeeNip,
      },
    });

    if (!employee) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Employee does not exists!",
        },
      });
    }

    if (!name || !photo) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Please fill all fields",
        },
      });
    }

    const updateEmployee = await Employee.update(
      {
        name: name,
        photo: photo,
      },
      {
        where: {
          nip: employeeNip,
        },
      }
    );

    if (!updateEmployee) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Failed to update employee",
        },
      });
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        message: "Employee Successfully updated",
        updateEmployee,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};

exports.deactiveByNip = async (req, res) => {
  try {
    const employeeNip = req.params.nip;

    const employee = await Employee.findOne({
      where: {
        nip: employeeNip,
      },
    });

    if (!employee) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Employee does not exists!",
        },
      });
    }

    const deactivate = await Employee.update(
      {
        status: "Non Active",
      },
      {
        where: {
          nip: employeeNip,
        },
      }
    );

    if (!deactivate) {
      return res.status(401).json({
        status: "FAILED",
        data: {
          message: "Failed to update employee",
        },
      });
    }

    res.status(201).json({
      status: "SUCCESS",
      data: {
        message: "Employee Successfully updated",
        deactivate,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};
