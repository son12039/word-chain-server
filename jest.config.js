module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // .js와 .jsx 파일을 Babel로 변환
  },
  testEnvironment: "node", // 테스트 환경 설정 (필요 시)
};
