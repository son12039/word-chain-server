module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "node 16", // 예시: Node.js 16버전을 대상으로 설정
        modules: "auto", // ES 모듈을 CommonJS로 변환
      },
    ],
    "@babel/preset-react", // React를 사용할 경우 추가
  ],
};
