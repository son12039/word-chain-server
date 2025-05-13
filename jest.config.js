export default {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Babel을 사용하여 .js, .jsx, .ts, .tsx 파일 변환
  },
  testEnvironment: "node", // 테스트 환경을 Node.js로 설정
};
