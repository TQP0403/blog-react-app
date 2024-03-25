import useFetch from '../../Hooks/useFetch';
import BlogList from '../../Components/BlogList';

const Home = () => {
  const { data: blogs, isPending, error } = useFetch({ url: 'http://localhost:3001/blogs' });

  return (
    <div className="home">
      <h2>Home page</h2>
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading ...</div>}
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;
