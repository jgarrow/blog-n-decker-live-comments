/** @jsx jsx */
import { jsx } from "theme-ui"

const Comment = ({ comment, name, time_posted }) => {
  // TODO: Add '1hr ago' feature -- needs more logic to show that instead of date if day is same as today

  const timePostedDate = new Date(time_posted)

  const timeDay = timePostedDate.getDate()
  const timeMonth = timePostedDate.getMonth()
  const timeYear = timePostedDate.getFullYear()

  const time = `${timeDay}/${timeMonth}/${timeYear}`

  return (
    <li
      sx={{
        padding: `10px 20px`,
        listStyle: `none`,
        borderRadius: `12px`,
        boxShadow: (t) => `0px 3px 9px ${t.colors.muted}`,
      }}
    >
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `1fr 1fr`,
          gridGap: `10px`,
          alignItems: `center`,
        }}
      >
        <p>{name}</p>
        <small
          sx={{
            justifySelf: `flex-end`,
          }}
        >
          {time}
        </small>
      </div>
      <p>{comment}</p>
    </li>
  )
}

export default Comment
