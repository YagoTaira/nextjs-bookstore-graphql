/**
 * @generated SignedSource<<d2f3c3dfd68566324dea2f0861aa9c36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type BookListQuery$variables = Record<PropertyKey, never>;
export type BookListQuery$data = {
  readonly books: ReadonlyArray<{
    readonly author: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly title: string;
  }>;
};
export type BookListQuery = {
  response: BookListQuery$data;
  variables: BookListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Book",
    "kind": "LinkedField",
    "name": "books",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "author",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "imageUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BookListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BookListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "4f8c5005bfb074b6b00b72ef6ceb99e8",
    "id": null,
    "metadata": {},
    "name": "BookListQuery",
    "operationKind": "query",
    "text": "query BookListQuery {\n  books {\n    id\n    title\n    author\n    description\n    imageUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "e3058e92dbddd2c6813b8042b18ee4e3";

export default node;
