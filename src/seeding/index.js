const Staff = require("../models/staff.model");
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
  const foundAdmin = await Staff.find({ role: "admin" });
  if (foundAdmin.length < 1) {
    const data = {
      firstName: "Main",
      lastName: "Admin",
      password: "testing",
      contactEmail: "admin@gmail.com",
      role: "admin",
      
    };

    const genSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(data.password, genSalt);
    data.password = hashedPassword;

    const createAdmin = await Staff.create(data);
    if (!createAdmin) {
      console.log("Unable to create admin");
      return;
    }
    console.log("Admin seeding succesfully");
  }
  return;
};

module.exports = seedAdmin;
