/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Fragment } from "react"

export default () => (
  <Fragment>
    <p sx={{ margin: `0` }}>
      Written by{" "}
      <Styled.a href="https://janessagarrow.com/" target="_blank">
        Janessa Garrow
      </Styled.a>
    </p>
    <p sx={{ margin: `0` }}>Presentation Slides &amp; Summaries</p>
  </Fragment>
)
