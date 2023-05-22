import {Post} from './postSlice';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchPosts = async (): Promise<NetworkResponse<Post[]>> => {
  const response = await fetch(
    'https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/posts',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok) {
    const json = await response.json();
    console.log(json);
    return {
      kind: 'success',
      body: json,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
