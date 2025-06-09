/**
 * @generated SignedSource<<baa361989863843a8bd9488e9ef805f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AddBookInput = {
  author: string;
  description?: string | null | undefined;
  imageUrl?: string | null | undefined;
  price: number;
  title: string;
};
export type AddBookMutation$variables = {
  input: AddBookInput;
};
export type AddBookMutation$data = {
  readonly addBook: {
    readonly author: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly imageUrl: string | null | undefined;
    readonly price: number;
    readonly title: string;
  };
};
export type AddBookMutation = {
  response: AddBookMutation$data;
  variables: AddBookMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Book",
    "kind": "LinkedField",
    "name": "addBook",
    "plural": false,
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
        "name": "price",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddBookMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddBookMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f568422e43272da867518cbcfbf164bd",
    "id": null,
    "metadata": {},
    "name": "AddBookMutation",
    "operationKind": "mutation",
    "text": "mutation AddBookMutation(\n  $input: AddBookInput!\n) {\n  addBook(input: $input) {\n    id\n    title\n    author\n    description\n    price\n    imageUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "5c96317718a1dedd483aa0d3fc6316a6";

export default node;
