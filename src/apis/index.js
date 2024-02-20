import axiosIntansce from '../axios.js';

export const signUpAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/signup',
    method: 'post',
    data
  });
  return response.data;
};

export const signInAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/signin',
    method: 'post',
    data
  });
  return response.data;
};
export const signInGoogle = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/google',
    method: 'post',
    data
  });
  return response.data;
}
export const updateProfileAPI = async (data, userId) => {
  const response = await axiosIntansce({
    url: `/user/update/${userId}`,
    method: 'put',
    data
  })
  return response.data;
}
export const signOutAPI = async () => {
  const response = await axiosIntansce({
    url: `/auth/signout`,
    methor: 'get'
  })
  return response.data;
}
export const createPostAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/post/create-post',
    method: 'post',
    data
  })
  return response.data;
}