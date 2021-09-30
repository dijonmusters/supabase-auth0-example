import styles from "../styles/Home.module.css";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import { useState } from "react";

const Index = ({ todos, user }) => {
  const [content, setContent] = useState("");
  const [allTodos, setAllTodos] = useState([...todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = getSupabase(user.accessToken);
    const resp = await supabase
      .from("todo")
      .insert({ content, user_id: user.sub });

    setAllTodos([...todos, resp.data[0]]);
    setContent("");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setContent(e.target.value)} value={content} />
        <button>Add</button>
      </form>
      {allTodos?.length > 0 ? (
        allTodos.map((todo) => <p key={todo.id}>{todo.content}</p>)
      ) : (
        <p>You have completed all todos!</p>
      )}
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { accessToken },
    } = await getSession(req, res);

    const supabase = getSupabase(accessToken);

    const { data: todos } = await supabase.from("todo").select("*");

    return {
      props: { todos },
    };
  },
});

export default Index;
