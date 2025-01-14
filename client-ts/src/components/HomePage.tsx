type homepageProps = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};
export const HomePage = ({ todos }: { todos: homepageProps[] | null }) => {
  console.log("here are the props", todos);
  return (
    <div>
      <h2>HomePage</h2>
      {todos &&
        todos.map((todo) => {
          return (
            <div key={todo.id} className="todo-card">
              <h3>Title: {todo.title}</h3>
              <h3>Description: {todo.description}</h3>
              <h3>Completed: {todo.completed ? "Yup" : "Nope"}</h3>
            </div>
          );
        })}
    </div>
  );
};
