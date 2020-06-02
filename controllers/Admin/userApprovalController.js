var connection = require('../../config');

module.exports = {
    index: (req,res) => {
        let query = "select id,firstname,lastname,email,username,position from users where active = 0"

        connection.query(query, (err,rows) => {
            if(err){
                res.json({
                    status:false,
                    message: 'there are sopme error with query'
                })
            } else if (rows.length == 0 ){
                res.json({
                    status: -1,
                    message:' No results found'
                })
            } else {
                res.json({
                    status: 1,
                    data:rows
                })
            }
        })
    },

    update: (req,res) => {
        let user_id = req.body.id;

        let query = "update users set active = ? where id= ?";

        let data = [1, user_id];

        connection.query(query, data, (err,rows) => {
            if(err){
                res.json({
                    status:false,
                    message: 'there are some errors with query'
                })
            } else {
                res.json({
                    status: 1,
                    message: 'User Approved Successfully'
                })
            }
        })

    },

    destroy: (req,res) => {
        let user_id = req.body.id;

        let query = "delete from users where id = ?";

        connection.query(query, user_id, (err,rows) => {
            if(err){
                res.json({
                    status:false,
                    message: 'there are some errors with query'
                })
            } else {
                res.json({
                    status: 1,
                    message: 'User Rejected Successfully'
                })
            }
        })

    }
}


