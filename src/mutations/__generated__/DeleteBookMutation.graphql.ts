/**
 * @generated SignedSource<<63749260d38e494565c7aa3c49df9733>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteBookMutation$variables = {
  id: string;
};
export type DeleteBookMutation$data = {
  readonly deleteBook: {
    readonly id: string;
  };
};
export type DeleteBookMutation = {
  response: DeleteBookMutation$data;
  variables: DeleteBookMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Book",
    "kind": "LinkedField",
    "name": "deleteBook",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "DeleteBookMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteBookMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "912081c3a2d85db41079b30e77dedf24",
    "id": null,
    "metadata": {},
    "name": "DeleteBookMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteBookMutation(\n  $id: ID!\n) {\n  deleteBook(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c569c992b330d6efe578ad4b98d5bff0";

export default node;
