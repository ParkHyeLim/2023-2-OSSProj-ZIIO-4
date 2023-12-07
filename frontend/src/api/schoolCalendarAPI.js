import instance from './instance';

export const fetchProjects = async planData => {
  if (planData === '') {
    const { data } = await instance.get('/academics');
    return data;
  } else {
    const { data } = await instance.post('/scraps', planData);
    return data;
  }
};
