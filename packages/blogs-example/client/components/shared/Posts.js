import React from 'react';
import Relay from 'react-relay';
import {Post} from '.';

export default Relay.createContainer(
  ({posts, loadMore}) => (
    <div>
      {
        posts.edges.map(({node: post}, i) =>
          <Post
            post={post}
            key={i}
          />
        )
      }
      {
        posts.pageInfo.hasNextPage &&
        <a onClick={loadMore}>More</a>
      }
    </div>
  ),
  {
    fragments: {
      posts: () => Relay.QL`
        fragment on PostsConnection {
          edges {
            node {
              ${Post.getFragment('post')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      `
    }
  }
);
