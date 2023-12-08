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
  try {
    const { data } = await instance.get('/notices');
    const result = await data;
    if (result !== undefined) return result;
  } catch (error) { return "error"; }
};

export const getSearchNotice = async (id, keyword) => {
  try {
    const { data } = await instance.get(`/notices/search?category_id=${id}&keyword=${keyword !== "" ? keyword : ""}`);
    const result = await data;
    if (result !== undefined) return result;
  } catch (error) { return "error"; }
}

export const getBookmark = async () => {
  try {
    const { data } = await instance.get(`/bookmarks`);
    const result = await data;
    if (result) return result;
  } catch (error) {
    if (error.response.data === "This category is already added to the Bookmark.") return alert("즐겨찾기 목록을 불러오는데 실패했습니다. 새로고침(F5)을 눌러주세요");;
  }
}

export const addBookmark = async (id) => {
  try {
    const { data } = await instance.post(`/bookmarks`, { "category_id": id });
    const result = await data;
    if (result.message === "successfully created.") return result;
  } catch (error) {
    if (error.response.data === "This category is already added to the Bookmark.") alert("이미 등록된 카테고리입니다.");
  }
}

export const deleteBookmark = async (id) => {
  const { data } = await instance.delete(`/bookmarks`, { data: { "category_id": id } });
  try {
    const result = await data;
    if (result) return result;
  } catch (error) {
    if (error.response.status === 404) {
      alert("삭제하시려는 카테고리가 없습니다.");
      return "error";
    }
  }
}

export const getScraps = async () => {
  try {
    const { data } = await instance.get('/scraps');
    const result = await data;
    if (result) return result;
  } catch (error) {
    return alert("스크랩을 불러오는데 실패했습니다.");
  }
}

export const addScraps = async (item) => {
  try {
    const { data } = await instance.post('/scraps', item);
    const result = await data;
    if (result) return result;
  } catch (error) {
    if (error.response.status === 409) alert("이미 스크랩한 공지사항입니다.");;
  }
}

export const deleteScraps = async (item) => {
  try {
    const { data } = await instance.delete(`/scraps`, { data: item });
    const result = await data;
    if (result) return result;
  } catch (error) {
    if (error.response.status === 400) return alert("스크랩 삭제에 실패했습니다. 다시 시도해주세요.");
  }
}

export const addEventsScraps = async (item) => {
  const { data } = await instance.post(`/scraps`, item);
  try {
    const result = await data;
    if (result) return result;
  } catch (error) {
    alert("일정 등록에 실패하셨습니다. 다시 시도해주세요");
  }
}