import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { SearchInput } from "evergreen-ui"

import Layout from "../components/layout"
import Container from "../components/container"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const recipes = (nodes) => {
    let recipes =
      nodes.length === 0
        ? data.allMarkdownRemark.edges.map((edge) => edge.node)
        : nodes

    return recipes.map((node, i) => {
      return (
        <li key={i}>
          <Link to={`/recipes/${node.slug || node.frontmatter.slug}`}>
            {node.title || node.frontmatter.title}
          </Link>
        </li>
      )
    })
  }

  const [query, setQuery] = useState(null)
  const results = useFlexSearch(
    query,
    data.localSearchRecipes.index,
    data.localSearchRecipes.store
  )

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <SearchInput
          name="query"
          width="100%"
          onChange={(e) => setQuery(e.target.value)}
        />
        <br />
        <br />
        <ol>{recipes(results)}</ol>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const indexQuery = graphql`
  {
    localSearchRecipes {
      index
      store
    }
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
