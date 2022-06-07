import React, { useEffect, useRef,useState } from 'react'
import * as echarts from 'echarts';
import 'echarts/map/js/china'
import axios from 'axios';
export default function App() {
  const [flag, setflag] = useState(true)
  const NowRef = useRef(null)
  const TotalRef = useRef(null)
  useEffect(() => {
    const arr1 = [];
    const arr2=[];
    axios.get('http://localhost:3000/api/aaa').then(res => {
      for (let i = 0; i < res.data.data.areaTree[2].children.length; i++) {
        const { total, name } = res.data.data.areaTree[2].children[i]
        let item1 = {};
        let item2={};
        item1.name = name;
        item2.name=name;
        item2.value=total.confirm
        item1.value = total.confirm - total.dead - total.heal;
        arr1.push(item1);
        arr2.push(item2);
      }
    }).then(res => {
      const dataList1 = arr1
      const dataList2=arr2
      renderNView(dataList1)
      renderTView(dataList2)
    })
    return () => {
      window.onresize = null
    }
  }, [])
  const renderNView = (dataList) => {
    var myChart = echarts.init(NowRef.current);
    var option = {
      // 进行相关配置
      title: {
        // 标题组件
        text: "中国现有确诊分布图", // 主标题文本
        // subtext: '数据来源于 xx平台', // 副标题文本
        // sublink: 'http://xxx.html', // 副标题文本超链接
        left: "center", // title 组件离容器左侧的距离,如果值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。
        textStyle: {
          color: "#000" // 主标题文字的颜色
        }
      },
      tooltip: {
        // 提示框
        trigger: "item", // 触发类型
        showDelay: 0, // 浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。
        transitionDuration: 0.2, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
        formatter: function (params) { // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          let { data = {} } = params; // 第一个参数 `params` 是 formatter 需要的数据集
          let { value = 0 } = data;  // 传入的数据值
          // params.name 数据名，类目名
          return `${params.name}<br/>现有确诊: ${value}`;
        }

      }, // 鼠标移到图里面的浮动提示框
      dataRange: {
        // show: false,
        // text: ["High", "Low"],
        // realtime: true,
        // calculable: true,
        // color: ["#FFFAFA", "#FFE4B5", "#F4A460","#FF6347","#A52A2A","#8B4513","#800000"],
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 10000, label: '>= 10000  极高', color: '#800000' },
          { start: 1000, end: 9999, label: '1000-9999  极高', color: '#8B4513' },
          { start: 500, end: 999, label: '> 500 - 999  极高', color: '#A52A2A' },
          { start: 100, end: 499, label: '100 - 499  高', color: '#FF6347' },
          { start: 10, end: 99, label: '10 - 109  中', color: '#F4A460' },
          { start: 1, end: 9, label: '1 - 9  低', color: '#FFE4B5' },
          { start: 0, end: 0, label: '0 无数据', color: '#FFFAFA' }
        ]
      },
      geo: {
        // 这个是重点配置区
        map: "china", // 表示中国地图
        roam: true,
        label: {
          normal: {
            show: true, // 是否显示对应地名
            textStyle: {
              color: "black",
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: "skyblue",
            borderWidth: "2",
            areaColor: "white",
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo", // 对应上方配置
        },
        {
          name: "", // 浮动框的标题
          type: "map",
          geoIndex: 0,
          data: dataList
        },
      ],
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
  }
  const renderTView = (dataList) => {
    var myChart = echarts.init(TotalRef.current);
    var option = {
      // 进行相关配置
      title: {
        // 标题组件
        text: "中国累计确诊分布图", // 主标题文本
        // subtext: '数据来源于 xx平台', // 副标题文本
        // sublink: 'http://xxx.html', // 副标题文本超链接
        left: "center", // title 组件离容器左侧的距离,如果值为`'left'`, `'center'`, `'right'`，组件会根据相应的位置自动对齐。
        textStyle: {
          color: "#000" // 主标题文字的颜色
        }
      },
      tooltip: {
        // 提示框
        trigger: "item", // 触发类型
        showDelay: 0, // 浮层显示的延迟，单位为 ms，默认没有延迟，也不建议设置。
        transitionDuration: 0.2, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
        formatter: function (params) { // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          let { data = {} } = params; // 第一个参数 `params` 是 formatter 需要的数据集
          let { value = 0 } = data;  // 传入的数据值
          // params.name 数据名，类目名
          return `${params.name}<br/>累计确诊: ${value}`;
        }

      }, // 鼠标移到图里面的浮动提示框
      dataRange: {
        // show: false,
        // text: ["High", "Low"],
        // realtime: true,
        // calculable: true,
        // color: ["#FFFAFA", "#FFE4B5", "#F4A460","#FF6347","#A52A2A","#8B4513","#800000"],
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 10000, label: '>= 10000  极高', color: '#800000' },
          { start: 1000, end: 9999, label: '1000-9999  极高', color: '#8B4513' },
          { start: 500, end: 999, label: '> 500 - 999  极高', color: '#A52A2A' },
          { start: 100, end: 499, label: '100 - 499  高', color: '#FF6347' },
          { start: 10, end: 99, label: '10 - 109  中', color: '#F4A460' },
          { start: 1, end: 9, label: '1 - 9  低', color: '#FFE4B5' },
          { start: 0, end: 0, label: '0 无数据', color: '#FFFAFA' }
        ]
      },
      geo: {
        // 这个是重点配置区
        map: "china", // 表示中国地图
        roam: true,
        label: {
          normal: {
            show: true, // 是否显示对应地名
            textStyle: {
              color: "black",
            },
          },
        },
        itemStyle: {
          normal: {
            borderColor: "skyblue",
            borderWidth: "2",
            areaColor: "white",
          },
          emphasis: {
            areaColor: null,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo", // 对应上方配置
        },
        {
          name: "", // 浮动框的标题
          type: "map",
          geoIndex: 0,
          data: dataList
        },
      ],
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize = () => {
      myChart.resize()
    }
  }
  const change=()=>{
    setflag(!flag)
    console.log(flag);
  }
  return (
    <div>
      <button onClick={change}>switch</button>
      <div ref={NowRef} style={{ height: '550px', width: '99vw',display:flag?'':'none' }}></div>
      <div ref={TotalRef} style={{ height: '550px', width: '99vw',display:flag?'none':'' }}></div>
    </div>
  )
}
