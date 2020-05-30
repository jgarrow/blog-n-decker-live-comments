/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui"

const Comment = ({ comment, name, time_posted }) => {
  const [colorMode] = useColorMode()

  const lightModeComment = {
    padding: `10px 25px`,
    listStyle: `none`,
    borderRadius: `12px`,
    boxShadow: (t) => `0px 2px 4px ${t.colors.muted}`,
  }

  const lightModeTimeStamp = {
    justifySelf: `flex-end`,
    color: (t) => t.colors.muted,
    textShadow: (t) => `0px 0px 1px ${t.colors.muted}`,
  }

  const darkModeComment = {
    padding: `10px 25px`,
    listStyle: `none`,
    borderRadius: `12px`,
    background: `rgba(0, 0, 0, 0.2)`,
  }

  const darkModeTimeStamp = {
    justifySelf: `flex-end`,
    color: (t) => t.colors.primary,
  }

  // today's date is for the comment time stamp text
  const today = Date.now()
  const todayDateObj = new Date(today)
  const todayDay = todayDateObj.getDate()
  const todayTime = todayDateObj.getTime()

  const timePostedDate = new Date(time_posted)

  const timeDay = timePostedDate.getDate()
  const timeMonth = timePostedDate.getMonth() + 1 // January starts at 0
  const timeYear = timePostedDate.getFullYear()
  const timeTime = timePostedDate.getTime()

  let timeLabel = "" // nothing if date, 'min ago' if minutes, 'hr ago' if hours
  let time = `${timeMonth}/${timeDay}/${timeYear}`

  if (timeDay === todayDay) {
    time = Math.round((todayTime - timeTime) / (1000 * 60)) // minutes, rounded to whole number
    timeLabel = " min ago"

    if (time > 60) {
      time = Math.round(time / 60) // hours, rounded to whole number
      timeLabel = " hr ago"
    }
  }

  const timeOutput = `${time}${timeLabel}`

  return (
    <li sx={colorMode === "dark" ? darkModeComment : lightModeComment}>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `1fr 1fr`,
          gridGap: `10px`,
          alignItems: `center`,
        }}
      >
        <p
          sx={{
            fontWeight: `600`,
          }}
        >
          {name}
        </p>
        <p sx={colorMode === "dark" ? darkModeTimeStamp : lightModeTimeStamp}>
          {timeOutput}
        </p>
      </div>
      <p
        sx={{
          boxSizing: `border-box`,
          width: `100%`,
          paddingLeft: `15px`,
        }}
      >
        {comment}
      </p>
    </li>
  )
}

export default Comment
