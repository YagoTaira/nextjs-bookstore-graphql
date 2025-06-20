"use client";

import { graphql, useMutation } from "react-relay";
import { AddBookMutation } from "./__generated__/AddBookMutation.graphql";

export const addBookMutation = graphql`
  mutation AddBookMutation($input: AddBookInput!) {
    addBook(input: $input) {
      id
      title
      author
      description
      price
      imageUrl
    }
  }
`;

export function useAddBookMutation() {
  const [commit, isInFlight] = useMutation<AddBookMutation>(addBookMutation);

  const addBook = (
    input: {
      title: string;
      author: string;
      description?: string;
      price: number;
    },
    onCompleted?: () => void,
    onError?: (err: Error) => void
  ) => {
    commit({
      variables: { input },
      onCompleted: () => {
        //console.log("Book added!", data);
        onCompleted?.();
      },
      onError: (err) => {
        //console.error(err);
        onError?.(err);
      },
    });
  };

  return { addBook, isInFlight };
}
