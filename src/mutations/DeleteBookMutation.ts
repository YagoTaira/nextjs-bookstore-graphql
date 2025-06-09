"use client";

import { graphql, useMutation } from "react-relay";
import { DeleteBookMutation } from "./__generated__/DeleteBookMutation.graphql";

const mutation = graphql`
  mutation DeleteBookMutation($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export function useDeleteBookMutation() {
  const [commit, isInFlight] = useMutation<DeleteBookMutation>(mutation);

  const deleteBook = (
    id: string,
    onCompleted?: () => void,
    onError?: (err: Error) => void
  ) => {
    commit({
      variables: { id },
      onCompleted: () => {
        console.log("Book deleted");
        onCompleted?.();
      },
      onError: (err) => {
        console.error("Delete error:", err);
        onError?.(err);
      },
      updater: (store) => {
        store.delete(id);
      },
    });
  };

  return { deleteBook, isInFlight };
}
