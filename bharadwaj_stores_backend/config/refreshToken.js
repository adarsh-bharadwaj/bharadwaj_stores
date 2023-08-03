const jwt = require('jsonwebtoken');

exports.generateRefreshToken = (id)=>{
    return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'3d'})
}