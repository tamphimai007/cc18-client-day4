const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");

// joi
// const joi = require("joi");
// const schema = joi.object({
//   email: joi.string().required().email()
// })

exports.register = async (req, res, next) => {
  try {
    //Code
    const { email, password } = req.input;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return createError(400, "Email is already exits");
    }

    // 3. Encrypt password with bcryptjs
    const hashPassword = await bcrypt.hash(password, 10);
    // 4. Register success
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    console.log(newUser);
    res.json({ message: "Register Success!!" });
  } catch (err) {
    //err
    console.log(err);
    next(err);
    // res.send("server error").status(500);
  }
};

exports.login = async (req, res, next) => {
  try {
    // code
    const { email, password } = req.input;
    // console.log(email, password);
    // 1 Validate with ***** joi
    // if (!email) {
    //   return createError(400, "Email is required!!!");
    // }
    // if (!password) {
    //   return createError(400, "Password is required");
    // }
    // 2 Check Email in DB (already exits)
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return createError(400, "Email is not invalid");
    }
    // 3 Check Password is match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return createError(400, "Password is not match!!!");
    }
    // 4 Create Payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
    // 5 Generate Token
    const genToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d",
    });
    // console.log(genToken);
    // 6 Send To frontend
    res.json({
      user: payload,
      token: genToken,
    });

    // res.send("Hello Controller Login");
  } catch (err) {
    // err
    // console.log(err);
    next(err);
  }
};

exports.curentUser = async (req, res, next) => {
  try {
    // code
    const email = req.user.user.email;
    const member = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    console.log(member);
    res.json({ member });
  } catch (err) {
    // err
    next(err);
  }
};
