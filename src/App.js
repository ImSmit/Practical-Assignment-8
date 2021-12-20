import { useState,useEffect } from "react"
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
function App() {
  const [showFrom,setShowForm] = useState(false)
  const [tasks, setTasks] = useState([])

//
useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks()
},[])
//Fetch Task
const fetchTasks = async () => {
  const res = await fetch ('http://localhost:5000/task')
  const data = await res.json()
  return data
}
//fetch task
const fetchTask = async (id) => {
  const res = await fetch (`http://localhost:5000/task/${id}`)
  const data = await res.json()
  return data
}
  //Add Task 
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/task',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json',
    },
    body :JSON.stringify(task),
  })
  const data = await res.json()

  setTasks([...tasks,data])
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id , ...task} 
  // setTasks([...tasks,newTask])
}

//Delete
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/task/${id}`,{
    method:'DELETE',
  })
  setTasks(tasks.filter((tasks) => tasks.id !== id))
}
//toggle
const toggleTask = async (id) => {
  const taskToToggle = await fetchTask(id)
  const upTask = {...taskToToggle,
  reminder:!taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/task/${id}`,{
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(upTask)
  })

  const data = await res.json()
  
  setTasks(
    tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder} : task)
  )
}
  return (
    <div className="container">
    <Header onAdd={() => setShowForm(!showFrom)}/>
    {showFrom && <AddTask onAdd={ addTask }/>}
    {tasks.length > 0 ? (
    <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleTask}/>): ('No Tasks to Show') }
    </div>
  );
}
  
export default App;
