import Task from "./Task"
const Tasks = ( { tasks,onDelete,onToggle }) => {
    
    return (
        <>
            {tasks.map((task) => 
                <Task key={tasks.id} onToggle={onToggle} task={task} onDelete={onDelete} />
            )}  
        </>
    )
}


export default Tasks
