# Blog 'n' Decker with live comments

## Description

This site was built using [my fork](https://github.com/jgarrow/gatsby-theme-deck-n-blog) of [Rodrigo Pombo's `gatsby-theme-deck-n-blog`](https://github.com/pomber/gatsby-theme-deck-n-blog). You write 1 `.mdx` file and it creates a slide deck and a blog post.

To add the live comments, I adapted Jason Lengstorf's method from his [tutorial](https://www.youtube.com/watch?v=HTEGGndT3zY&t=0s&list=PLz8Iz-Fnk_eTpvd49Sa77NiF8Uqq5Iykx&index=2) with Vladimir Novick. I used Hasura, deployed with Heroku, as a database for the comments. Then I used Apollo to hook into the database with mutations and subscriptions to allow users to create a new comment and have it automatically populate on the page.

## Using this project

1. Clone this repo

2. Run `npm install` to install the dependencies

3. Create your own instace of a Hasura database for your comments.

4. Update the Heroku app name for the `HttpLink` and `SubscriptionClient` in `./src/utils/apollo.js`.

5. Create a `public` role for your comments table in your Hasura database that has all column permissions for inserting and selecting from your comments table.

6. Update the author and site description in `./src/components/bio-content.js`, as well as the `siteMetadata` in the `gatsby-config.js` file.

7. Change the theme by updating `./src/gatsby-plugin-theme-ui/index.js`. Be aware that `./src/components/comment.js` and `./src/components/commentForm.js` have custom styling to accommodate for light vs dark mode, so you might have to update the CSS-in-JS found in those files.

8. Create an `.mdx` deck in `./decks` with the following format:

```
---
title: The Title
date: 1986-02-20
---

import { Intro, Content, Zoom } from "gatsby-theme-deck-n-blog"

<Intro>

This will only appear in the blog post as an intro an as the excerpt.

</Intro>

# Slide 1

<Content>

This will appear in the blog post together with the slide 1

</Content>

---

# Slide 2

<Zoom value={1.2}/>

<Content>

This will appear in the blog post together with the slide 2

The Zoom value determines how "zoomed in" this slide will be on the blog post page. The default value is 1.

</Content>
```

The name of the `.mdx` file is used to create the slug for the blog post. For example, if I name my file `life-the-universe.mdx`, the url for the blog post will be `myblog.com/posts/life-the-universe`.

Per [`mdx-deck`](https://github.com/jxnblk/mdx-deck), whitespace is CRUCIAL for the slides and blog post to get created correctly. Follow the format of the whitespace in the above example. Each slide is separated by `---`.

At the top of the file, the blog post frontmatter is contained within `---`, but without extra whitespace around them. The title here determines how the name of the blog post appears both on the blog posts home page and as the title on the actual blog post page itself.

The `Intro` and `Content` components' content will only appear in the blog post, but not in the actual slide deck. Anything outside of `Intro` and `Content` will show up on the slides.

The value given to `Zoom` determines how "zoomed in" that slide is on the blog post, with a default value of 1. This is handy if you have larger chunks of text on a slide that overflow in the smaller version of the slide deck embedded in the blog post. `Zoom` only affects the slide that it is in, so you can have different `Zoom` values for each slide.

\**Note: there must be at least 2 `.mdx` decks in order for the site to compile

See the [MDX Deck docs](https://github.com/jxnblk/mdx-deck) to see what other options and components are available.
