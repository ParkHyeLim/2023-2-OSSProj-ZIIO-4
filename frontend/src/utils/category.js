// 카테고리 구조
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
        category3: [],
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
        category3: ['미술학부', '연국학부', '스포츠문화학과', '한국음악'],
      },
    ],
  },
  {
    category1: '기타',
    category2: [
      {
        category2: 'IT융합교육센터',
        category3: [],
      },
      {
        category2: '고양캠퍼스 미래융합교육원',
        category3: [],
      },
    ],
  },
];

export default categories;

export const categoryList = [
  {
    name: "일반공지",
    categoryList: ["메인", "일반공지", ""]
  },
  {
    name: "학사공지",
    categoryList: ["메인", "학사공지", ""]
  },
  {
    name: "장학공지",
    categoryList: ["메인", "장학공지", ""]
  },
  {
    name: "불교대학",
    categoryList: ["단과대", "불교대학", ""]
  },
  {
    name: "문화재학과",
    categoryList: ["단과대", "불교대학", "문화재학과"]
  },
  {
    name: "문과대학",
    categoryList: ["단과대", "문과대학", ""]
  },
  {
    name: "철학과",
    categoryList: ["단과대", "문과대학", "철학과"]
  },
  {
    name: "사학과",
    categoryList: ["단과대", "문과대학", "사학과"]
  },
  {
    name: "일본학과",
    categoryList: ["단과대", "문과대학", "일본학과"]
  },
  {
    name: "중어중문학과",
    categoryList: ["단과대", "문과대학", "중어중문학과"]
  },
  {
    name: "영어영문학부",
    categoryList: ["단과대", "문과대학", "영어영문학부"]
  },
  {
    name: "국어국문문예창작학부",
    categoryList: ["단과대", "문과대학", "국어국문문예창작학부"]
  },
  {
    name: "이과대학",
    categoryList: ["단과대", "이과대학", ""]
  },
  {
    name: "수학과",
    categoryList: ["단과대", "이과대학", "수학과"]
  },
  {
    name: "화학과",
    categoryList: ["단과대", "이과대학", "화학과"]
  },
  {
    name: "통계학과",
    categoryList: ["단과대", "이과대학", "통계학과"]
  },
  {
    name: "물리반도체과학부",
    categoryList: ["단과대", "이과대학", "물리반도체과학부"]
  },
  {
    name: "법과대학",
    categoryList: ["단과대", "법과대학", ""]
  },
  {
    name: "사회과학대학",
    categoryList: ["단과대", "사회과학대학", ""]
  },
  {
    name: "정치행정학부 정치외교학전공",
    categoryList: ["단과대", "사회과학대학", "정치행정학부 정치외교학전공"]
  },
  {
    name: "정치행정학부 행정학전공",
    categoryList: ["단과대", "사회과학대학", "정치행정학부 행정학전공"]
  },
  {
    name: "정치행정학부 북한학전공",
    categoryList: ["단과대", "사회과학대학", "정치행정학부 북한학전공"]
  },
  {
    name: "경제학과",
    categoryList: ["단과대", "사회과학대학", "경제학과"]
  },
  {
    name: "국제통상학과",
    categoryList: ["단과대", "사회과학대학", "국제통상학과"]
  },
  {
    name: "사회언론정보학부 사회학전공",
    categoryList: ["단과대", "사회과학대학", "사회언론정보학부 사회학전공"]
  },
  {
    name: "사회언론정보학부 미디어커뮤니케이션학전공",
    categoryList: ["단과대", "사회과학대학", "사회언론정보학부 미디어커뮤니케이션학전공"]
  },
  {
    name: "식품산업관리학과",
    categoryList: ["단과대", "사회과학대학", "식품산업관리학과"]
  },
  {
    name: "사회복지학과",
    categoryList: ["단과대", "사회과학대학", "사회복지학과"]
  },
  {
    name: "경영대학",
    categoryList: ["단과대", "경영대학", ""]
  },
  {
    name: "경영학과",
    categoryList: ["단과대", "경영대학", "경영학과"]
  },
  {
    name: "경영정보학과",
    categoryList: ["단과대", "경영대학", "경영정보학과"]
  },
  {
    name: "회계학과",
    categoryList: ["단과대", "경영대학", "회계학과"]
  },
  {
    name: "경찰사법대학",
    categoryList: ["단과대", "경찰사법대학", ""]
  },
  {
    name: "경찰행정학부",
    categoryList: ["단과대", "경찰사법대학", "경찰행정학부"]
  },
  {
    name: "바이오시스템대학",
    categoryList: ["단과대", "바이오시스템대학", ""]
  },
  {
    name: "바이오환경과학과",
    categoryList: ["단과대", "바이오시스템대학", "바이오환경과학과"]
  },
  {
    name: "생명과학과",
    categoryList: ["단과대", "바이오시스템대학", "생명과학과"]
  },
  {
    name: "식품생명공학과",
    categoryList: ["단과대", "바이오시스템대학", "식품생명공학과"]
  },
  {
    name: "의생명공학과",
    categoryList: ["단과대", "바이오시스템대학", "의생명공학과"]
  },
  {
    name: "AI융합대학",
    categoryList: ["단과대", "AI융합대학", ""]
  },
  {
    name: "공과대학",
    categoryList: ["단과대", "공과대학", ""]
  },
  {
    name: "전자전기공학부",
    categoryList: ["단과대", "공과대학", "전자전기공학부"]
  },
  {
    name: "정보통신공학과",
    categoryList: ["단과대", "공과대학", "정보통신공학과"]
  },
  {
    name: "건설환경공학과",
    categoryList: ["단과대", "공과대학", "건설환경공학과"]
  },
  {
    name: "화공생물공학과",
    categoryList: ["단과대", "공과대학", "화공생물공학과"]
  },
  {
    name: "기계로봇에너지공학과",
    categoryList: ["단과대", "공과대학", "기계로봇에너지공학과"]
  },
  {
    name: "건축공학부",
    categoryList: ["단과대", "공과대학", "건축공학부"]
  },
  {
    name: "산업시스템공학과",
    categoryList: ["단과대", "공과대학", "산업시스템공학과"]
  },
  {
    name: "융합에너지신소재공학과",
    categoryList: ["단과대", "공과대학", "융합에너지신소재공학과"]
  },
  {
    name: "사범대학",
    categoryList: ["단과대", "사범대학", ""]
  },
  {
    name: "교육학과",
    categoryList: ["단과대", "사범대학", "교육학과"]
  },
  {
    name: "국어교육과",
    categoryList: ["단과대", "사범대학", "국어교육과"]
  },
  {
    name: "역사교육과",
    categoryList: ["단과대", "사범대학", "역사교육과"]
  },
  {
    name: "지리교육과",
    categoryList: ["단과대", "사범대학", "지리교육과"]
  },
  {
    name: "수학교육과",
    categoryList: ["단과대", "사범대학", "수학교육과"]
  },
  {
    name: "가정교육과",
    categoryList: ["단과대", "사범대학", "가정교육과"]
  },
  {
    name: "체육교육과",
    categoryList: ["단과대", "사범대학", "체육교육과"]
  },
  {
    name: "약학대학",
    categoryList: ["단과대", "약학대학", ""]
  },
  {
    name: "미래융합대학",
    categoryList: ["단과대", "미래융합대학", ""]
  },
  {
    name: "다르마칼리지",
    categoryList: ["단과대", "다르마칼리지", ""]
  },
  {
    name: "예술대학",
    categoryList: ["단과대", "예술대학", ""]
  },
  {
    name: "미술학부",
    categoryList: ["단과대", "예술대학", "미술학부"]
  },
  {
    name: "연극학부",
    categoryList: ["단과대", "예술대학", "연극학부"]
  },
  {
    name: "한국음악과",
    categoryList: ["단과대", "예술대학", "한국음악과"]
  },
  {
    name: "IT융합교육센터",
    categoryList: ["기타", "IT융합교육센터", ""]
  },
  {
    name: "고양캠퍼스 미래융합교육원",
    categoryList: ["기타", "고양캠퍼스 미래융합교육원", ""]
  },
  {
    name: "미래융합교육원",
    categoryList: ["기타", "미래융합교육원", ""]
  },
];
