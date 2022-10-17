const database = require('../src/Database/connect')

// database.query(`insert into account(username, password, role) values ('senior', '123123', '2') returning *`)
//     .then((result) => {
//         console.log(result)
//     })

// database.query(`update account set name = 'Nhanngudot' where account_id = 3 returning *`).then((result) => {
//     console.log(result.rows)
// })
// database.query('select * from account').then( (result) => { console.log(result.rows)})
// database.query(`select a.account_id, a.name, s.shop_name
//                                 from account as a, shop as s
//                                 where role = '1'
//                                 and a.shop_id = s.shop_id`)
//     .then((result) => {
//         console.log(result.rows)
//     })

// database.query(`select a.name, s.shop_name from account as a, shop as s
//                                 where a.account_id = 3
//                                 and a.shop_id = s.shop_id`)
//     .then((result) => {
//         console.log(result.rows)
//     })

database.query(`select * from supplier`).then((result) => {
    console.log(result.rows)
})
database.end()
