import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default class index extends Component {
  recipes() {
    return this.props.data.allMarkdownRemark.edges.map(edge => edge.node).map((node,i) => {
      return (
        <li key={i}>
          <Link to={`/recipes/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
        </li>
      )
    })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <ol>{this.recipes()}</ol>
      </Layout>
    );
  }
}

export const indexQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            thumbnail
            source_name
            source_url
          }
        }
      }
    }
  }
`