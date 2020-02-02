import React from "react"
import { graphql } from "gatsby"

export default function Template(props) {
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  console.log(frontmatter)
  const ingredients = (frontmatter.ingredients || []).map((el,i) => {
    return (<li key={i}>{el}</li>)
  })
  return (
    <div className="recipe-container">
      <div className="recipe">
        <h1>{frontmatter.title}</h1>
        <ol>{ingredients}</ol>
        <div
          className="recipe-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        ingredients
      }
    }
  }
`