const jwt = require('jsonwebtoken')
const loginModel = require("../app/Model/loginModel");
const tokenKey = 'nhan123'
const tokenName = '__token'

class Authentication
{
    checkLogin(req, res)
    {
        let username = req.body.username
        let pass = req.body.password

        loginModel.userLogin(username, pass).then( (result) => {

            if (result.rowCount > 0)
            {
                res.cookie(tokenName,jwt.sign(
                    {
                        userId:result.rows[0].user_id,
                        shopId:result.rows[0].shop_id,
                        role:result.rows[0].role,
                    },
                    tokenKey)
                )
                res.send({status:200, role:result.rows[0].role})
            }
            else
            {
                res.send({status:400})
            }
        })
    }

    checkCookieAdmin(req, res, next)
    {
        try{
            let token = req.cookies.__token
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.shopId = decode.shopId
            req.role = decode.role
            if(req.role !== '1'){
                res.render('authFail.ejs')
            } else {
                next()
            }
        }catch (error){
            res.render('authFail.ejs')
        }
    }


    checkCookieSeniorAdmin(req, res, next)
    {
        try{
            let token = req.cookies.__token
            let decode = jwt.verify(token, tokenKey)
            req.userId = decode.userId
            req.shopId = decode.shopId
            req.role = decode.role
            if(req.role !== '2'){
                res.render('authFail.ejs')
            } else {
                next()
            }
        }catch (error){
            res.render('authFail.ejs')
        }
    }
}

module.exports = new Authentication