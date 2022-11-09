import "../../CSS/UI/inCodeUI.css";
import Stage from "./stage.js";
import { codeConfig } from "../GAME/code.js";

export default function IncodeUI() {
  const gameContainer = document.querySelector("#game-container");

  const pin = document.createElement("div");
  pin.setAttribute("class", "pin");
  pin.innerText = global.PinNumber;
  pin.style.textAlign = "center";
  pin.style.lineHeight = "60px";
  // pin.style.fontSize = "large";

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "buttonContainer");

  const backBtn = document.createElement("div");
  // backBtn.innerText = "뒤로가기";
  backBtn.setAttribute("class", "backBtn");
  backBtn.addEventListener("click", BacktoStage);

  const reBtn = document.createElement("div");
  // reBtn.innerText = "다시하기";
  reBtn.setAttribute("class", "reBtn");
  reBtn.addEventListener("click", Replay);

  buttonContainer.appendChild(backBtn);
  buttonContainer.appendChild(reBtn);

  gameContainer.appendChild(pin);
  gameContainer.appendChild(buttonContainer);

  // makeranking();
}

function BacktoStage() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "none";
  const pin = document.querySelector(".pin");
  const buttonContainer = document.querySelector(".buttonContainer");

  const rankingpanel = document.querySelector(".rankingpanel");
  gameContainer.removeChild(pin);
  gameContainer.removeChild(buttonContainer);
  if (rankingpanel != null) gameContainer.removeChild(rankingpanel);

  const app = document.querySelector("#app");
  const stagePage = document.querySelector(".stagePage");
  app.removeChild(stagePage);
  codeGame.destroy(true);
  codeGame = null;
  Stage();
}

function Replay() {
  const gameContainer = document.querySelector("#game-container");
  const pin = document.querySelector(".pin");
  const buttonContainer = document.querySelector(".buttonContainer");
  gameContainer.removeChild(pin);
  gameContainer.removeChild(buttonContainer);
  codeGame.destroy(true);
  codeGame = null;
  codeGame = new Phaser.Game(codeConfig);
  let Data = {
    action: "endGame",
    pinnumber: PinNumber,
  };
  socket.send(JSON.stringify(Data));
}

export function makeranking() {
  const gameContainer = document.querySelector("#game-container");

  const rankingpanel = document.createElement("div");
  rankingpanel.setAttribute("class", "rankingpanel");
  gameContainer.appendChild(rankingpanel);

  const scorespace = document.createElement("div");
  scorespace.setAttribute("class", "scorespace");
  scorespace.textContent = global.score + " score";
  rankingpanel.appendChild(scorespace);

  const inputspace = document.createElement("input");
  inputspace.setAttribute("class", "inputspace");
  inputspace.placeholder = "닉네임을 입력해주세요.";

  rankingpanel.appendChild(inputspace);

  const submitspace = document.createElement("div");
  submitspace.setAttribute("class", "submitspace");
  rankingpanel.appendChild(submitspace);

  const submitbtn = document.createElement("button");
  submitbtn.setAttribute("class", "submitbtn");
  submitbtn.textContent = "등록";
  submitspace.appendChild(submitbtn);

  submitbtn.addEventListener("click", submitranking);

  const cancelbtn = document.createElement("button");
  cancelbtn.setAttribute("class", "submitbtn");
  cancelbtn.textContent = "나가기";

  cancelbtn.addEventListener("click", cancelranking);
  submitspace.appendChild(cancelbtn);
}

function submitranking() {
  BacktoStage();
}

function cancelranking() {
  BacktoStage();
}
