import { MetadataProps, StatProps } from "../../types";

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

export async function findVideoStatByUser(
  token: string,
  userId: string,
  videoId: string
) {
  const operationsDoc = `
    query findVideoIdByUserId($userId: String!, $videoId: String!) {
      stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
        userId
        videoId
        favourited
        watched
      }
    }`;

  const response = await fetchHasuraGraphQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      userId,
      videoId,
    },
    token
  );

  return response?.data?.stats;
}

export async function insertStats(token: string, stats: StatProps) {
  const operationsDoc = `
    mutation insertStats($userId: String!, $videoId: String! $favourited: Int!, $watched: Boolean!) {
      insert_stats_one(object: {
        userId: $userId, 
        videoId: $videoId
        favourited: $favourited,                             
        watched: $watched, 
      }) {
        userId
        favourited
      }
    }`;

  return await fetchHasuraGraphQL(operationsDoc, "insertStats", stats, token);
}

export async function updateStats(token: string, stats: StatProps) {
  const operationsDoc = `
    mutation updateStats($userId: String!, $videoId: String! $favourited: Int!, $watched: Boolean!) {
      update_stats(
        _set: {favourited: $favourited, watched: $watched}, 
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }) {
        returning {
          userId,
          videoId
          favourited,
          watched,
        }
      }
    }`;

  return await fetchHasuraGraphQL(operationsDoc, "updateStats", stats, token);
}
