const pool = require("../config/db");

exports.getTodos= async (req,res)=>{
    try{
        const result = await pool.query("select * from todos order by sequence asc, id asc ");
        res.json(result.rows);

    } catch(err){
        console.log(err.message);
        res.status(500).json(err.message);
    }

};

