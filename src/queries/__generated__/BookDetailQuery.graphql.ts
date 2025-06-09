/**
 * @generated SignedSource<<36b03241e049e54e923e189ccbf65527>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type BookDetailQuery$variables = {
  id: string;
};
export type BookDetailQuery$data = {
  readonly book:
    | {
        _id: any;
        readonly author: string;
        readonly description: string | null | undefined;
        readonly id: string;
        readonly imageUrl: string | null | undefined;
        readonly price: number;
        readonly title: string;
      }
    | null
    | undefined;
};
export type BookDetailQuery = {
  response: BookDetailQuery$data;
  variables: BookDetailQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "id",
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: "Variable",
            name: "id",
            variableName: "id",
          },
        ],
        concreteType: "Book",
        kind: "LinkedField",
        name: "book",
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "id",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "title",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "author",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "description",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "price",
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: "ScalarField",
            name: "imageUrl",
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "BookDetailQuery",
      selections: v1 /*: any*/,
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "BookDetailQuery",
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: "f945f93932a82620b598bd76d08decda",
      id: null,
      metadata: {},
      name: "BookDetailQuery",
      operationKind: "query",
      text: "query BookDetailQuery(\n  $id: ID!\n) {\n  book(id: $id) {\n    id\n    title\n    author\n    description\n    price\n    imageUrl\n  }\n}\n",
    },
  };
})();

(node as any).hash = "a47423822a6e0a1b95a77a66515f6b53";

export default node;
