const prizes = [
  {
      type: 0,
      count: 100,
      title: '主持人的祝福',
      img: '../img/laptop.png'
  },
  {//1
      type: 99,
      count: 5,
      title: '笔记本电脑',
      img: '../img/laptop.png'
  },
  {//2
      type: 1,
      count: 15,
      title: '华为手机',
      img: '../img/handset.png'
  },
  {//3
      type: -1,
      count: 20,
      title: '现金红包',
      img: '../img/money.png'
  },
  {//4
      type: 2,
      count: 15,
      title: 'iPad',
      img: '../img/iPad.png'
  },
  {//5
      type: -2,
      count: 20,
      title: '现金红包',
      img: '../img/money.png'
  },
  {//6
      type: 3,
      count: 15,
      title: '米家电动滑板车',
      img: '../img/scooter.png'
  },
  {//7
      type: -3,
      count: 20,
      title: '现金红包',
      img: '../img/money.png'
  },
  {//8
      type: 4,
      count: 20,
      title: '小浪智能衣物消毒烘干机/大疆手机云台',
      img: '../img/dryer.png'
  },
  {//9
      type: -4,
      count: 20,
      title: '现金红包',
      img: '../img/money.png'
  }, {//10
      type: 5,
      title: '九阳空气炸锅',
      count: 30,
      img: '../img/air_fryer.png'
  },
  {//11
      type: 6,
      title: '苏泊尔养生壶',
      count: 50,
      img: '../img/health_pot.png'
  },
  {//12
      type: 7,
      title: '小米速干吹风机',
      count: 50,
      img: '../img/hair_dryer.png'
  },
  {//13
      type: 8,
      title: '小米台灯',
      count: 40,
      img: '../img/table_lamp.png'
  },
  {//14
      type: 9,
      title: '小米移动电源',
      count: 40,
      img: '../img/power.png'
  }
];

/**
* 一次抽取的奖品个数
* 顺序为：[特别奖，一等奖，二等奖，三等奖，四等奖，五等奖]
*/
const EACH_COUNT = [1, 1, 15, 20, 15, 20, 15, 20, 10, 20, 30, 50, 50, 40, 40];

const COMPANY = '';

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};
