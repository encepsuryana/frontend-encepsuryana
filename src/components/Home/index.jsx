import React from 'react';

export default function Home() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo('');
  };

  const handleChange = e => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={todo} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
