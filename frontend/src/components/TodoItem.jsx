import { useState } from "react";

function TodoItem({todo,loadTodos}){
    const[editing,setEditing] = useState(false);
    const[title,setTitle]=useState(todo.title);
    const[description,setDescription]=useState(todo.description);

    const handleUpdate= async()=>{
        await TodoService.updateTodo(todo.id,{
            title,description
        })

        setEditing(false);
        loadTodos();

    };

    const handleStatusChange=async(e)=>{

        await TodoService.updateTodo(todo.id,{status:e.target.value});
        loadTodos();

    };

    const handleDelete=async()=>{

        await TodoService.deleteTodo(todo.id);
        loadTodos();

    };

    return(
        <div className="todo-item">
            {editing ? (
                <>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} />
                <input value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <button onclick ={handleUpdate}>save</button>
                </>
            ):(
                <>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <button onClick={()=>setEditing(true)}>Edit</button>
            
               </>


            )}

            <select value={todo.status} onChange={handleStatusChange}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="on hold">On Hold</option>

                <button onClick={handleDelete}>Delete</button>
            </select>
        </div>
    );

}

export default TodoItem;