import { Server } from "socket.io";
import { wordCheck } from "./wordAPI.js";
export const createSocket = (server) => {
  let wordList = [];
  let userList = new Map();
  let talkList = [];
  let gameState = false;
  let previousWord = "";
  const io = new Server(server, {
    cors: {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
      },
    },
  });

  // 끝말잇기규칙함수
  const wordTest = async (data) => {
    console.log(data);
    const wordInfo = await wordCheck(data.word);
    if (!wordInfo)
      return { wrong: "존재하지 않는 단어 입력!!", nickname: data.nickname };
    if (previousWord !== data.word[0] && previousWord)
      return { wrong: "일치하지 않는 단어 입력!!", nickname: data.nickname };
    if (wordList.some((item) => item.word === data.word)) {
      return { wrong: "중복된 단어 입력!!", nickname: data.nickname };
    }
    previousWord = data.word[data.word.length - 1];
    wordList.push(data);
    return {
      wordInfo: wordInfo,
      word: data.word,
      nickname: data.nickname,
      wrong: null,
    };
  };

  // 소켓함수들
  io.on("connection", (socket) => {
    // 접속
    console.log(socket.id + "연결");
    // 입장
    socket.on("accessRequest", (nickname) => {
      console.log(nickname, "입장");
      if (!userList.has(nickname)) {
        userList.set(nickname, socket.id);
        socket.join("permission");
        socket.emit("accessResult", {
          result: nickname,
          talkList: Array.from(talkList),
          gameState: gameState,
        });
        console.log("성공");
        io.to("permission").emit("UserFlow", Array.from(userList.keys()));
      } else {
        console.log("실패");
        socket.emit("accessResult", { result: null });
      }
    });
    // 재입장
    socket.on("reconnect", (nickname) => {
      if (!userList.has(nickname)) {
        const a = userList.set(nickname, socket.id);
        socket.join("permission");
        socket.emit("accessResult", {
          result: nickname,
          talkList: Array.from(talkList),
          gameState: gameState,
          reconnect: "reconnect",
        });
        io.to("permission").emit("UserFlow", Array.from(userList.keys()));
        socket.emit("test", nickname);
      }
    });
    // 채팅
    socket.on("msgSubmit", (data) => {
      console.log(data);
      talkList.unshift(data);
      io.to("permission").emit("msgSubmit", Array.from(talkList));
    });
    socket.on("talkList", () => {
      Array.from(talkList);
    });
    // 게임
    socket.on("start", (nickname) => {
      io.to("permission").emit("start", nickname);
      talkList = [];
      gameState = true;
    });

    socket.on("userList", () => {
      socket.emit("userFlow", Array.from(userList.keys()));
    });
    socket.on("word", async (data) => {
      if (data) {
        const wordInfo = await wordTest(data);
        io.to("permission").emit(wordInfo.wrong ? "end" : "word", wordInfo);
        if (wordInfo.wrong) {
          gameState = false;
          wordList = [];
        }
      } else {
        socket.emit("wordList", wordList);
      }
    });
    // 이탈
    socket.on("disconnect", () => {
      for (let [nickname, id] of userList.entries()) {
        if (id === socket.id) {
          userList.delete(nickname);
          console.log(nickname, "종료");
          io.to("permission").emit("UserFlow", Array.from(userList.keys()));
          break;
        }
      }
    });
  });
};
