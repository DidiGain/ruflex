import { MetadataProps } from "../../types";

async function fetchHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: {},
  token: string
) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env
          .NEXT_PUBLIC_HASURA_ADMIN_KEY as string,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );

  return await result.json();
}

export function fetchUsers(token: string) {
  const operationsDoc = `
    query GetUsers {
      users {
        id
        email
        issuer
        publicAddress
      }
    }
  `;
  return fetchHasuraGraphQL(operationsDoc, "GetUsers", {}, token);
}

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;

  const response = await fetchHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  );

  return !response?.data?.users[0];
}

export async function createNewUser(token: string, metadata: MetadataProps) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {issuer: $issuer, email: $email, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const response = await fetchHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    metadata,
    token
  );

  return response;
}
