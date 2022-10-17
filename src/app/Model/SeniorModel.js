const database = require('../../Database/connect')

class SeniorModel{
    isUsernameExisted(username){
        return database.query(`select account_id from account where username = '${username}'`)
            .then((result) => {
                return result.rowCount !== 0
            })
    }

    addNewShop(shopName, address){
       return database.query(`insert into shop (shop_name, address) values ('${shopName}', '${address}')`)
            .then((result) => {
                return result.rowCount
            })
    }

    getShopList(){
        return database.query(`select * from shop`).then((result) => {return result.rows})
    }

    getShopInfo(shopId){
        return database.query(`select * from shop where shop_id = ${shopId}`)
            .then((result) => {
                return result.rows
            })
    }

    updateShopInfo(shopId, shopName, address){
        return database.query(`update shop set shop_name = '${shopName}', address = '${address}'where shop_id = ${shopId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    checkShopIsUse(shopId){
        return database.query(`select shop_id from account where shop_id = ${shopId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    deleteShop(shopId){
        return database.query(`delete from shop where shop_id = ${shopId}`).then((result) =>{
            return result.rowCount
        })
    }

    getStaffList(){
        return database.query(`select a.account_id, a.name, s.shop_name 
                                from account as a, shop as s 
                                where role = '1'
                                and a.shop_id = s.shop_id`)
            .then((result) => {
            return result.rows
        })
    }

    getStaffInfo(staffId){
        return database.query(`select s.shop_id, a.name, s.shop_name 
                                from account as a, shop as s 
                                where a.account_id = ${staffId}
                                and a.shop_id = s.shop_id`)
            .then((result) => {
                return result.rows
            })
    }

    newStaff(staff) {
        return database.query(`insert into account (username, password, name, shop_id, role)
                               values ('${staff.username}', '${staff.password}', '${staff.fullName}', ${staff.shopId}, '1')`)
            .then((result) => {
                return result.rowCount
            })
    }

    updateStaff(accountId, shopId){
        return database.query(`update account set shop_id = ${shopId} where account_id = ${accountId}`)
            .then((result) => {
                return result.rowCount
            })
    }

    deleteStaff(staffId){
        return database.query(`delete from account where account_id = ${staffId}`).then((result) => {
            return result.rowCount
        })
    }
}

module.exports = new SeniorModel