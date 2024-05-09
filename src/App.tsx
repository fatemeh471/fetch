import useFetch from "./hooks/useFetch";
import { PostType } from "./post.types";

export default function App() {
  const {
    loading,
    error,
    data: posts = [],
    refetch,
  } = useFetch({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "get",
    key: "post",
    cache: {
      enabled: true,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <main>
      {posts?.map((post: PostType) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </main>
  );
}
