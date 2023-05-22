import {Post} from './postSlice';
import {Comments} from './commentsSlice';
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

export const deleteServersPost = async ({
  postId,
}: {
  postId: number;
}): Promise<any> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/posts/${postId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const sendPost = async ({
  title,
  bodyText,
}: {
  title: string;
  bodyText: string;
}) => {
  var raw = JSON.stringify({
    title: title,
    body: bodyText,
  });
  const response = await fetch(
    'https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/posts/',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: raw,
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const updateServersPost = async ({
  title,
  bodyText,
  postId,
}: {
  title: string;
  bodyText: string;
  postId: number;
}): Promise<any> => {
  var raw = JSON.stringify({
    title: title,
    body: bodyText,
  });
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/posts/${postId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: raw,
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const fetchComments = async ({
  postId,
}: {
  postId: number;
}): Promise<NetworkResponse<Comments[]>> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/comments/?postId=${postId}`,
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

export const deleteServersComments = async ({
  id,
  postId,
}: {
  postId: number;
  id: number;
}): Promise<any> => {
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/comments/${id}/?postId=${postId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const sendComments = async ({
  postId,
  text,
}: {
  text: string;
  postId: number;
}) => {
  var raw = JSON.stringify({
    text: text,
    postId: postId,
  });
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/comments/?postId=${postId}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: raw,
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};

export const updateServersComments = async ({
  postId,
  text,
  id,
}: {
  text: string;
  id: number;
  postId: number;
}): Promise<any> => {
  var raw = JSON.stringify({
    text: text,
    id: id,
  });
  const response = await fetch(
    `https://my-json-server.typicode.com/ssshopyak/ssshopyak-server/comments/${id}/?postId=${postId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: raw,
    },
  );
  if (response.ok) {
    return {
      kind: 'success',
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
