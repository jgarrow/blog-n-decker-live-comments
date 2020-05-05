import theme from "gatsby-theme-deck-n-blog/src/gatsby-plugin-theme-ui"
import { alpha } from "@theme-ui/color"
import { deep } from "@theme-ui/presets"

export default {
  ...theme,
  colors: {
    ...theme.colors,
    modes: {
      dark: {
        ...deep.colors,
        accent: `rgb(102, 153, 204)`,
      },
    },
  },
  forms: {
    input: {
      padding: `5px 10px`,
      border: (t) => `1px solid ${t.colors.muted}`,
      transition: `all 0.15s ease-in-out`,

      ":focus": {
        bg: (t) => alpha(`${t.colors.primary}`, 0.05),
        outline: `none`,
        border: (t) => `1px solid ${t.colors.primary}`,
        boxShadow: (t) => `0px 0px 0px ${t.colors.primary}`,
      },
    },
    textarea: {
      padding: `5px 10px`,
      border: (t) => `1px solid ${t.colors.muted}`,
      transition: `all 0.15s ease-in-out`,

      ":focus": {
        bg: (t) => alpha(`${t.colors.primary}`, 0.05),
        outline: `none`,
        border: (t) => `1px solid ${t.colors.primary}`,
        boxShadow: (t) => `0px 0px 0px ${t.colors.primary}`,
      },
    },
  },
  buttons: {
    primary: {
      transition: `all 0.15s ease-in-out`,
      border: `1px solid transparent`,

      ":hover": {
        cursor: `pointer`,
        bg: (t) => alpha(`${t.colors.primary}`, 0.05),
        color: (t) => `${t.colors.primary}`,
        border: (t) => `1px solid ${t.colors.primary}`,
      },
    },
  },
}
