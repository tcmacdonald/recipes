import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template(props) {
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const ingredients = (frontmatter.ingredients || []).map((el,i) => {
    return (<li key={i}>{el}</li>)
  })
  return (
    <Layout>
      <SEO title="Recipe" />
      <div className="recipe-container">
        <div className="recipe">
          <h1>{frontmatter.title}</h1>
          <p><a href={frontmatter.source_url}>{frontmatter.source_url}</a></p>
          <hr />
          <ol>{ingredients}</ol>
          <hr />
          <div
            className="recipe-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        ingredients
        source_name
        source_url
      }
    }
  }
`