const {Pool} = require('pg');
try{
    module.exports = new Pool({
        connectionString: '\n' +
            'postgres://cokzogsltbhefl:2664ac0e40f1c46674d59e769d226fee4bb2d676c562e2a2af000789dded8186@ec2-44-209-24-62.compute-1.amazonaws.com:5432/d7ef7cn57nbsm3',
        ssl: {
            rejectUnauthorized: false
        }
    });
    console.log('Connect database success')
}catch (error){
    console.log('Connect database fail!')
}