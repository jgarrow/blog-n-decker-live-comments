/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"
import { alpha, darken } from "@theme-ui/color"
import gql from "graphql-tag"
import { Input, Label, Textarea, Button } from "@theme-ui/components"
import ReCAPTCHA from "react-google-recaptcha"
import { createRef, useState, useEffect } from "react"

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
  const [recaptchaState, setRecaptchaState] = useState({
    callback: "not fired",
    value: null,
    expired: false,
    isChecked: false,
  })
  const recaptchaRef = createRef(null)
  const [colorMode] = useColorMode()

  const darkModeForm = {
    border: (t) => `1px solid ${t.colors.highlight}`,

    ":focus": {
      bg: (t) => alpha(`${t.colors.primary}`, 0.1),
    },
  }

  const darkModeButton = {
    bg: !recaptchaState.isChecked
      ? `rgba(0, 0, 0, 0.2)`
      : (t) => `${t.colors.primary}`,
    color: !recaptchaState.isChecked
      ? `rgba(82, 82, 82, 1)`
      : (t) => `${t.colors.text}`,

    ":hover": {
      bg: !recaptchaState.isChecked
        ? `rgba(0, 0, 0, 0.2)`
        : (t) => darken(`${t.colors.primary}`, 0.05),
      color: !recaptchaState.isChecked
        ? `rgba(82, 82, 82, 1)`
        : (t) => `${t.colors.text}`,
      border: !recaptchaState.isChecked
        ? `1px solid rgba(0, 0, 0, 0.2)`
        : (t) => `1px solid ${t.colors.primary}`,
    },
  }

  const lightModeButton = {
    bg: !recaptchaState.isChecked
      ? `rgba(102, 51, 153, 0.25)`
      : (t) => `${t.colors.primary}`,

    ":hover": {
      bg: !recaptchaState.isChecked
        ? `rgba(102, 51, 153, 0.25)`
        : (t) => alpha(`${t.colors.primary}`, 0.05),
      color: !recaptchaState.isChecked
        ? (t) => `${t.colors.background}`
        : (t) => `${t.colors.primary}`,
      border: !recaptchaState.isChecked
        ? `1px solid transparent`
        : (t) => `1px solid ${t.colors.primary}`,
    },
  }

  const darkModeError = { color: (t) => `${t.colors.secondary}` }

  const lightModeError = { color: `#B33A3A` }

  const [addComment] = useMutation(ADD_COMMENT)
  const initialValues = {
    name: "",
    comment: "",
  }

  const asyncScriptOnLoad = () => {
    setRecaptchaState({ ...recaptchaState, callback: "called!" })
  }

  const handleRecaptchaChange = (recaptchaValue) => {
    let isExpired = false
    let checked = false
    if (recaptchaValue === null) {
      isExpired = true
    } else {
      checked = true
    }

    setRecaptchaState({
      ...recaptchaState,
      value: recaptchaValue,
      expired: isExpired,
      isChecked: checked,
    })
  }

  const handleSubmit = (values, { resetForm }) => {
    let recaptchaValue
    let errorIsDisplayed

    if (recaptchaRef.current) {
      recaptchaValue = recaptchaRef.current.getValue()

      if (recaptchaValue !== "") {
        errorIsDisplayed = false

        addComment({
          variables: {
            name: values.name,
            comment: values.comment,
            post_id: id,
          },
        })

        resetForm({})
      } else {
        errorIsDisplayed = true
      }
    }

    setRecaptchaState({ ...recaptchaState, isChecked: errorIsDisplayed })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CommentSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form
          sx={{
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `space-evenly`,
          }}
        >
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
          <ReCAPTCHA
            style={{ display: "inline-block" }}
            ref={recaptchaRef}
            sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            asyncScriptOnLoad={asyncScriptOnLoad}
            sx={{
              alignSelf: `flex-start`,
              marginBottom: `28px`,
            }}
          />
          <Button
            disabled={!recaptchaState.isChecked}
            type="submit"
            sx={colorMode === "dark" ? darkModeButton : lightModeButton}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CommentForm
