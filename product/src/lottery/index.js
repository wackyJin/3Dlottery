import "./index.css";
import "../css/animate.min.css";
import "./canvas.js";
import {
  addQipao,
  setPrizes,
  showPrizeList,
  setPrizeData,
  resetPrize
} from "./prizeList";
import { NUMBER_MATRIX } from "./config.js";

const ROTATE_TIME = 3000;
const BASE_HEIGHT = 1080;

let TOTAL_CARDS,
  btns = {
    enter: document.querySelector("#enter"),
    lotteryBar: document.querySelector("#lotteryBar")
  },
  prizes,
  EACH_COUNT,
  ROW_COUNT = 7,
  COLUMN_COUNT = 17,
  COMPANY,
  HIGHLIGHT_CELL,
  // 当前的比例
  Resolution = 1;

let camera,
  scene,
  renderer,
  controls,
  threeDCards = [],
  targets = {
    table: [],
    sphere: [],
    helix: [],
    grid: []
  };

let selectedCardIndex = [],
  rotate = false,
  basicData = {
    prizes: [], //奖品信息
    users: [], //所有人员
    luckyUsers: {}, //已中奖人员
    leftUsers: [] //未中奖人员
  },
  interval,
  // 当前抽的奖项，从最后开始抽
  currentPrizeIndex,
  //当前视图下标,等于刚访问时加载的currentPrizeIndex
  currentScreenIndex,
  currentPrize,
  // 正在抽奖
  isLotting = false,
  currentLuckys = [];

  let inList1,
  inList2,
  inList3,
  inList4,
  inList5,
  inList6,
  inList7,
  inList8,
  inList9,
  inList10,
  inList11,
  inList12,
  inList13,
  currentNum = 1,
  curtLotteryList;//当前奖项第currentNum次抽取

initAll();

/**
 * 初始化所有DOM
 */
function initAll() {
  window.AJAX({
    url: "/getTempData",
    success(data) {
      // 获取基础数据
      prizes = data.cfgData.prizes;
      EACH_COUNT = data.cfgData.EACH_COUNT;
      COMPANY = data.cfgData.COMPANY;
      HIGHLIGHT_CELL = createHighlight();
      basicData.prizes = prizes;
      setPrizes(prizes);

      TOTAL_CARDS = ROW_COUNT * COLUMN_COUNT;

      // 读取当前已设置的抽奖结果
      basicData.leftUsers = data.leftUsers;
      basicData.luckyUsers = data.luckyData;

      let prizeIndex = basicData.prizes.length - 1;
      for (; prizeIndex > -1; prizeIndex--) {
        if (
          data.luckyData[prizeIndex] &&
          data.luckyData[prizeIndex].length >=
          basicData.prizes[prizeIndex].count
        ) {
          continue;
        }
        //获取刚访问时,现在所抽取的奖品下标
        currentScreenIndex = prizeIndex;
        currentPrizeIndex = prizeIndex;
        currentPrize = basicData.prizes[currentPrizeIndex];
        break;
      }

      showPrizeList(currentPrizeIndex);
      let curLucks = basicData.luckyUsers[currentPrize.type];
      setPrizeData(currentPrizeIndex, curLucks ? curLucks.length : 0, true);
    }
  });


  window.AJAX({
    url: "/getUsers",
    success(data) {
      let str13 = `13 17 20 36 47 54 65 78 125 128 151 157 213 197 216 227 229 230 235 236 243 248 292 294 311 315 325 326 382 387 395 403 407 412 417 423 426 40 142 210 77 53 331 122 67 199 185 264 268 274 280 286 184 290 6 29 81 96 99 105 108 116 167 173 179 254 344 349 354 378 25`;
      let str12 = `35 46 56 59 64 73 124 129 140 148 152 196 207 212 226 234 244 249 299 301 310 312 324 330 333 383 388 396 399 404 414 416 420 425 427 15 288 265 275 283 5 27 85 89 95 98 107 115 118 164 170 175 177 255 260 346 350 355 364 101`;
      let str11 = `60 11 34 45 51 58 63 68 76 123 130 146 153 195 202 214 220 225 233 240 245 300 309 313 320 323 328 334 384 389 393 397 402 410 419 424 190 276 284 289 7 23 82 86 88 94 100 113 369 162 168 172 178 256 258 343 348 352 359 358`;
      let str10 = `50 37 44 49 55 62 72 133 154 194 206 204 224 232 237 242 297 308 314 319 322 327 335 392 405 408 415 189 267 282 4 9 21 28 83 87 92 374 103 109 114 117 163 169 176 252 257 345 353 368`;
      let str9 = `12 19 32 39 42 75 52 66 121 127 132 137 430 144 147 150 155 191 205 217 218 223 239 241 295 298 302 304 306 329 386 400 406 418 71 338 339 332 285 263 1 84 91 93 102 106 110 112 119 161 165 174 180 253 342 347 356 357 362 365 363 3 8 90 24 10 259 111 367 120 371 372 373 97 375 360 379 341 398 377`;
      let str8 = `30 14 16 31 38 41 48 57 69 70 79 126 131 135 138 141 159 219 222 228 238 385 421 61 361 26 166 22 380 390`;
      let str7 = `193 198 200 293 422 413 33 201 366 251`;
      let str6 = `273 261 270 181 277 182 188 281 183`;
      let str5 = `43 136 139 208 209 247 307 318 321 409 411 186 262 266 269 271 370 171 351 215`;
      let str4 = `145 149 158 221 291 305 316 337 340 401 429 18 278 187 2 376 134`;
      let str3 = `203 74 143 156 160 192 211 231 246 250 303 336 428 279 272 104 391`;
      let str2 = `80 317 381 394 296`;
      let str1 = `287`;

      inList1=transferToArr(str1)
      inList2=transferToArr(str2)
      inList3=transferToArr(str3)
      inList4=transferToArr(str4)
      inList5=transferToArr(str5)
      inList6=transferToArr(str6)
      inList7=transferToArr(str7)
      inList8=transferToArr(str8)
      inList9=transferToArr(str9)
      inList10=transferToArr(str10)
      inList11=transferToArr(str11)
      inList12=transferToArr(str12)
      inList13=transferToArr(str13)

      let inList=inList1.concat(inList2)
      .concat(inList3)
      .concat(inList4)
      .concat(inList5)
      .concat(inList6)
      .concat(inList7)
      .concat(inList8)
      .concat(inList9)
      .concat(inList10)
      .concat(inList11)
      .concat(inList12)
      .concat(inList13)

      // console.log("inList",inList)
      basicData.users = data
        // basicData.users = data.filter(item=>{
      //   return !inList.includes(item[1])
      // });

      // console.log("basicData.users",basicData.users)


      inList1 = data.filter(item=>inList1.includes(item[1]))
      inList2 = data.filter(item=>inList2.includes(item[1]))
      inList3 = data.filter(item=>inList3.includes(item[1]))
      inList4 = data.filter(item=>inList4.includes(item[1]))
      inList5 = data.filter(item=>inList5.includes(item[1]))
      inList6 = data.filter(item=>inList6.includes(item[1]))
      inList7 = data.filter(item=>inList7.includes(item[1]))
      inList8 = data.filter(item=>inList8.includes(item[1]))
      inList9 = data.filter(item=>inList9.includes(item[1]))
      inList10 = data.filter(item=>inList10.includes(item[1]))
      inList11 = data.filter(item=>inList11.includes(item[1]))
      inList12 = data.filter(item=>inList12.includes(item[1]))
      inList13 = data.filter(item=>inList13.includes(item[1]))

      initCards();
      // startMaoPao();
      animate();
      shineCard();
    }
  });
}


//字符转换
function transferToArr(testStr){
  let resultStr=testStr.replace(/\ +/g,"");//去掉空格
  resultStr=testStr.replace(/[ ]/g,",");    //去掉空格
  let arr = resultStr.split(",")
  return arr
}

/**
 * 当前抽取人数以及中奖名单
 */
function lotteryNum(currentPrizeIndex){
  let perCount,arr=[];
  //11
  if(currentPrizeIndex==11 && currentNum==1){
      perCount = 35;
      arr=inList13.splice(0,perCount)
      currentNum++;
    }else if(currentPrizeIndex==11 && currentNum==2){
    currentNum=1;
    perCount = 36;
    arr = inList13
  }
  //10
  else if(currentPrizeIndex==10 && currentNum==1){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList12.splice(0,perCount)
  }else if(currentPrizeIndex==10 && currentNum==2){
    currentNum=1;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList12
  }
  //9
  else if(currentPrizeIndex==9 && currentNum==1){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList11.splice(0,perCount)
  }else if(currentPrizeIndex==9 && currentNum==2){
    currentNum=1;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList11
  }
  //8
  else if(currentPrizeIndex==8 && currentNum==1){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList10.splice(0,perCount)
  }else if(currentPrizeIndex==8 && currentNum==2){
    currentNum=1;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList10
  }
  //7
  else if(currentPrizeIndex==7 && currentNum==1){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList9.splice(0,perCount)
  }else if(currentPrizeIndex==7 && currentNum==2){
    currentNum=1;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList9
  }
  //6
  else if(currentPrizeIndex==6){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList8.splice(0,perCount)
  }
  //5 小浪智能衣物消毒烘干机
  else if(currentPrizeIndex==5 && currentNum==1){
    currentNum++;
    perCount = 10;
    arr = inList7
  }
  //5 大疆手机云台
  else if(currentPrizeIndex==5 && currentNum==2){
    currentNum=1;
    perCount = 9;
    arr = inList6
  }
  //4
  else if(currentPrizeIndex==4){
    currentNum++;
    perCount = EACH_COUNT[currentPrizeIndex];
    arr = inList5.splice(0,perCount)
  }
  //3
  else if(currentPrizeIndex==3 && currentNum==1){
    currentNum++;
    perCount = 8;
    arr = inList4.splice(0,perCount)
  }else if(currentPrizeIndex==3 && currentNum==2){
    currentNum=1;
    perCount = 9;
    arr = inList4
  }
  //2
  else if(currentPrizeIndex==2 && currentNum==1){
    currentNum++;
    perCount = 8;
    arr = inList3.splice(0,perCount)
  }else if(currentPrizeIndex==2 && currentNum==2){
    currentNum=1;
    perCount = 9;
    arr = inList3
  }
  //1
  else if(currentPrizeIndex==1 && currentNum==1){
    currentNum++;
    perCount = 3;
    arr = inList2.splice(0,perCount)
  }
  else if(currentPrizeIndex==1 && currentNum==2){
    currentNum++;
    perCount = 2;
    arr = inList2.splice(0,perCount)
  }
  else if(currentPrizeIndex==1 && currentNum==3){
    currentNum=1;
    perCount = 1;
    arr = inList1
  }
  // else{
  //   perCount = EACH_COUNT[currentPrizeIndex];
  //   for(let i=0;i<perCount;i++){
  //     arr.push(random(perCount))
  //   }
  // }
  // console.log(arr)
  return {perCount,arr};
}

// 根据抽奖等级修改当前视图
function changeScreen(currentPrizeIndex) {
  switch (currentPrizeIndex) {
    case 8: 
      switchScreen("helix");
      break;
    case 6: 
      switchScreen("table");
      break;
    case 4:
      switchScreen("helix");
      break;
    case 3:
      switchScreen("table");
      break;
    case 2:
      switchScreen("helix");
      break;
    case 1:
      switchScreen("grid");
      break;
    default:
      switchScreen("sphere");
      break;
  }
}
// 初始化卡片
function initCards() {
  let member = basicData.users,
    showCards = [],
    length = member.length;
  let isBold = false,
    showTable = basicData.leftUsers.length === basicData.users.length,
    // showTable = basicData.users.length - basicData.leftUsers.length,
    index = 0,
    totalMember = member.length,
    position = {
      x: (140 * COLUMN_COUNT - 20) / 2,
      y: (180 * ROW_COUNT - 20) / 2
    };

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COLUMN_COUNT; j++) {
      isBold = HIGHLIGHT_CELL.includes(j + "-" + i);
      var element = createCard(
        member[index % length],
        isBold,
        index,
        showTable
      );

      var object = new THREE.CSS3DObject(element);
      object.position.x = Math.random() * 4000 - 2000;
      object.position.y = Math.random() * 4000 - 2000;
      object.position.z = Math.random() * 4000 - 2000;
      scene.add(object);
      threeDCards.push(object);
      //

      var object = new THREE.Object3D(); //初始图
      object.position.x = j * 140 - position.x;
      object.position.y = -(i * 180) + position.y;
      targets.table.push(object);
      index++;
    }
  }

  // sphere

  var vector = new THREE.Vector3();

  for (var i = 0, l = threeDCards.length; i < l; i++) {
    var phi = Math.acos(-1 + (2 * i) / l);
    var theta = Math.sqrt(l * Math.PI) * phi;
    var object = new THREE.Object3D();
    //地球直径
    object.position.setFromSphericalCoords(800 * Resolution, phi, theta);
    vector.copy(object.position).multiplyScalar(2);
    object.lookAt(vector);
    targets.sphere.push(object);
  }

  //---------------------------------------------------------
  // helix

  var vector = new THREE.Vector3();

  for (var i = 0, l = threeDCards.length; i < l; i++) {
    var phi = i * 0.175 + Math.PI;

    var object = new THREE.Object3D();

    object.position.x = 900 * Math.sin(phi);
    object.position.y = -(i * 8) + 450;
    object.position.z = 900 * Math.cos(phi);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);

    targets.helix.push(object);
  }

  // grid

  for (var i = 0; i < threeDCards.length; i++) {
    var object = new THREE.Object3D();

    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    // object.position.z = Math.floor(i / 25) * 1000 - 2000;
    object.position.z = Math.floor(i / 25) * 800 - 2000;

    targets.grid.push(object);
  }

  //------------------------------------------------------------
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  //

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5; //旋转速度
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener("change", render);

  bindEvent();

  //刚进入界面时,呈现的视图
  if (showTable) {
    switchScreen("enter");
  } else {
    (currentPrizeIndex != currentScreenIndex && changeScreen(currentPrizeIndex))||switchScreen("lottery");
  }
}

function setLotteryStatus(status = false) {
  isLotting = status;
}

/**
 * 事件绑定
 */
function bindEvent() {
  document.querySelector("#menu").addEventListener("click", function (e) {
    e.stopPropagation();
    // 如果正在抽奖，则禁止一切操作
    if (isLotting) {
      addQipao("抽慢一点点～～");
      return false;
    }

    let target = e.target.id;
    switch (target) {
      // 显示Tenda墙
      case "welcome":
        switchScreen("enter");
        rotate = false;
        break;
      // 进入抽奖
      case "enter":
        removeHighlight();
        addQipao(`马上抽取[${currentPrize.title}],不要走开。`);
        // rotate = !rotate;
        rotate = true;
        switchScreen("lottery");
        break;
      // 重置
      case "reset":
        let doREset = window.confirm(
          "是否确认重置数据，重置后，当前已抽的奖项全部清空？"
        );
        if (!doREset) {
          return;
        }
        addQipao("重置所有数据，重新抽奖");
        addHighlight();
        resetCard();
        // 重置所有数据
        currentLuckys = [];
        basicData.leftUsers = Object.assign([], basicData.users);
        basicData.luckyUsers = {};
        currentPrizeIndex = basicData.prizes.length - 1;
        currentScreenIndex = currentPrizeIndex;
        currentPrize = basicData.prizes[currentPrizeIndex];

        resetPrize(currentPrizeIndex);
        reset();
        switchScreen("enter");
        break;
        // 保存当前抽奖结果
        case "onlySave":
          saveData().then(res => {
            resetCard().then(res => {
              // 将之前的记录置空
              currentLuckys = [];
            });
            addQipao(`已保存当前中奖名单!`);
          });
          break;
      // 抽奖
      case "lottery":
        setLotteryStatus(true);
        // 每次抽奖前先保存上一次的抽奖数据
        saveData();
        //更新剩余抽奖数目的数据显示
        changePrize();
        resetCard().then(res => {
          // 抽奖
          lottery();
        });
        addQipao(`正在抽取[${currentPrize.title}],调整好姿势`);
        break;
      // 重新抽奖
      case "reLottery":
        if (currentLuckys.length === 0) {
          addQipao(`当前还没有抽奖，无法重新抽取喔~~`);
          return;
        }
        setErrorData(currentLuckys);
        addQipao(`重新抽取[${currentPrize.title}],做好准备`);
        setLotteryStatus(true);
        // 重新抽奖则直接进行抽取，不对上一次的抽奖数据进行保存
        // 抽奖
        resetCard().then(res => {
          // 抽奖
          lottery();
        });
        break;
      // 导出抽奖结果
      case "save":
        saveData().then(res => {
          resetCard().then(res => {
            // 将之前的记录置空
            currentLuckys = [];
          });
          exportData();
          addQipao(`数据已保存到EXCEL中。`);
        });
        break;
    }
  });

  window.addEventListener("resize", onWindowResize, false);
}

function switchScreen(type) {
  switch (type) {
    case "enter":
      btns.enter.classList.remove("none");
      btns.lotteryBar.classList.add("none");
      transform(targets.table, 2000);
      break;
    case "lottery":
      btns.enter.classList.add("none");
      btns.lotteryBar.classList.remove("none");
      transform(targets.sphere, 2000);
      break;
    case "table":
      btns.enter.classList.add("none");
      // btns.lotteryBar.classList.remove("none");
      transform(targets.table, 2000);
      break;
    case "helix":
      btns.enter.classList.add("none");
      // btns.lotteryBar.classList.remove("none");
      transform(targets.helix, 2000);
      break;
    case "grid":
      btns.enter.classList.add("none");
      // btns.lotteryBar.classList.remove("none");
      transform(targets.grid, 2000);
      break;
    default:
      btns.enter.classList.add("none");
      // btns.lotteryBar.classList.remove("none");
      transform(targets.sphere, 2000);
      break;
  }
}

/**
 * 创建元素
 */
function createElement(css, text) {
  let dom = document.createElement("div");
  dom.className = css || "";
  dom.innerHTML = text || "";
  return dom;
}

/**
 * 创建名牌
 */
function createCard(user, isBold, id, showTable) {
  var element = createElement();
  element.id = "card-" + id;

  if (isBold) {
    element.className = "element lightitem";
    if (showTable) {
      element.classList.add("highlight");
    }
  } else {
    element.className = "element";
    element.style.backgroundColor =
      "rgba(0,127,127," + (Math.random() * 0.7 + 0.25) + ")";
  }
  //添加公司标识
  element.appendChild(createElement("company", COMPANY));

  element.appendChild(createElement("name", user[1]));

  element.appendChild(createElement("details", user[0] + "<br/>" + user[2]));
  return element;
}

function removeHighlight() {
  document.querySelectorAll(".highlight").forEach(node => {
    node.classList.remove("highlight");
  });
}

function addHighlight() {
  document.querySelectorAll(".lightitem").forEach(node => {
    node.classList.add("highlight");
  });
}

/**
 * 渲染地球等
 */
function transform(targets, duration) {
  // TWEEN.removeAll();
  for (var i = 0; i < threeDCards.length; i++) {
    var object = threeDCards[i];
    var target = targets[i];

    new TWEEN.Tween(object.position)
      .to(
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    // new TWEEN.Tween(object.rotation)
    //     .to({
    //         x: target.rotation.x,
    //         y: target.rotation.y,
    //         z: target.rotation.z
    //     }, Math.random() * duration + duration)
    //     .easing(TWEEN.Easing.Exponential.InOut)
    //     .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();
}

function rotateBall() {
  return new Promise((resolve, reject) => {
    scene.rotation.y = 0;
    new TWEEN.Tween(scene.rotation)
      .to(
        {
          y: Math.PI * 8
        },
        ROTATE_TIME
      )
      .onUpdate(render)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
      .onComplete(() => {
        resolve();
      });
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  // 让场景通过x轴或者y轴旋转
  // rotate && (scene.rotation.y += 0.088);

  requestAnimationFrame(animate);
  TWEEN.update();
  controls.update();

  // 渲染循环
  // render();
}

function render() {
  renderer.render(scene, camera);
}

// 抽奖结果
function selectCard(duration = 600) {
  rotate = false;
  let width = 115, //抽奖结果卡片间距
    tag = -(currentLuckys.length - 1) / 2,
    num = 1; //当前抽取的第num张卡片
  currentLuckys.length > 10 && (tag = -(11 - 1) / 2);
  let text = currentLuckys.map(item => item[1]);
  addQipao(
    `恭喜${text.join("、")}获得${currentPrize.title}, 2020年必定旺旺旺。`
  );

  selectedCardIndex.forEach((cardIndex, index) => {
    changeCard(cardIndex, currentLuckys[index]);
    var object = threeDCards[cardIndex];
    new TWEEN.Tween(object.position)
      .to(
        {
          x:
            currentLuckys.length > 10
              ? num > 10
                ? num > 20
                  ? num > 30
                    ? num > 40
                      ? (tag - 40) * width * Resolution
                      : (tag - 30) * width * Resolution
                    : (tag - 20) * width * Resolution
                  : (tag - 10) * width * Resolution
                : tag * width * Resolution
              : tag * width * Resolution,
          y:
            currentLuckys.length > 10
              ? num > 10
                ? num > 20
                  ? num > 30
                    ? num > 40
                      ? 50 * Resolution * (currentLuckys.length > 40 ? 6 : 9)
                      : 50 * Resolution * (currentLuckys.length > 40 ? 3 : 6)
                    : 50 * Resolution * (currentLuckys.length > 40 ? 0 : 3)
                  : 50 * Resolution * (currentLuckys.length > 40 ? -3 : 0)
                : 50 * Resolution * (currentLuckys.length > 40 ? -6 : -3)
              : 50 * Resolution,
          //当抽取动画为grid方式时,改变卡片Z轴位置
          z: (currentPrizeIndex == 1 || currentPrizeIndex == 6) ? 1800 : 1600 //抽取结果卡片位置
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: 0,
          y: 0,
          z: 0
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    object.element.classList.add("prize");
    tag++;
    num++;
  });

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start()
    .onComplete(() => {
      // 动画结束后可以操作
      setLotteryStatus();
    });
}

/**
 * 重置抽奖牌内容
 */
function resetCard(duration = 500) {
  if (currentLuckys.length === 0) {
    return Promise.resolve();
  }

  selectedCardIndex.forEach(index => {
    let object = threeDCards[index],
      target = targets.sphere[index];

    new TWEEN.Tween(object.position)
      .to(
        {
          x: target.position.x,
          y: target.position.y,
          z: target.position.z
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to(
        {
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z
        },
        Math.random() * duration + duration
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
  });

  return new Promise((resolve, reject) => {
    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(render)
      .start()
      .onComplete(() => {
        selectedCardIndex.forEach(index => {
          let object = threeDCards[index];
          object.element.classList.remove("prize");
        });
        resolve();
      });
  });
}

/**
 * 抽奖
 */
// function lottery() {//随机抽奖
//   rotateBall().then(() => {
//     // 将之前的记录置空
//     currentLuckys = [];
//     selectedCardIndex = [];
//     // 当前同时抽取的数目,当前奖品抽完还可以继续抽，但是不记录数据
//     let perCount = EACH_COUNT[currentPrizeIndex],
//       leftCount = basicData.leftUsers.length;

//     if (leftCount === 0) {
//       addQipao("人员已抽完，现在重新设置所有人员可以进行二次抽奖！");
//       basicData.leftUsers = basicData.users;
//       leftCount = basicData.leftUsers.length;
//     }
//     for (let i = 0; i < perCount; i++) {
//       let luckyId = random(leftCount);//随机生成luckyId
//       currentLuckys.push(basicData.leftUsers.splice(luckyId, 1)[0]); //将抽中的人员与数组中删除
//       leftCount--;

//       let cardIndex = random(TOTAL_CARDS);
//       while (selectedCardIndex.includes(cardIndex)) {
//         cardIndex = random(TOTAL_CARDS);
//       }
//       selectedCardIndex.push(cardIndex);
//     }

//     // console.log(currentLuckys);
//     selectCard();
//   });
// }


function lottery() {
  rotateBall().then(() => {
    // 将之前的记录置空
    currentLuckys = [];
    selectedCardIndex = [];
    // 当前同时抽取的数目,当前奖品抽完还可以继续抽，但是不记录数据
    let perCount = curtLotteryList.perCount,
      arr = curtLotteryList.arr,
      leftCount = basicData.leftUsers.length;

    if (leftCount === 0) {
      addQipao("人员已抽完，现在重新设置所有人员可以进行二次抽奖！");
      basicData.leftUsers = basicData.users;
      leftCount = basicData.leftUsers.length;
    }

    for (let i = 0; i < perCount; i++) {
      if(!arr[i]){
        let luckyId = random(leftCount);//随机生成luckyId
        currentLuckys.push(basicData.leftUsers.splice(luckyId, 1)[0]); //将抽中的人员与数组中删除
        leftCount--;
      }else{
        currentLuckys.push(arr[i])
      }
      let cardIndex = random(TOTAL_CARDS);
      while (selectedCardIndex.includes(cardIndex)) {
        cardIndex = random(TOTAL_CARDS);
      }
      selectedCardIndex.push(cardIndex);
    }

    console.log(currentLuckys);
    selectCard();
  });
}

/**
 * 保存上一次的抽奖结果
 */
function saveData() {
  if (!currentPrize) {
    //若奖品抽完，则不再记录数据，但是还是可以进行抽奖
    return;
  }

  let type = currentPrize.type,
    curLucky = basicData.luckyUsers[type] || [];

  curLucky = curLucky.concat(currentLuckys);

  basicData.luckyUsers[type] = curLucky;

  if (currentPrize.count <= curLucky.length) {
    currentPrizeIndex--;
    if (currentPrizeIndex <= -1) {
      currentPrizeIndex = 0;
    }
    currentPrize = basicData.prizes[currentPrizeIndex];
  }

  if (currentLuckys.length > 0) {
    // todo by xc 添加数据保存机制，以免服务器挂掉数据丢失
    return setData(type, currentLuckys);
  }
  return Promise.resolve();
}

function changePrize() {
  curtLotteryList = {} //重置
  curtLotteryList = lotteryNum(currentPrizeIndex)
  let luckys = basicData.luckyUsers[currentPrize.type];
  // let luckyCount = (luckys ? luckys.length : 0) + EACH_COUNT[currentPrizeIndex];
  let luckyCount = (luckys ? luckys.length : 0) + curtLotteryList.perCount;
  // 修改左侧prize的数目和百分比
  setPrizeData(currentPrizeIndex, luckyCount);
  // 根据抽奖等级修改当前视图(避免刚访问时第一次调用特效)
  //理由为:抽奖结果卡片错乱
  if (currentPrizeIndex != currentScreenIndex) {
    changeScreen(currentPrizeIndex)
  }
  // console.log(currentPrizeIndex);
}

/**
 * 随机抽奖
 */
function random(num) {
  
  // Math.floor取到0-num-1之间数字的概率是相等的
  return Math.floor(Math.random() * num);
}

/**
 * 切换名牌人员信息
 */
function changeCard(cardIndex, user) {
  let card = threeDCards[cardIndex].element;

  card.innerHTML = `<div class="company">${COMPANY}</div><div class="name">${
    user[1]
    }</div><div class="details">${user[0]}<br/>${user[2] || "PSST"}</div>`;
}

/**
 * 切换名牌背景
 */
function shine(cardIndex, color) {
  let card = threeDCards[cardIndex].element;
  card.style.backgroundColor =
    color || "rgba(0,127,127," + (Math.random() * 0.7 + 0.25) + ")";
}

/**
 * 随机切换背景和人员信息
 */
function shineCard() {
  let maxCard = 15,
    maxUser;
  let shineCard = random(maxCard);

  setInterval(() => {
    // 正在抽奖停止闪烁
    if (isLotting) {
      return;
    }
    maxUser = basicData.leftUsers.length;
    for (let i = 0; i < shineCard; i++) {
      let index = random(maxUser),
        cardIndex = random(TOTAL_CARDS);
      // 当前显示的已抽中名单不进行随机切换
      if (selectedCardIndex.includes(cardIndex)) {
        continue;
      }
      shine(cardIndex);
      changeCard(cardIndex, basicData.leftUsers[index]);
    }
  }, 500);
}

function setData(type, data) {
  return new Promise((resolve, reject) => {
    window.AJAX({
      url: "/saveData",
      data: {
        type,
        data
      },
      success() {
        resolve();
      },
      error() {
        reject();
      }
    });
  });
}

function setErrorData(data) {
  return new Promise((resolve, reject) => {
    window.AJAX({
      url: "/errorData",
      data: {
        data
      },
      success() {
        resolve();
      },
      error() {
        reject();
      }
    });
  });
}

function exportData() {
  window.AJAX({
    url: "/export",
    success(data) {
      if (data.type === "success") {
        location.href = data.url;
      }
    }
  });
}

function reset() {
  window.AJAX({
    url: "/reset",
    success(data) {
      console.log("重置成功");
    }
  });
}

function createHighlight() {
  let year = new Date().getFullYear() + "";
  let step = 4,
    xoffset = 1,
    yoffset = 1,
    highlight = [];

  year.split("").forEach(n => {
    highlight = highlight.concat(
      NUMBER_MATRIX[n].map(item => {
        return `${item[0] + xoffset}-${item[1] + yoffset}`;
      })
    );
    xoffset += step;
  });

  return highlight;
}

let onload = window.onload;

window.onload = function () {
  onload && onload();

  let music = document.querySelector("#music");

  let rotated = 0,
    stopAnimate = false,
    musicBox = document.querySelector("#musicBox");

  function animate() {
    requestAnimationFrame(function () {
      if (stopAnimate) {
        return;
      }
      rotated = rotated % 360;
      musicBox.style.transform = "rotate(" + rotated + "deg)";
      rotated += 1;
      animate();
    });
  }

  musicBox.addEventListener(
    "click",
    function (e) {
      if (music.paused) {
        music.play().then(
          () => {
            stopAnimate = false;
            animate();
          },
          () => {
            addQipao("背景音乐自动播放失败，请手动播放！");
          }
        );
      } else {
        music.pause();
        stopAnimate = true;
      }
    },
    false
  );

  setTimeout(function () {
    musicBox.click();
  }, 1000);
};
