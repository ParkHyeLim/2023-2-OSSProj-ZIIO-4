const categories = [
  {
    category1: '메인',
    category2: [
      {
        category2: '일반공지',
        category3: [],
      },
      {
        category2: '학사공지',
        category3: [],
      },
      {
        category2: '장학공지',
        category3: [],
      },
      {
        category2: '학술공지',
        category3: [],
      },
    ],
  },
  {
    category1: '단과대',
    category2: [
      {
        category2: '불교대학',
        category3: ['문화재학과'],
      },
      {
        category2: '문과대학',
        category3: ['국어국문문예창작학부', '영어영문학부', '일본학과', '중어중문학과', '철학과', '사학과'],
      },
      {
        category2: '이과대학',
        category3: ['수학과', '화학과', '통계학과', '물리반도체과학부'],
      },
      {
        category2: '법과대학',
        category3: ['법학과'],
      },
      {
        category2: '사회과학대학',
        category3: [
          '정치행정학부 정치외교학전공',
          '정치행정학부 행정학전공',
          '정치행정학부 북한학전공',
          '경제학과',
          '국제통상학과',
          '사회언론정보학과 사회학전공',
          '사회언론정보학부 미디어커뮤니케이션학전공',
          '식품산업관리학과',
          '광고홍보학과',
          '사회복지학과',
        ],
      },
      {
        category2: '경영대학',
        category3: ['경영학과', '경영정보학과', '회계학과'],
      },
      {
        category2: '경찰사법대학',
        category3: ['경찰행정학부'],
      },
      {
        category2: '바이오시스템대학',
        category3: ['바이오환경과학과', '생명과학과', '식품생명공학과', '의생명공학과'],
      },
      {
        category2: 'AI융합대학',
        category3: [],
      },
      {
        category2: '공과대학',
        category3: [
          '전자전기공학부',
          '정보통신공학과',
          '건설환경공학과',
          '화공생물공학과',
          '기계로봇에너지공학과',
          '건축공학부',
          '산업시스템공학과',
          '융합에너지신소재공학과',
        ],
      },
      {
        category2: '사범대학',
        category3: ['교육학과', '국어교육과', '역사교육과', '지리교육과', '수학교육과', '가정교육과', '체육교육과'],
      },
      {
        category2: '약학대학',
        category3: [],
      },
      {
        category2: '미래융합대학',
        category3: [],
      },
      {
        category2: '다르마칼리지',
        category3: [],
      },
      {
        category2: '예술대학',
        category3: ['미술학부', '연국학부', '영화영상학과', '스포츠문화학과', '한국음악'],
      },
    ],
  },
  {
    category1: '기타',
    category2: [
      {
        category2: '동국대학교 IT융합교육센터',
        category3: [],
      },
      {
        category2: '동국대학교 고양캠퍼스 미래융합교육원',
        category3: [],
      },
      {
        category2: '동국대학교 미래융합교육원',
        category3: [],
      },
    ],
  },
];

export default categories;

const categories_id = [
  { category_name: '일반공지', category_id: '100100000' },
  { category_name: '학사공지', category_id: '100200000' },
  { category_name: '학술공지', category_id: '100400000' },
  { category_name: '불교학부', category_id: '200100101' },
];

export { categories_id };
