import { useState, useEffect, FC} from 'react'
import './App.css'

interface Todo {
  id: string;
  message: string;
  completed: boolean;
}
interface TaskInput {
  message: string;
}

function App() {

  const baseUrl = 'http://localhost:8000'
  const [todos, setTodos] = useState<Todo[]>([])
  const [taskInputModalVisible, setTaskInputModalVisible] = useState<boolean>();
  const [labelVisible, setLabelVisible] = useState<boolean>(true);

  const fetchTodos = async () => {
    console.log('fetching todos...')
    const reqUrl = baseUrl + '/todos'
    const response = await fetch(reqUrl)
    const todoList = await response.json()
    console.log(todoList)
    setTodos(todoList)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const TodoComponent: FC<Todo> = ({ id, message, completed}) => {

    const handleCheck = async () => {
      const url = baseUrl + `/todo/toggle/${id}`
      console.log('toggling check')
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
      })
      console.log('response : ', await response.json())
      // refetch
      await fetchTodos()
    }

    return (
      <div style={{ paddingLeft: '2%', paddingRight: '2%', flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'row',  backgroundColor: 'white', borderRadius: 10, color: 'black',
      marginBottom: '2%'}} >
          <button type='button' role="checkbox" style={{ 
            marginRight: '5%',
            borderRadius: '200%', 
            cursor: 'pointer',
            backgroundColor: completed ? 'red' : 'white',
            borderColor: completed ? 'red' :' black',
            width: 22,
            height: 22
          }} 
          onClick={handleCheck}/>
          <p>{message}</p>
      </div>
    )
  }

  const createTask = async (taskInput: TaskInput) => {
    const response = await fetch(baseUrl + '/todo', {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(taskInput)
    })
    console.log(await response.json())
    // refetch todos
    fetchTodos()
  }
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formElements = form.elements as typeof form.elements & {
      taskinput: {value: string}
    }
    let newTask : TaskInput = {
      "message" : formElements.taskinput.value,
    }
    createTask(newTask)
    setTaskInputModalVisible(false)
  }

  return (
   <div>
    <div style={{ marginBottom: '5%'}}>
      <h1>To dos</h1>
    </div>
    <div style={{ marginBottom: '5%'}}>
      {
        todos.map((todo) => {
          return <TodoComponent key={todo.id} id={todo.id} message={todo.message} completed={todo.completed} />
        })
      }
    </div>
    {
      taskInputModalVisible ? (
        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: 'white', borderRadius: 10,
          paddingBottom: '2%', paddingRight: '2%', position: 'relative'
          }}>
            {
              labelVisible && (
                <label htmlFor='taskinput' style={{ color: '#8d8d8d', position: 'absolute', top: '8%',
                left: '2%'}}>Task Description</label> )
            }
            <input type="text" id="taskinput" onFocus={() => setLabelVisible(false)}
            onBlur={() => setLabelVisible(true)}
            style={{ flex: 1,color: 'black', paddingTop: '2%', paddingBottom: '2%', width: '100%', backgroundColor: 'transparent', borderColor: 'transparent',
            paddingRight: '2%', paddingLeft: '2%', fontSize: 18}} />
            <div style={{ flex: 1, justifyContent: 'flex-end', width: '100%', display: 'flex'}}>
              <span><button type="submit">Add Task</button></span>
            </div>
          </div>
        </form>
      ) : 
      (
        <span><button onClick={() => setTaskInputModalVisible(true)}>Add Task</button></span>   
      )
    }
   </div>
  )
}

export default App
