const jwt = require("jwt-simple");
const key = "!@#$%$*&&";
const token = jwt.encode({
    userName:"admin",
    lastTime:Date.now() + (10 * 60 * 1000)
},key)
console.log(token)
