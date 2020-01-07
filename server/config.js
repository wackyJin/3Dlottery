const prizes = [
  {
      type: 0,
      count: 100,
      title: '主持人的祝福',
      img: '../img/laptop.png'
  },
  {//1
      type: 1,
      count: 6,
      title: '笔记本电脑5台/大疆无人机1个',
      img: '../img/special-award.png'
  },
  {//2
      type: 2,
      count: 17,
      title: '华为手机',
      img: '../img/handset.png'
  },
  {//3
      type: 3,
      count: 17,
      title: 'iPad',
      img: '../img/iPad.png'
  },
  {//4
      type: 4,
      count: 20,
      title: '米家电动滑板车',
      img: '../img/scooter.png'
  },
  {//5
      type: 5,
      count: 19,
      title: '小浪智能衣物消毒烘干机10台/大疆手机云台9台',
      img: '../img/dryer.png'
  },
  {//6
      type: 6,
      count: 30,
      title: '九阳空气炸锅',
      img: '../img/air_fryer.png'
  }, 
  {//7
      type: 7,
      title: '现金红包',
      count: 80,
      img: '../img/money.png'
  },
  {//8
      type: 8,
      title: '苏泊尔养生壶',
      count: 50,
      img: '../img/health_pot.png'
  },
  {//9
      type: 9,
      title: '小米速干吹风机',
      count: 60,
      img: '../img/hair_dryer.png'
  },
  {//10
      type: 10,
      title: '小米台灯',
      count: 60,
      img: '../img/table_lamp.png'
  },
  {//11
      type: 11,
      title: '小米移动电源',
      count: 71,
      img: '../img/power.png'
  }
];

/**
* 一次抽取的奖品个数
* 顺序为：[特别奖，一等奖，二等奖，三等奖，四等奖，五等奖]
*/
const EACH_COUNT = [1, 1, 17, 17, 20, 19, 30, 40, 25, 30, 30, 71];

const COMPANY = '';

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};
