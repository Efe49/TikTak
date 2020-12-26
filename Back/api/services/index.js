'use-strict'
const moment = require('moment')
const jwt = require('jwt-simple')
const SECRET_TOKEN = 'tokenSecretoTikTakAplicacion'
function createToken (usuario){
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    }

    return jwt.encode(payload,SECRET_TOKEN)
}
function decodeToken(token){
    const decoded = new Promise((resolve, reject)=>{
        try{
            const payload = jwt.decode(token, SECRET_TOKEN)
            if(payload.exp <=moment().unix() ){
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        
        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}
module.exports ={
    createToken,
    decodeToken
} 