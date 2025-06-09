import { graphql } from "react-relay";

export const bookListQuery = graphql`
  query BookListQuery {
    books {
      id
      title
      author
      description
      imageUrl
    }
  }
`;
