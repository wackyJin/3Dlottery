// let prizes1 = [{
//     type: 0,
//     count: 1000,
//     title: '主持人的祝福',
//     img: '../img/laptop.png'
// }, {//1
//     type: -2,
//     count: 5,
//     title: '笔记本电脑',
//     img: '../img/laptop.png'
// }, {//2
//     type: 1,
//     count: 15,
//     title: '华为手机',
//     img: '../img/handset.png'
// },
// {//3
//     type: 2,
//     count: 15,
//     title: 'iPad',
//     img: '../img/iPad.png'
// },
// {//4
//     type: 3,
//     count: 15,
//     title: '米家电动滑板车',
//     img: '../img/scooter.png'
// },
// {//5
//     type: -1,
//     count: 80,
//     title: '现金红包',
//     img: '../img/money.png'
// },
// {//6
//     type: 4,
//     count: 10,
//     title: '小浪智能衣物消毒烘干机',
//     img: '../img/dryer.png'
// }, {//7
//     type: 5,
//     title: '九阳空气炸锅',
//     count: 30,
//     img: '../img/air_fryer.png'
// }, {//8
//     type: 6,
//     title: '苏泊尔养生壶',
//     count: 50,
//     img: '../img/health_pot.png'
// }, {//9
//     type: 7,
//     title: '小米速干吹风机',
//     count: 50,
//     img: '../img/hair_dryer.png'
// }, {//10
//     type: 8,
//     title: '小米台灯',
//     count: 40,
//     img: '../img/table_lamp.png'
// }, {//11
//     type: 9,
//     title: '小米移动电源',
//     count: 40,
//     img: '../img/power.png'
// }
// ];
let prizes = [
    {
        type: 0,
        count: 1000,
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
    {//3
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
    {//4
        type: 3,
        count: 15,
        title: '米家电动滑板车',
        img: '../img/scooter.png'
    },
    {//5
        type: -3,
        count: 20,
        title: '现金红包',
        img: '../img/money.png'
    },
    {//6
        type: 4,
        count: 10,
        title: '小浪智能衣物消毒烘干机',
        img: '../img/dryer.png'
    },
    {//5
        type: -4,
        count: 20,
        title: '现金红包',
        img: '../img/money.png'
    }, {//7
        type: 5,
        title: '九阳空气炸锅',
        count: 30,
        img: '../img/air_fryer.png'
    },
    {//8
        type: 6,
        title: '苏泊尔养生壶',
        count: 50,
        img: '../img/health_pot.png'
    },
    {//9
        type: 7,
        title: '小米速干吹风机',
        count: 50,
        img: '../img/hair_dryer.png'
    },
    {//10
        type: 8,
        title: '小米台灯',
        count: 40,
        img: '../img/table_lamp.png'
    },
    {//11
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
const ROW_COUNT = 7;
const COLUMN_COUNT = 17;


/**
 * 高亮矩阵
 */
const HIGHLIGHT_CELL = ['1-1', '1-2', '1-3', '2-3', '3-1', '3-2', '3-3', '4-1', '5-1', '5-2', '5-3',//2
    '1-5', '1-6', '1-7', '2-5', '2-7', '3-5', '3-7', '4-5', '4-7', '5-5', '5-6', '5-7',  // 0
    '1-9', '1-10', '1-11', '2-11', '3-9', '3-10', '3-11', '4-9', '5-9', '5-10', '5-11',//2
    '1-13', '1-14', '1-15', '2-13', '2-15', '3-13', '3-15', '4-13', '4-15', '5-13', '5-14', '5-15'//0
];

module.exports = {
    prizes,
    EACH_COUNT,
    ROW_COUNT,
    COLUMN_COUNT,
    COMPANY,
    HIGHLIGHT_CELL
};