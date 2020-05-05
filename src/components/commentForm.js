/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { alpha, darken } from "@theme-ui/color"
import gql from "graphql-tag"
import { Input, Label, Textarea, Button } from "@theme-ui/components"

import { Formik, Form } from "formik"
import * as Yup from "yup"
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

const CommentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "**Too Short!")
    .max(50, "**Too Long!")
    .required("**Name is required"),
  comment: Yup.string()
    .min(1, "**Too Short!")
    .max(400, "**Comments must be 400 characters or less")
    .required("**Comment is required"),
})

const CommentForm = ({ id }) => {
  const [colorMode] = useColorMode()

  const darkModeForm = {
    border: (t) => `1px solid ${t.colors.highlight}`,

    ":focus": {
      bg: (t) => alpha(`${t.colors.primary}`, 0.1),
    },
  }

  const darkModeButton = {
    ":hover": {
      bg: (t) => darken(`${t.colors.primary}`, 0.05),
      color: (t) => `${t.colors.text}`,
    },
  }

  const darkModeError = { color: (t) => `${t.colors.secondary}` }

  const lightModeError = { color: `#B33A3A` }

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
    <Formik
      initialValues={initialValues}
      validationSchema={CommentSchema}
      onSubmit={handleSubmit}
    >
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
            sx={colorMode === "dark" ? darkModeForm : null}
          />
          {errors.name && touched.name ? (
            <p sx={colorMode === "dark" ? darkModeError : lightModeError}>
              {errors.name}
            </p>
          ) : null}
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            name="comment"
            value={values.comment}
            onChange={handleChange}
            mb={3}
            rows={5}
            sx={colorMode === "dark" ? darkModeForm : null}
          />
          {errors.comment && touched.comment ? (
            <p sx={colorMode === "dark" ? darkModeError : lightModeError}>
              {errors.comment}
            </p>
          ) : null}
          <Button
            type="submit"
            sx={colorMode === "dark" ? darkModeButton : null}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CommentForm
