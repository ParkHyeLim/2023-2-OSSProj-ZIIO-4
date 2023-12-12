import instance from './instance';

export const getAcademics = async () => {
  try {
    const { data } = await instance.get('/academics');
    const result = await data;
    if (result !== undefined) return result;
  } catch (error) { return "error"; }
};

export const addEventAcademics = async (item) => {
  try {
    const { data } = await instance.post('/scraps', item);
    const result = await data;
    console.log("뭐가 문제야", result)
    if (result !== undefined) {
      return result;
    }
  } catch (error) {
    
    console.log("뭐가 문제야", error)
    if (error.response.data === 'This academic is already added to the MyPage') alert('해당 학사일정이 이미 내 일정에 저장되어 있습니다.');
  }
}

