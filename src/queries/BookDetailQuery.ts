import { graphql } from "react-relay";

export const bookDetailQuery = graphql`
  query BookDetailQuery($id: ID!) {
    book(id: $id) {
      id
      title
      author
      description
      price
      imageUrl
    }
  }
`;
