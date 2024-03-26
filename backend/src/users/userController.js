const userService = require("./userServices");

const register = async (req, res) => {
  try {
    var result = await userService.createUser(req.body);
    res.send(result);
  } catch (error) {
    console.log("Error: ", error);
    res.send({
      status: false,
      message: "An error occurred while creating the user",
    });
  }
};

const login = async (req, res) => {
  try {
    var result = await userService.loginUser(req.body);

    if (result.status) {
      res.send({ status: true, message: "User logged in successfully" });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log("Error: ", error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { register, login };