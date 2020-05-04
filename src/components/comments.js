/** @jsx jsx */
import { jsx } from "theme-ui"
import gql from "graphql-tag"
import { useSubscription } from "react-apollo-hooks"

import Comment from "./comment"
import CommentForm from "./commentForm"

const GET_COMMENTS = gql`
  subscription($id: uuid!) {
    comments(where: { post_id: { _eq: $id } }) {
      id
      name
      comment
      time_posted
      post_id
    }
  }
`

const Comments = ({ id }) => {
  const { data, loading, error } = useSubscription(GET_COMMENTS, {
    variables: { id },
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>
  }

  return (
    <div>
      <ul
        sx={{
          display: `grid`,
          gridTemplateColumns: `1fr`,
          gridGap: `1rem`,
        }}
      >
        {data.comments.map(({ id, comment, name, time_posted }) => (
          <Comment
            key={id}
            comment={comment}
            name={name}
            time_posted={time_posted}
          />
        ))}
      </ul>
      <CommentForm id={id} />
    </div>
  )
}

export default Comments
