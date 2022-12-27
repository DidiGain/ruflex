import { MetadataProps } from "../../types";

async function fetchHasuraGraphQL(
  operationsDoc: string,
  operationName: string,
  variables: Record<string, any>,
  token: string
) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: { issuer: { _eg: $issuer }}) {
      id, email, issuer
    }
  }
  `;

  const response = await fetchHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
}

export async function createNewUser(token: string, metadata: MetadataProps) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String, $publicAddress: String!) {
    insert_users(objects: {issuer: $issuer, email: $email, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress } = metadata;

  const response = await fetchHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );

  return response;
}
