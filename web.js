/// web.js
const express = require("express");
const path = require("path"); // 주소관련 메서드

const normalrouter = require("./subrouter.js");

const nodeserver = express();
const port = process.env.PORT || 8006;

// json보내기
nodeserver.use(express.static(path.join(__dirname, ''))) // web.js와 같은 경로상 지정
nodeserver.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, 'sdhdata.json')) // 같은 경로의 있는 sdhdata.json 사용 ! 
});


// 리액트 build폴더 올리기
nodeserver.use(express.static(path.join(__dirname, 'build'))) //
nodeserver.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
});

nodeserver.use("/way", normalrouter);
// 페이지 url 잘못됬을때 보여줄 페이지

nodeserver.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'html/nopage.html'))
})

nodeserver.listen(port, () => {
  console.log(`${port} 포트로 정상 구동`);
  console.log(`__dirname : `, __dirname)
});
