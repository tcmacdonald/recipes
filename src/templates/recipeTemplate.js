import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template(props) {
  const { markdownRemark, allFile } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const ingredients = (frontmatter.ingredients || []).map((el,i) => {
    return (<li key={i}>{el}</li>)
  })

  const getImage = (tn) => {
    const matches = allFile.edges.map(edge => edge.node).filter(file => {
      return file.base === tn
    })
    return matches[0]
  }

  const tn = getImage(frontmatter.thumbnail)

  return (
    <Layout>
      <SEO title="Recipe" />
      <div className="recipe-container">
        <div className="recipe">
          <header style={{ display: 'flex', borderBottom: '1px solid lightgray', paddingBottom: '1rem', marginBottom: '1rem' }}>
            {tn && (<Img fixed={tn.childImageSharp.fixed} />)}
            <div style={{ padding: '1rem' }}>
              <h1>{frontmatter.title}</h1>
              <p><a href={frontmatter.source_url}>{frontmatter.source_url}</a></p>
            </div>
          </header>
          <ul>{ingredients}</ul>
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
        thumbnail
        source_name
        source_url
      }
    }
    allFile(filter: { extension: { regex: "/(jpeg|jpg|gif|png)/" }, sourceInstanceName: { eq: "images"}}) {
      edges {
        node {
          base
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`