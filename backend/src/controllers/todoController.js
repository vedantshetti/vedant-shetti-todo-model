const pool = require("../config/db");

exports.getTodos= async (req,res)=>{
    try{
        const result = await pool.query("select * from todos order by id asc ");
        res.json(result.rows);

    } catch(err){
        console.log(err.message);
        res.status(500).json(err.message);
    }

};

exports.addTodo = async (req,res)=>{
    try{

        const {title,description}=req.body;
        const result = await pool.query( `insert into todos (title,description) values ($1,$2) returning *`,[title,description || null]);
        res.json(result.rows[0]);

    }catch(err){
        res.status(500).json(err.message);
    }
}

exports.updateTodo = async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,status} =req.body;

        const result = await pool.query(`update todos set title = coalesce($1,title),description = coalesce($2,description),status = coalesce($3,status) where id = $4 returning *` , [title,description, status,id]);
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json(err.message);
    }
};

exports.deleteTodo = async (req,res)=>{
    try{

        const{id} = req.params;

        await pool.query("delete from todos where id = $1",[id]);
        res.json("deleted");
        
    }catch(err){
        res.status(500).json(err.message);
    }
};  