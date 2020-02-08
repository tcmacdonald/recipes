import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Container from "../components/container"
import SEO from "../components/seo"
import '../styles/recipe.scss'

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
      <SEO title={frontmatter.title} />
      {tn && (<div className="tn-xs"><Img fluid={tn.childImageSharp.fluid} /></div>)}
      <Container>
        <div className="recipe-container">
          <div className="recipe">
            <header style={{ display: 'flex', borderBottom: '1px solid lightgray', marginBottom: '1rem' }}>
              {tn && (<div className="tn"><Img fluid={tn.childImageSharp.fluid} /></div>)}
              <div style={{ padding: tn ? '1rem' : 0 }}>
                <h1 style={{fontSize: '160%'}}>{frontmatter.title}</h1>
                {frontmatter.source_name && <p><a href={frontmatter.source_url}>{frontmatter.source_name}</a></p>}
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
      </Container>
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
            fluid(maxHeight: 300) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`