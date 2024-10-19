import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { todoFilterAtom, todosAtom } from "./store/atoms/todo";
import { useState } from "react";
import { todosSelectorAtom } from "./store/selectors/todo";

function App() {
  return (
    <RecoilRoot>
      <TodoForm />
      <TodoFilter />
      <Todos />
    </RecoilRoot>
  )
}

const defaultTodo = {
  title: '',
  description: ''
}

const TodoForm = () => {

  const setTodos = useSetRecoilState(todosAtom);
  const [todo, setTodo] = useState(defaultTodo);

  const changeHandler = (key, e) => {
    setTodo((preState) => ({ ...preState, [key]: e.target.value }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setTodos(preTodos => ([...preTodos, todo]))
    setTodo(defaultTodo);
  }

  return (
    <form onSubmit={submitHandler}>
      <label>Title: </label>
      <input value={todo.title} onChange={(e) => changeHandler('title', e)} name="title" />
      <label>Description: </label>
      <input value={todo.description} onChange={(e) => changeHandler('description', e)} name="description" />
      <button type="submit">Submit</button>
    </form>
  );
}

const TodoFilter = () => {
  const [todoFilter, setTodoFilter] = useRecoilState(todoFilterAtom);
  return (
    <>
      <label>Type to filter results: </label>
      <input value={todoFilter} onChange={(e) => setTodoFilter(e.target.value)} />
    </>
  );
}

const Todos = () => {
  const todos = useRecoilValue(todosSelectorAtom);
  return (
    todos?.map((todo) => {
      const { title, description } = todo;
      return (
        <div>
          <div style={{
            display: "flex",
            flexFlow: 'row wrap',
            gap: '20px'
          }}>
            <span>Title: {title}</span>
            <span>Description: {description}</span>
          </div>
        </div>
      );
    })
  );
}

export default App
