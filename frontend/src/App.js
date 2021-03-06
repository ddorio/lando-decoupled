import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from './components/Header';
import BlogListing from './components/BlogListing';
import SingleBlogPost from './components/SingleBlogPost';
import Flash from './components/Flash';

const StyledApp = styled.div`
  text-align: center;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
      showList: true,
      currentPost: {},
      isError: false,
      flashMessage: '',
    }
    this.showPost = this.showPost.bind(this);
    this.returnToList = this.returnToList.bind(this);
  }

  showPost(post) {
    this.setState({
      showList: false,
      currentPost: post,
    });
  }

  returnToList(e) {
    this.setState({
      showList: true,
      currentPost: {},
    })
  }

  componentDidMount() {
    axios.get(`http://cms.decoupled.lndo.site/jsonapi/node/article`)
      .then(res => {
        const blogPosts = res.data;
        this.setState({blogPosts: blogPosts.data});
      })
      .catch((error) => {
        this.setState({
          isError: true,
          flashMessage: error.message,
        })
        console.log(error);
      });
  }

  render() {
    return (
      <StyledApp>
        <Header />
        {this.state.isError &&
          <Flash message={this.state.flashMessage} type={'Error'} />
        }
        {this.state.showList === true ?
          <Fragment>
            <h2>Blog Listing</h2>
            <BlogListing 
              blogPosts={this.state.blogPosts}
              showPost={this.showPost}
            />
          </Fragment> :
          <SingleBlogPost 
            postDetails={this.state.currentPost}
            returnToList={this.returnToList}
          />
        }
      </StyledApp>
    );
  }
}

export default App;
