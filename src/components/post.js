/** @jsx jsx */
import { Styled, css, jsx } from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"

import Body from "gatsby-theme-deck-n-blog/src/components/body"
import Comments from "./comments"

const Post = ({
  data: {
    post,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  console.log("post: ", post)

  return (
    <Layout location={location} title={title}>
      <SEO title={post.title} description={post.excerpt} />
      {/* <Comments id={post.id} /> */}
      <main>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date}
        </Styled.p>
        <Body body={post.body} />
      </main>
      <Comments id={post.id} />
      <PostFooter {...{ previous, next }} />
    </Layout>
  )
}

export default Post
