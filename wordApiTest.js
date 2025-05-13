import axios from "axios";
import { wordCheck } from "./wordCheck"; // 실제 경로에 맞게 수정

jest.mock("axios"); // axios를 mock 처리

describe("wordCheck", () => {
  it("should return up to 3 definitions from the API", async () => {
    const mockData = {
      data: {
        channel: {
          item: [
            { sense: { definition: "뜻1" } },
            { sense: { definition: "뜻2" } },
            { sense: { definition: "뜻3" } },
          ],
        },
      },
    };

    axios.get.mockResolvedValue(mockData); // axios의 get 요청을 mock

    const result = await wordCheck("사과"); // 실제 함수 호출
    expect(result).toEqual(["뜻1", "뜻2", "뜻3"]); // 예상 결과
  });

  it("should return null on error", async () => {
    axios.get.mockResolvedValue({ data: {} }); // 잘못된 데이터
    const result = await wordCheck("엉터리단어"); // 호출
    expect(result).toBeNull(); // null을 반환할 것
  });
});
