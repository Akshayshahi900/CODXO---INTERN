import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
 const toggleFinished = (params) => {
   setshowFinished(!showFinished)
 }
 
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS()
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;

    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)


    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className="text-xl font-bold ">Add a Todo</h2>
          <input onChange={handleChange} value={todo} className="w-3/4 my-4" type="text" />
          <button onClick={handleAdd} disabled={todo.length <=3} className=' bg-violet-800 disabled:bg-violet-950 text-white mx-4 px-4 rounded-xl hover:font-bold transition-all ' >Save</button>
        </div>
        <input  onChange={toggleFinished} type="checkbox"  checked={showFinished} name="" id="" /> Show Finished
        <h1 className="text-xl font-bold my-4">Your Todos</h1>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex w-1/3 justify-between my-3 '>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div></div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => { handleEdit(e, item.id) }} className=' bg-violet-800 text-white mx-1 px-4 rounded-xl'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=' bg-violet-800 text-white mx-1 px-4 rounded-xl'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
