import express from "express";
import cors from "cors";
import http from "http";
import { createSocket } from "./socket.js";
import { createDBConnection } from "./mysql.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "https://word-chain-client-sepia.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
const server = http.createServer(app);
createSocket(server);
server.listen(port, () => {
  console.log("시작", port);
});
const connection = createDBConnection();

// 닉네임 미 기입시 로그인
app.post("/member/user", (req, res) => {
  console.log("요청옴");
  let { id, password, nickname } = req.body;
  if (nickname == "") {
    const loginQuery = `SELECT * FROM member WHERE id=? AND password=?`;
    connection.query(loginQuery, [id, password], (error, results) => {
      let nickname = results.length === 0 ? "로그인 실패" : results[0].nickname;

      res.status(201).json({ nickname });
    });
  } else {
    // 닉네임 기입 시 회원가입
    const signupQuery = `INSERT INTO member (id, password, nickname) VALUES (?, ?, ?)`;
    const a = String(Math.floor(Math.random() * 9000 + 1000));
    nickname += "#" + a;
    connection.query(
      signupQuery,
      [id, password, nickname],
      (error, results) => {
        console.log(id, password, nickname, "회원가입");
        if (!error) {
          res.status(201).json({ nickname });
        } else {
          console.log(error, "실패함");
          res.status(201).json({});
        }
      }
    );
  }
});

// 점수변경로직
app.post("/member/point", (req, res) => {
  let { point, nickname } = req.body;
  const pointQuery = `UPDATE member SET point = point + ? WHERE nickname = ?`;
  connection.query(pointQuery, [point, nickname], (error, results) => {
    if (!error) {
      console.log(point, "성공", nickname);
      res.status(201).json({});
    } else {
      console.log("실패함");
      res.status(201).json({});
    }
  });
});
