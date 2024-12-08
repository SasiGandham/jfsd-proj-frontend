import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, resetPosts } from "../../store/postsSlice";
import { useNavigate } from "react-router-dom";
import styles from './UserDashBoard.module.css'

export default function UserDashBoard() {
  const dispatch = useDispatch();
  const { posts, page } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(fetchPosts(page));
  }, [dispatch, page]);

  function handleAddPost() {
    navigate('/user/addPost');
  }

  return (
    <div className={styles.container}>
      <button className={styles.addButton} onClick={handleAddPost}>
        +
      </button>

      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <h3>{post.content}</h3>
          {post.image && <img src={post.image} alt="Post" />}
          <div className={styles.postcontent}>
            <p>{post.content}</p>
            <div className={styles.postmeta}>
              <p>Posted by: {post.user?.name || "Unknown"}</p>
              <p>Likes: {post.likes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
