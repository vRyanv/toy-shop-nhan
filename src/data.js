const database = require('../src/Database/connect')

database.query(`insert into account(username, password, role) values ('senior', '123123', '2') returning *`)
    .then((result) => {
        console.log(result)
    })

database.end()