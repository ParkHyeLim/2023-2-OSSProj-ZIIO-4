import instance from './instance';

export const getMyEvents = async () => {
  try {
    const response = await instance.get('/mypages');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
