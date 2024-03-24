import { useState, useEffect, FC} from 'react'
import './App.css'

interface Todo {
  id: string;
  message: string;
  complete: boolean;
}
const TodoComponent: FC<Todo> = ({ id, message, complete}) => {
  
  return (
    <div style={{ paddingLeft: '2%', paddingRight: '2%', flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'row',  backgroundColor: 'white', borderRadius: 10, color: 'black'}} >
        <button type='button' role="checkbox" style={{ 
          marginRight: '5%',
          borderRadius: '200%', 
          cursor: 'pointer',
          backgroundColor: 'white',
          borderColor: 'black',
          width: 22,
          height: 22
        }} />
        <p>{message}</p>
    </div>
  )
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([{
    id: '1',
    message: 'Make a mockup for the inapp UI',
    complete: false
  }])
  const [taskInputModalVisible, setTaskInputModalVisible] = useState<boolean>();
  const [taskInput, setTaskInput] = useState<string>();
  const [labelVisible, setLabelVisible] = useState<boolean>(true);
  useEffect(() => {
    console.log(taskInput)
  }, [taskInput])

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formElements = form.elements as typeof form.elements & {
      taskinput: {value: string}
    }
    setTaskInput(formElements.taskinput.value)
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
          return <TodoComponent key={todo.id} id={todo.id} message={todo.message} complete={todo.complete} />
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
