import React, { Component } from "react";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../Blog/FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch(error => {
        // console.log(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/Posts/" + id });
  };
  /*<Link to = {'/' + post.id} key = {post.id}>*/
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            {...this.props}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
    <div>
      <section className="Posts">{posts}</section>;
      <Route path =  {'/Posts/:id'} exact component = {FullPost}></Route>
      </div>);
  }
}

export default Posts;
