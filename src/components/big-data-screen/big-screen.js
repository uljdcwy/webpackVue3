import * as echarts from 'echarts';
import { instance } from "@/http/index.js"

export const initMap = () => {

    let currentZLevel = 0;
    let chinese = null; 
    let citys = null;
    let countys = null;

    const runMap = (data, center) => {
        myChart = echarts.init(chartDom);
        echarts.registerMap('chinese', data || chinese);

        option = {
            title: {
                text: '车场数据分布图',
            },
            visualMap: {
              left: 'right',
              min: 50,
              max: 100000,
              inRange: {
                color: [
                  '#313695',
                  '#4575b4',
                  '#74add1',
                  '#abd9e9',
                  '#e0f3f8',
                  '#ffffbf',
                  '#fee090',
                  '#fdae61',
                  '#f46d43',
                  '#d73027',
                  '#a50026'
                ]
              },
              text: ['High', 'Low'],
              // show: false,
              calculable: true
            },
            tooltip: {
              trigger: 'item',
            },
            stateAnimation: {
                duration: 1000
            },
            series: [
                {
                    name: '车场数据分布图',
                    type: 'map',
                    map: 'chinese',
                    roam: true,
                    emphasis: {
                        label: {
                            show: true
                        },
                        itemStyle: {
                            shadowOffsetX: 2,
                            shadowOffsetY: 2,
                            shadowBlur: 1
                        }
                    },
                    zoom: 0.8,
                    center: center,
                    data: []
                }
            ]
        };

        let listData = [];
        if(currentZLevel == 0){
            chinese.features.forEach((elem) => {
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random()*100000)
                })
            });
        }else if(currentZLevel == 1){
            citys.features.forEach((elem) => {
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random()*100000)
                })
            });
        }else{
            countys.features.forEach((elem) => {
                listData.push({
                    name: elem.properties.name,
                    value: Math.floor(Math.random()*100000)
                })
            });
        }
        option.series[0].data = listData;
        myChart.setOption(option);
        myChart.hideLoading();
    };

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    myChart.showLoading();
    getChina().then((res) => {
        chinese = res.data;
        runMap(chinese);
    })

    myChart.on('dblclick', function(params) {
        let data = null;
        if(currentZLevel == 0){
            myChart.showLoading();
            chinese && chinese.features.forEach((el) => {
                if(el.properties.name == params.name) {
                    let center = el.properties.center;
                    let adcode = el.properties.adcode;
                    data = el;
                    getProvince(adcode).then((res) => {
                        console.log(res.data,"res")
                        citys = res.data;
                        runMap(citys, center);
                    }).catch((res) => {
                        myChart.hideLoading();
                        console.log("获取错误", JSON.stringify(res));
                    })
                }
            });
            currentZLevel = 1;
        }else if(currentZLevel == 1){
            console.log(currentZLevel,"currentZLevel 1")
            myChart.showLoading();
            citys && citys.features.forEach((el) => {
                if(el.properties.name == params.name) {
                    let center = el.properties.center;
                    let adcode = el.properties.adcode;
                    data = el;
                    getCitys(adcode).then((res) => {
                        countys = res.data;
                        runMap(countys, center);
                    }).catch((res) => {
                        myChart.hideLoading();
                        console.log("获取错误", JSON.stringify(res));
                    })
                }
            });
            currentZLevel = 1.05;
        }else if(currentZLevel == 1.05){
            myChart.showLoading();
            countys && countys.features.forEach((el) => {
                if(el.properties.name == params.name) {
                    let center = el.properties.center;
                    let adcode = el.properties.adcode;
                    data = el;
                    getCounty(adcode).then((res) => {
                        runMap(res.data, center);
                    }).catch((res) => {
                        myChart.hideLoading();
                        console.log("获取错误", JSON.stringify(res));
                    })
                }
            });
        };

        if(!data){
            myChart.hideLoading();
            currentZLevel -= 1;
            return ;
        }
    });
}


const getChina = () => {
    return instance.get("/china.json")   
}
const getProvince = (adcode) => {
    return instance.get("/province/" + adcode + ".json");
}
const getCounty = (adcode) => {
    return instance.get("/county/" + adcode + ".json"); 
}
const getCitys = (adcode) => {
    return instance.get("/citys/" + adcode + ".json"); 
}