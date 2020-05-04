/** @jsx jsx */
import { jsx } from "theme-ui"
import gql from "graphql-tag"
import { Input, Label, Textarea, Button } from "@theme-ui/components"
import { Formik, Form } from "formik"
import { useMutation } from "react-apollo-hooks"

const ADD_COMMENT = gql`
  mutation addComment($name: String!, $comment: String!, $post_id: uuid!) {
    insert_comments(
      objects: { name: $name, comment: $comment, post_id: $post_id }
    ) {
      returning {
        id
      }
    }
  }
`

const CommentForm = ({ id }) => {
  const [addComment] = useMutation(ADD_COMMENT)
  const initialValues = {
    name: "",
    comment: "",
  }

  const handleSubmit = (values, { resetForm }) => {
    addComment({
      variables: {
        name: values.name,
        comment: values.comment,
        post_id: id,
      },
    })

    resetForm({})
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            mb={3}
          />
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            name="comment"
            value={values.comment}
            onChange={handleChange}
            mb={3}
            rows={5}
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
  return (
    <div>I might be a form some day</div>
    // <Box as="form">
    //   <Label htmlFor="name">Name</Label>
    //   <Input id="name" />
    // </Box>
  )
}

export default CommentForm
