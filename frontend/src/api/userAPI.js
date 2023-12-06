import instance from './instance';

export const getUser = async () => {
  try {
    const response = await instance.get('/user');
    // setUser(response.data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const getNotice = async () => {
  const response = await instance.get('/notices');
  const isToken = localStorage.getItem("ziio-token");
  if (isToken) {
    const getBookmarkList = await instance.get('/bookmarks');
    const getScrapsList = await instance.get('/scraps');
    return { ...response.data, bookmarks: getBookmarkList.data, scraps: getScrapsList.data };
  }
  return response.data;
};

export const getSearchNotice = async (id, keyword) => {
  try {
    const { data } = await instance.get(`/notices/search?category_id=${id}&keyword=${keyword !== "" ? keyword : ""}`);
    const result = await data;
    if (result !== undefined) return result;
  } catch (error) { return "error"; }
}

export const addBookmark = async (id) => {
  try {
    const { data } = await instance.post(`/bookmarks`, { "category_id": id });
    const result = await data;
    if (result.message === "successfully created.") return result;
  } catch (error) {
    if (error.response.data === "This category is already added to the Bookmark.") return "fail";
  }
}

export const deleteBookmark = async (id) => {
  const { data } = await instance.delete(`/bookmarks`, { data: { "category_id": id } });
  try {
    const result = await data;
    if (result.message === "successfully removed.") return id;
    console.log(result);
  } catch (error) {
    if (error.response.data === "This category does not exist in the Bookmark.") return "fail";
  }
}

export const getScraps = async () => {
  const { data } = await instance.get('/scraps');
  try {
    const result = await data;
    if (result) return result;
  } catch (error) {
    return "error";
  }
}

export const addScraps = async (item) => {
  try {
    const { data } = await instance.post('/scraps', item);
    const result = await data;
    if (result) return "success";
  } catch (error) {
    if (error.response.status === 409) alert("이미 스크랩한 공지사항입니다.");;
  }
}

export const deleteScraps = async (item) => {
  try {
    const { data } = await instance.delete(`/scraps`, { data: item });
    const result = await data;
    if (result.message === "successfully removed.") return "success";
    else console.log(result);
  } catch (error) {
    if (error.response.status === 400) return "fail";
  }
}

export const addEventsScraps = async (item) => {
  const { data } = await instance.post(`/scraps`, item);
  try {
    const result = await data;
    if (result.message === "successfully remove") return "success";
    else console.log(result);
  } catch (error) {
    return "error";
  }
}
