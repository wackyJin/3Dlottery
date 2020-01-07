const MAX_TOP = 300,
    MAX_WIDTH = document.body.clientWidth;

let defaultType = 0;

let prizes;
const DEFAULT_MESS = ['我是该抽中一等奖还是一等奖呢，纠结ing...', '听说要提前一个月吃素才能中大奖喔！', '好想要无人机啊！！！', '一等奖有没有人想要呢？', '五等奖也不错，只要自己能中奖就行', '祝大家新年快乐！', '中不中奖不重要，大家吃好喝好。', '我已经有了天猫精灵了，要是再中个小度，那我该宠谁呢？', '2019年，祝福大家事事顺遂。', '作为专业陪跑的我，我就看看你们有谁跟我一样', '2019祝福TENDA越来越好！', '2019了，有没有要生猪宝宝的？', '来年再战！！！', '去年UI组全员陪跑，今年是否还是如此呢？', '我们UI组至少要重一个大奖吧'];

let lastDanMuList = [];

let prizeElement = {},
    lasetPrizeIndex = 0;
class DanMu {
    constructor(option) {
        if (typeof option !== 'object') {
            option = {
                text: option
            };
        }

        this.position = {};
        this.text = option.text;
        this.onComplete = option.onComplete;

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.className = 'dan-mu';
        document.body.appendChild(this.element);

        this.start();
    }

    setText(text) {
        this.text = text || this.text;
        this.element.textContent = this.text;
        this.width = this.element.clientWidth + 100;
    }

    start(text) {
        let speed = ~~(Math.random() * 10000) + 6000;
        this.position = {
            x: MAX_WIDTH
        };
        let delay = speed / 10;

        this.setText(text);
        this.element.style.transform = 'translateX(' + this.position.x + 'px)';
        this.element.style.top = ~~(Math.random() * MAX_TOP) + 10 + 'px';
        this.element.classList.add('active');
        this.tween = new TWEEN.Tween(this.position).to({
                x: -this.width
            }, speed)
            .onUpdate(() => {
                this.render();
            }).onComplete(() => {
                this.onComplete && this.onComplete();
            })
            .start();

    }

    render() {
        this.element.style.transform = 'translateX(' + this.position.x + 'px)';
    }
}

class Qipao {
    constructor(option) {
        if (typeof option !== 'object') {
            option = {
                text: option
            };
        }

        this.text = option.text;
        this.onComplete = option.onComplete;
        this.$par = document.querySelector('.qipao-container');
        if (!this.$par) {
            this.$par = document.createElement('div');
            this.$par.className = 'qipao-container';
            document.body.appendChild(this.$par);
        }

        this.init();
    }

    init() {
        this.element = document.createElement('div');
        this.element.className = 'qipao animated';
        this.$par.appendChild(this.element);

        this.start();
    }

    setText(text) {
        this.text = text || this.text;
        this.element.textContent = this.text;
    }

    start(text) {
        this.setText(text);
        this.element.classList.remove('bounceOutRight');
        this.element.classList.add('bounceInRight');

        setTimeout(() => {
            this.element.classList.remove('bounceInRight');
            this.element.classList.add('bounceOutRight');
            this.onComplete && this.onComplete();
        }, 4000);
    }
}

let addQipao = (() => {
    let qipaoList = [];
    return function(text) {
        let qipao;
        if (qipaoList.length > 0) {
            qipao = qipaoList.shift();
        } else {
            qipao = new Qipao({
                onComplete() {
                    qipaoList.push(qipao);
                }
            });
        }

        qipao.start(text);
    }
})();

function setPrizes(pri) {
    prizes = pri;
    defaultType = prizes[0]['type'];
    lasetPrizeIndex = pri.length - 1;
}

function showPrizeList(currentPrizeIndex) {
    let currentPrize = prizes[currentPrizeIndex];
    if (currentPrize.type === defaultType) {//特等奖
        currentPrize.count === '不限制';
    }
    let tp = currentPrize.type;
    let htmlCode = `<div class="prize-mess">正在抽取
    <label id="prizeType" class="prize-shine">${tp==7?'幸运奖': (tp==1?'特别奖':tp>7?(tp-1+'等奖'):(tp+'等奖'))}</label>
     <label id="prizeText" class="prize-shine">${currentPrize['title']}</label>，
     剩余<label id="prizeLeft" class="prize-shine">${currentPrize['count']}</label>个</div><ul class="prize-list">`;
    // let htmlCode = `<div class="prize-mess">正在抽取<label id="prizeType" class="prize-shine">${currentPrize.type +'等奖'}</label><label id="prizeText" class="prize-shine">${currentPrize['title']}</label>，剩余<label id="prizeLeft" class="prize-shine">${currentPrize['count']}</label>个</div><ul class="prize-list">`;
    prizes.forEach(item => {
        if (item.type === defaultType) {
            return true;
        }
        htmlCode += `<li id="prize-item-${item.type}" class="prize-item ${(item.type == currentPrize.type ? "shine": '')}">
                        <div class="prize-img">
                            <img src="${item.img}" alt="${item.title}">
                        </div>
                        <div class="prize-text">
                            <h5 class="prize-title ${item.title.length>8?'prize-title-sm':''}">${item.type==7?'幸运奖': (item.type==1?'特别奖':item.type>7?(item.type-1+'等奖'):(item.type+'等奖'))} ${item.title}</h5>
                            <div class="prize-count">
                                <div class="progress">
                                    <div id="prize-bar-${item.type}" class="progress-bar progress-bar-danger progress-bar-striped active" style="width: 100%;">
                                    </div>
                                </div>
                                <div id="prize-count-${item.type}" class="prize-count-left">
                                    ${item.count + '/' + item.count}
                                </div>
                            </div>
                        </div>
                    </li>`
    });
    htmlCode += `</ul>`;

    document.querySelector('#prizeBar').innerHTML = htmlCode;
}

function resetPrize(currentPrizeIndex) {
    prizeElement = {};
    lasetPrizeIndex = currentPrizeIndex;
    showPrizeList(currentPrizeIndex);
}

let setPrizeData = (function() {
    return function(currentPrizeIndex, count, isInit) {
        let currentPrize = prizes[currentPrizeIndex],
            type = currentPrize.type,
            elements = prizeElement[type],
            totalCount = currentPrize.count;

        if (!elements) {
            elements = {
                box: document.querySelector(`#prize-item-${type}`),
                bar: document.querySelector(`#prize-bar-${type}`),
                text: document.querySelector(`#prize-count-${type}`)
            }
            prizeElement[type] = elements;
        }

        if (!prizeElement.prizeType) {
            prizeElement.prizeType = document.querySelector('#prizeType');
            prizeElement.prizeLeft = document.querySelector('#prizeLeft');
            prizeElement.prizeText = document.querySelector('#prizeText');
        }

        if (isInit) {
            for (let i = prizes.length - 1; i > currentPrizeIndex; i--) {
                let type = prizes[i]['type'];
                document.querySelector(`#prize-item-${type}`).className = 'prize-item done';
                document.querySelector(`#prize-bar-${type}`).style.width = '0';
                document.querySelector(`#prize-count-${type}`).textContent = '0' + '/' + prizes[i]['count'];
            }
        }

        if (lasetPrizeIndex !== currentPrizeIndex) {
            let lastPrize = prizes[lasetPrizeIndex],
                lastBox = document.querySelector(`#prize-item-${lastPrize.type}`);
            lastBox.classList.remove('shine');
            lastBox.classList.add('done');
            elements.box && elements.box.classList.add('shine');
            let tp = currentPrize.type;
            //当前正在抽奖项标题设置(奖项名)
            prizeElement.prizeType.textContent = (tp==3||tp==5||tp==7||tp==9)?'幸运奖': (tp==1?'特别奖':tp==2?'1等奖':tp==4?'2等奖':tp==6?'3等奖':tp==8?'4等奖':(tp-5+'等奖'));
            prizeElement.prizeText.textContent = currentPrize.title;

            lasetPrizeIndex = currentPrizeIndex;
        }

        if (currentPrizeIndex === 0) {
            prizeElement.prizeType.textContent = '主持人的祝福';
            prizeElement.prizeText.textContent = '';
            prizeElement.prizeLeft.textContent = '不限制';
            return;
        }
        count = totalCount - count;
        let percent = (count / totalCount).toFixed(2);
        elements.bar && (elements.bar.style.width = percent * 100 + '%');
        elements.text && (elements.text.textContent = count + '/' + totalCount);
        prizeElement.prizeLeft.textContent = count;
    }
})();

function startMaoPao() {
    let len = DEFAULT_MESS.length,
        count = 5,
        index = ~~(Math.random() * len),
        danmuList = [],
        total = 0;

    function restart() {
        total = 0;
        danmuList.forEach(item => {
            let text = lastDanMuList.length > 0 ? lastDanMuList.shift() : DEFAULT_MESS[index++];
            item.start(text);
            index = index > len ? 0 : index;
        });
    }

    for (let i = 0; i < count; i++) {

        setTimeout(() => {
            danmuList.push(new DanMu({
                text: DEFAULT_MESS[index++],
                onComplete: function() {
                    setTimeout(() => {
                        this.start(DEFAULT_MESS[index++]);
                        index = index > len ? 0 : index;
                    }, 1000);
                }
            }));
            index = index > len ? 0 : index;
        }, 1500 * i);
    }
}

function addDanMu(text) {
    lastDanMuList.push(text);
}

export {
    startMaoPao,
    showPrizeList,
    setPrizeData,
    addDanMu,
    setPrizes,
    resetPrize,
    addQipao
}