import Task from "./Task"
const Tasks = ( { tasks,onDelete,onToggle }) => {
    
    return (
        <>
            {tasks.map((task, index) => 
                <Task key={index} onToggle={onToggle} task={task} onDelete={onDelete} />
            )}  
        </>
    )
}


export default Tasks
