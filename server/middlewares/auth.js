const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");

exports.auth = (req, res, next) => {
  try {
    //code
    // Step 1 Check headers
    const authHeader = req.headers.authorization;
    // ถ้าไม่มี token ส่งมากับ header
    if (!authHeader) {
      return createError(401, "Token missing");
    }
    const token = authHeader.split(" ")[1];
    console.log("Jukkru middleware");
    console.log(token);
    // Step 2 Decode
    jwt.verify(token, process.env.SECRET,(err,decode)=>{
        //code
        // ถ้ามี error
        if(err){
            return createError(400, "Token invalid")
        }
        // Step 3 Next
        req.user = decode
        next();
    });

  } catch (err) {
    // err
    next(err);
  }
};
