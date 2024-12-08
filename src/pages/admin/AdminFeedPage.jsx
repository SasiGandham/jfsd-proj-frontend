import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost, incrementPage } from "../../store/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import styles from "./AdminFeedPage.module.css";

export default function AdminFeedPage() {
  const dispatch = useDispatch();
  const { posts, page, hasMore, loading } = useSelector((state) => state.posts);

  // Fetch posts when page changes
  useEffect(() => {
    dispatch(fetchPosts({ page, size: 10 }));
  }, [page, dispatch]);

  // Handle delete post
  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className={styles.adminFeed}>
      <div className={styles.header}>
        <h1>Citizens Posts</h1>
        <div>
          <button className={styles.button}>+</button>
          <button className={styles.button}>Delete Post</button>
        </div>
      </div>
      {loading && page === 0 && <h4 className={styles.loader}>Loading...</h4>}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => dispatch(incrementPage())}
        hasMore={hasMore}
        loader={<h4 className={styles.loader}>Loading more posts...</h4>}
        endMessage={<p className={styles.loader}>No more posts.</p>}
      >
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h3>{post.content}</h3>
            {post.image && <img src={post.image} alt="Post" />}
            <p>Posted by: {post.user?.name || "Unknown"}</p>
            <p>Likes: {post.likes}</p>
            <button
              className={styles.button}
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
