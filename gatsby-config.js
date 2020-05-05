module.exports = {
  siteMetadata: {
    title: `Blog 'n' Decker`,
    author: `Janessa Garrow`,
    description: `Blog posts to accompany slides used for lessons and presentations`,
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/janessagarrow`,
      },
      {
        name: `github`,
        url: `https://github.com/jgarrow`,
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-theme-deck-n-blog",
      options: {
        contentPath: "decks",
        blogBasePath: "/posts", // needs to have the forward slash to avoid gatsby Link error message
        decksBasePath: "/slides", // needs to have forward slash to properly create and update url
      },
    },
  ],
}
