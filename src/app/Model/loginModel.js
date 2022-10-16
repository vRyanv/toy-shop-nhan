const database = require('../../Database/connect')

class LoginModel{
    userLogin(username, password){

        const checkPass = async () => {
            let result = await database.query(`select * from account where username='${username}' and password='${password}'`)
            return result
        }

        return checkPass()
    }
}

module.exports = new LoginModel