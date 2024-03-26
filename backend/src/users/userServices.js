var userModel = require("./userModel");
var key = "sMv26LqbeT7pWw1asd12gds";
var encryptor = require("simple-encryptor")(key);

module.exports.createUser = async (userDetail) => {
  const existingUser = await userModel.findOne({ email: userDetail.email });

  if (existingUser) {
    return { status: false, msg: "Email already exists" };
  }

  var userModelDetail = new userModel();
  userModelDetail.firstName = userDetail.firstName;
  userModelDetail.lastName = userDetail.lastName;
  userModelDetail.email = userDetail.email;

  var encrypted = encryptor.encrypt(userDetail.password);
  userModelDetail.password = encrypted;

  try {
    await userModelDetail.save();
    return { status: true, msg: "User created successfully" };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      msg: "An error occurred while creating the user: " + err,
    };
  }
};

module.exports.loginUser = async (userDetail) => {
  try {
    const user = await userModel.findOne({ email: userDetail.email });

    if (user) {
      var decrypted = encryptor.decrypt(user.password);
      if (decrypted === userDetail.password) {
        return { status: true, msg: "Valid" };
      }
    }
    return { status: false, msg: "Invalid username or password" };
  } catch (err) {
    console.error(err);
    return { status: false, msg: "Error occurred: " + err };
  }
};
