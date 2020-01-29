import React, { Component } from "react";
// import axios from 'axios';
import axios from "../../axios";

import Post from "../../components/Post/Post";
import NewPost from "./NewPost/NewPost";
import "./Blog.css";
import Posts from "../Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import FullPost from "./FullPost/FullPost";
import asyncComponent from '../../hoc/asyncComponent'

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/Posts/"
                  exact
                  activeStyle={{
                    color: "green",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
        {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost}></Route> : null}
        <Route path="/posts"  component={Posts}></Route>
        <Route render = {() => <h1>Not found!!</h1>}/>
        </Switch>
        </div>
        );
      }
    }
    
    export default Blog;
    // <Redirect from= '/' to= '/posts'/>
