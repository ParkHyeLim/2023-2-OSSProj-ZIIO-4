import instance from './instance';

export const getUser = async () => {
  try {
    const response = await instance.get('/user');
    // setUser(response.data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
