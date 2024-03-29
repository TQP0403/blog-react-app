import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mario');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const createBlog = async (blog) => {
    try {
      const res = await axios.post('http://localhost:3001/blogs', { ...blog });
      if (res.status >= 400) {
        throw Error('Could not create blog');
      }
      setloading(false);
      history.push('/');
    } catch (error) {
      console.log({ error });
      setError(error.message);
      setloading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setloading(true);
    createBlog(blog);
  };

  return (
    <div className="create">
      <h2>Create a new blog</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Blog title:</label>
        <input type="text" required onChange={(e) => setTitle(e.target.value)}></input>
        <label>Blog body:</label>
        <textarea required onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Mario">Mario</option>
          <option value="Yoshi">Yoshi</option>
        </select>
        <button disabled={loading}>Create blog</button>
      </form>
    </div>
  );
};

export default Create;
