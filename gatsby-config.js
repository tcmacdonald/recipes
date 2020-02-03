module.exports = {
  siteMetadata: {
    title: `Recipes`,
    description: `What's for dinner tonight?`,
    author: `@tcmacdonald`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `recipes`,
        path: `${__dirname}/src/recipes`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `recipes.macd.us.com`,
        short_name: `recipes`,
        start_url: `/`,
        background_color: `#FF9966`,
        theme_color: `#FF9966`,
        display: `minimal-ui`,
        icon: `src/images/food-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
