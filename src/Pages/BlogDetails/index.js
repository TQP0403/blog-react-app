import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const BlogDetails = () => {
  const history = useHistory();

  const { id } = useParams();

  const { data: blog, isPending, error } = useFetch({ url: `http://localhost:3001/blogs/${id}` });

  const handleDelete = async () => {
    try {
      const res = await axios.delete('http://localhost:3001/blogs/' + blog.id);
      if (res.status >= 400) {
        throw new Error('delete failed');
      }
      history.push('/');
    } catch (error) {
      console.log('delete blog error:', error.message);
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div className="loading">Loading ...</div>}
      {error && <div className="error">{error}</div>}
      {blog && (
        <article>
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-author">Written by {blog.author}</p>
          <div className="blog-body">{blog.body}</div>
          <button className="blog-delete" onClick={() => handleDelete()}>
            delete
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;