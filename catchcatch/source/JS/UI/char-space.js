import "../../CSS/UI/CharSpace.css";
import { StartBtnOn } from "./start-page";
import { SaveData } from "../../main.js";
import { config } from "../GAME/game.js";
import { codeConfig } from "../GAME/code.js";

let _settingSpace;

let _slideList;
let _buyBtn;
let _gameStartBtn;
let _canCount;

let page;
const _catNameList = [
  "캐　츠",
  "용냥이",
  "무냥이",
  "영냥이",
  "진냥이",
  "규냥이",
  "희냥이",
];
const _catText = [
  "평범한 고양이",
  "몬스터들이 오징어로 변한다.",
  "레벨업시 무야호를 외친다.",
  "레벨업 특성이 랜덤으로 \n보인다.",
  "이동시 무지개가 따라오며\n몬스터가 슬라임으로 변한다.",
  "효과음이 랜덤으로 바뀐다.",
  "불 좀 꺼줄래?",
];
let pagecnt = 0;

const CharPageInit = () => {
  //여기서 미리 서버 정보를 가져온다. ---------------------------
  let _AllBtn = document.getElementById("AllBtnList");
  // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
  _settingSpace = document.createElement("div");
  _settingSpace.className = "SettingSpace";
  _settingSpace.style.display = "none";

  _AllBtn.appendChild(_settingSpace);
  //--------------------------------------------------

  //뒤로가기
  let _BackIcon = document.createElement("button");
  _BackIcon.className = "BackIcon";
  _settingSpace.appendChild(_BackIcon);
  _BackIcon.addEventListener("click", BackStart);

  // 캔 갯수 표시
  let _CanIcon = document.createElement("div");
  _CanIcon.className = "CanIcon";
  _settingSpace.appendChild(_CanIcon);

  _canCount = document.createElement("div");
  _canCount.className = "CanCount";
  _canCount.textContent = "x" + LocalData.Coin;
  _CanIcon.appendChild(_canCount);

  //고양이 구매
  _buyBtn = document.createElement("button");
  _buyBtn.className = "BuyBtn";
  _settingSpace.appendChild(_buyBtn);
  _buyBtn.textContent = "50 Can!";
  _buyBtn.style.display = "none";
  _buyBtn.addEventListener("click", BuyChar);

  // 캐릭터 선택 Space
  let _CharSpace = document.createElement("div");
  _CharSpace.className = "CharSpace";
  _settingSpace.appendChild(_CharSpace);

  //컨텐츠 네임 [캐릭터선택]
  let _ContentName = document.createElement("div");
  _ContentName.className = "ContentName";
  _ContentName.textContent = "[캐릭터선택]";
  _CharSpace.appendChild(_ContentName);

  // 캐릭턴 선택 박스
  let _ChoiceCharBox = document.createElement("div");
  _ChoiceCharBox.className = "ChoiceCharBox";
  _CharSpace.appendChild(_ChoiceCharBox);

  // LEFT Btn
  let _LeftBtn = document.createElement("button");
  _LeftBtn.className = "CharLeftBtn";
  _LeftBtn.addEventListener("click", SlideLeft);
  _ChoiceCharBox.appendChild(_LeftBtn);

  //슬라이드
  let _Slide = document.createElement("div");
  _Slide.className = "Slide";
  _ChoiceCharBox.appendChild(_Slide);

  _slideList = document.createElement("div");
  _slideList.className = "SlideList";
  _Slide.appendChild(_slideList);

  for (let i = 0; i < 7; ++i) {
    let _CharTemp = document.createElement("div");
    _CharTemp.className = "CharTemp";

    //캐릭터 이미지 가져오기
    let _CharImg = document.createElement("img");
    _CharImg.className = "CharImg";
    _CharImg.id = `CharImg_${i}`;

    if (LocalData.Cat[i] !== false) _CharImg.src = `images/CharImg/${i}.png`;
    else _CharImg.src = `images/CharImg/Unable/${i}.png`;
    // _CharImg.style.border = "3px solid black";
    _CharTemp.appendChild(_CharImg);

    //캐릭 이름 가져오기
    let _CharName = document.createElement("div");
    _CharName.className = "CharName";
    _CharName.id = `CharName_${i}`;

    if (LocalData.Cat[i] != false)
      _CharName.innerText = `[${_catNameList[i]}]
      ${_catText[i]}`;
    else _CharName.innerText = "[" + " ???? " + "]" + `\n${_catText[i]}`;
    _CharTemp.appendChild(_CharName);

    _slideList.appendChild(_CharTemp);
  }

  //RightBtn
  let _RightBtn = document.createElement("button");
  _RightBtn.className = "CharRightBtn";
  _RightBtn.addEventListener("click", SlideRight);
  _ChoiceCharBox.appendChild(_RightBtn);

  //--------------------------------------------

  //난이도 선택 및 게임 시작
  let _OtherBtn = document.createElement("div");
  _OtherBtn.className = "OtherBtn";
  _settingSpace.appendChild(_OtherBtn);

  let _LevelBtn = document.createElement("button");
  _LevelBtn.className = "LevelBtn";
  _LevelBtn.textContent = "NORMAL";
  _LevelBtn.style.background =
    "url('images/ui/MapLevelNormal.png') no-repeat center";
  _LevelBtn.style.backgroundSize = "contain";
  _LevelBtn.addEventListener("click", MapLevel);
  _OtherBtn.appendChild(_LevelBtn);

  let _storyactive = document.createElement("input");
  _storyactive.setAttribute("class", "storycheck");
  _storyactive.type = "checkbox";
  if (localStorage.getItem("first") === null) _storyactive.checked = true;
  _storyactive.addEventListener("change", storyactive);

  let storytext = document.createElement("div");
  storytext.textContent = "스토리";
  storytext.setAttribute("class", "storytext");
  _OtherBtn.appendChild(storytext);

  _OtherBtn.appendChild(_storyactive);

  _gameStartBtn = document.createElement("button");
  _gameStartBtn.className = "GameStartBtn";
  _gameStartBtn.id = "GameStartBtn";
  _gameStartBtn.textContent = "GO!CATCH!";
  _gameStartBtn.style.textAlign = "center";
  _gameStartBtn.addEventListener("click", GameStart);
  _OtherBtn.appendChild(_gameStartBtn);
};

export default CharPageInit;

export const CharSpaceOn = () => {
  _settingSpace.style.display = "flex";
};

export const CharSpaceOff = () => {
  _settingSpace.style.display = "none";
};

// 돌아가기
function BackStart() {
  CharSpaceOff();
  StartBtnOn();
}

function GameStart() {
  //app 자체를 false해야되나?
  if (ChoiceCat === -1) "시작 불가";

  //여기서 만화를 보여준다. ---------------
  // console.log(localStorage.getItem("first"));
  if (localStorage.getItem("first") === null) {
    // localStorage.setItem("first", "ok");
    const _app = document.getElementById("app");
    const cartoonspace = document.createElement("div");
    cartoonspace.setAttribute("class", "cartoonspace");

    const leftbtn = document.createElement("button");
    leftbtn.setAttribute("class", "leftpagebtn");
    leftbtn.addEventListener("click", leftpage);

    cartoonspace.appendChild(leftbtn);
    pagecnt = 1;

    page = document.createElement("img");
    page.setAttribute("class", "page");
    page.style.background = `url('images/cartoon/${pagecnt}.png')`;
    page.style.backgroundRepeat = "no-repeat";
    page.style.backgroundPosition = "center";
    page.style.backgroundSize = "contain";
    cartoonspace.appendChild(page);

    const rightbtn = document.createElement("button");
    rightbtn.setAttribute("class", "rightpagebtn");
    cartoonspace.appendChild(rightbtn);

    rightbtn.addEventListener("click", rightpage);

    // const page2 = document.createElement("img");
    // page2.setAttribute("class", "page2");
    // cartoonspace.appendChild(page2);

    _app.appendChild(cartoonspace);
  } else {
    //--------------------------------

    const StartPage = document.querySelector(".StartPage");
    StartPage.style.display = "none";
    let game = new Phaser.Game(config);
    const gameContainer = document.querySelector("#game-container");
    gameContainer.style.display = "block";
  }
}

export function CodeStart() {
  //app 자체를 false해야되나?
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
  let game = new Phaser.Game(codeConfig);
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "block";
}

export function GoStage() {
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
}

let CharIndex = 0;

function Slide() {
  _slideList.style.left = -CharIndex * 190 + "px";

  if (LocalData.Cat[CharIndex] !== false) {
    ChoiceCat = CharIndex;
    const target = document.getElementById("GameStartBtn");
    target.disabled = false;
    _buyBtn.style.display = "none";

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/${CharIndex}.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";
  } else {
    ChoiceCat = -1;
    const target = document.getElementById("GameStartBtn");
    target.disabled = true;
    _buyBtn.style.display = "inline-block";

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/0.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";
  }
}

function SlideLeft() {
  if (CharIndex > 0) {
    --CharIndex;
    Slide();
  }
}

function SlideRight() {
  if (CharIndex < 6) {
    ++CharIndex;
    Slide();
  }
}

function BuyChar() {
  if (LocalData.Coin >= 50) {
    LocalData.Coin -= 50;
    LocalData.Cat[CharIndex] = true;
    ChoiceCat = CharIndex;

    _canCount.textContent = "x" + LocalData.Coin;

    const ChangeCharImg = document.getElementById(`CharImg_${CharIndex}`);
    ChangeCharImg.src = `images/CharImg/${CharIndex}.png`;
    const ChangeCharName = document.getElementById(`CharName_${CharIndex}`);
    ChangeCharName.innerText =
      "[" + _catNameList[CharIndex] + "]" + `\n${_catText[CharIndex]}`;

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/${CharIndex}.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";

    this.style.display = "none";
    const target = document.getElementById("GameStartBtn");
    target.disabled = false;
    SaveData();
    // 코인 차감
    // Buybtn 비활성
    // 로컬데이터 수정
  }
}

function MapLevel() {
  if (ChoiceLevel === 0) {
    this.style.background =
      "url('images/ui/MapLevelHard.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "HARD";
    ++ChoiceLevel;
  } else if (ChoiceLevel === 1) {
    this.style.background =
      "url('images/ui/MapLevelHell.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "HELL";
    ++ChoiceLevel;
  } else {
    this.style.background =
      "url('images/ui/MapLevelNormal.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "NORMAL";
    ChoiceLevel = 0;
  }
}

function leftpage() {
  if (pagecnt > 1) {
    --pagecnt;
    page.style.background = `url('images/cartoon/${pagecnt}.png')`;
    page.style.backgroundRepeat = "no-repeat";
    page.style.backgroundPosition = "center";
    page.style.backgroundSize = "contain";
  }
}

function rightpage() {
  if (pagecnt < 4) {
    ++pagecnt;
    page.style.background = `url('images/cartoon/${pagecnt}.png')`;
    page.style.backgroundRepeat = "no-repeat";
    page.style.backgroundPosition = "center";
    page.style.backgroundSize = "contain";
  } else if (pagecnt == 4) {
    const cartoonspace = document.querySelector(".cartoonspace");
    cartoonspace.remove();

    const StartPage = document.querySelector(".StartPage");
    StartPage.style.display = "none";
    let game = new Phaser.Game(config);
    const gameContainer = document.querySelector("#game-container");
    gameContainer.style.display = "block";
  }
}

function storyactive() {
  const toastspace = document.createElement("div");
  toastspace.id = "toast";
  const _app = document.getElementById("app");
  _app.appendChild(toastspace);

  if (localStorage.getItem("first") === null) {
    localStorage.setItem("first", "ok");
    toast("스토리 비활성화");
  } else {
    localStorage.removeItem("first");
    toast("스토리 활성화");
  }
}

let removeToast;

function toast(string) {
  const toast = document.getElementById("toast");

  toast.classList.contains("reveal")
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000)))
    : (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000));
  toast.classList.add("reveal"), (toast.innerText = string);
}
