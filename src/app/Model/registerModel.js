const database=require("../../Database/connect")
class registerModel{
    register(username){
        const checkUserExist = async () => {
            let result = await database.query(`select * from account where username='${username}'`)
            return result
        }
        return checkUserExist()
    }
    createaccount(username,password,role){
        const insaccount= async ()=> {
            let result= await database.query(`insert into account(username,password,role) values ('${username}','${password}','${role}')`)
            return result.rowCount
        }
        return insaccount()
    }
}
module.exports = new registerModel