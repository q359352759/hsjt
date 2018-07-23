// pages/outprofit/outprofit.js
var id;
var app = getApp()
var tcity = require("../../utils/city.js");
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // provinces: [],
    // province: "",
    // citys: [],
    // city: "",
    // countys: [],
    // county: '',
    // value: [0, 0, 0],
    // values: [0, 0, 0],
    condition: false,
    cityData:[],
    qyopen: false,
    qyshow: true,
    select1: '',
    select2: '',
    select3: '',
    value:[0,0,0],

  },
    //选择起点，分类数据
    listqy: function (e) {

      if (this.data.qyopen) {
        this.setData({
          qyopen: false,//点击显示
          qyshow: false,//点击显示
        })
      } else {
        this.setData({
          qyopen: true,
          qyshow: false,
        })
      }
  
    },
    bindChange:function(e){
      console.log("eeee",e)
      let val=e.detail.value; 
      if(this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]]==undefined){
        console.log("fsdfsdf")
        console.log("+++++++++++iddd",this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city)
        let cityid=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city.id
        console.log("cityid",cityid)
        this.setData({
          value:e.detail.value,
          areaid:cityid,
  
        })
      }else{
         console.log("+++++++++++",this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]])
         console.log("id",this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]].id)

        this.setData({
          value:e.detail.value,
          areaid:this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]].id,
  
        })
  

      }
  
    },
    // handeclickOne:function(e){
      // console.log("e",e)
      // this.setData({
      //   select1:e.currentTarget.dataset.city,
      //   num:e.currentTarget.dataset.city
      // })
    // },
    // handeclicTwo:function(e){
      // console.log("e",e)
      // this.setData({
      //   select2:e.currentTarget.dataset.city,
      //   nums:e.currentTarget.dataset.city
      // })
    // },
    // handeclicKTree:function(e){
      // console.log("e",e)
      // let item=e.currentTarget.dataset.item.name
      // this.setData({
      //   select3:e.currentTarget.dataset.city,
      //   citytitle:item,
      //   qyshow:true,
  
      // })
    // },
    open: function () {
      this.setData({
        condition: !this.data.condition
      })
    },

    
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
      //获取区域地址
      check.getDatas({
        url: `https://www.hzjifen.com/zlwymaster/agent/manager/area/findArea`,
        cd: (data) => { 
              console.log("区域地址",data,) 

              this.setData({
                cityData:data
              })
              // console.log("city",this.data.cityData)
            },
        method:'GET',
        data:{},
      })
    var that = this;


    


    // 以下两个是测试数据
    let totalItems = 100;
    let rightItems = 80;
    let completePercent = parseInt((rightItems / totalItems) * 100);
    that.getResultComment(completePercent);
    that.showScoreAnimation(rightItems, totalItems);

    //获取浏览器宽度
    const width=150;
    const height=100
    const ctx = wx.createCanvasContext('myCanvas')
    // arc(圆的x坐标,   圆的y坐标,  圆的半径,   起始弧度'单位弧度（在3点钟方向）',  终止弧度,   true顺时针)
    //Math.PI 表示圆周律
    //fill 填充
    //stroke 绘制边框

    //蓝色
    ctx.beginPath()
    ctx.arc(width-18, height-77, 3, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill();
    ctx.beginPath()
    ctx.arc(width+18, height+77, 3, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill();
    //左边圆弧
    ctx.beginPath()
    ctx.arc(width, height, 80, Math.PI/2+0.2, 1.5 * Math.PI-0.2)
    ctx.setStrokeStyle('#333333')
    ctx.stroke();
    //右边半圆
    ctx.beginPath()
    ctx.arc(width, height, 80, Math.PI*1.5+0.2, Math.PI/2-0.2)
    ctx.setStrokeStyle('#333333')
    ctx.stroke();

    //中心虚线
    ctx.beginPath();
    ctx.setLineWidth(10);   //边框宽度
    ctx.setLineDash([1, 5]);
    ctx.arc(width,height,50,0,Math.PI*2-0.1);
    ctx.setStrokeStyle('#000000');
    ctx.stroke();
    ctx.draw();

    const myCanvas_2 = wx.createCanvasContext('myCanvas_2')
    myCanvas_2.beginPath()
    myCanvas_2.arc(width-18, height-97, 3, 0, 2 * Math.PI)
    myCanvas_2.setFillStyle('blue')
    myCanvas_2.fill();
    myCanvas_2.beginPath()
    myCanvas_2.arc(width+18, height+97, 3, 0, 2 * Math.PI)
    myCanvas_2.setFillStyle('blue')
    myCanvas_2.fill();
    //左边圆弧
    myCanvas_2.beginPath()
    myCanvas_2.arc(width, height, 100, Math.PI/2+0.2, 1.5 * Math.PI-0.2)
    myCanvas_2.setStrokeStyle('#333333')
    myCanvas_2.stroke();
    //右边半圆
    myCanvas_2.beginPath()
    myCanvas_2.arc(width, height, 100, Math.PI*1.5+0.2, Math.PI/2-0.2)
    myCanvas_2.setStrokeStyle('#333333')
    myCanvas_2.stroke();

    //中心虚线
    myCanvas_2.beginPath();
    myCanvas_2.setLineWidth(10);   //边框宽度
    myCanvas_2.setLineDash([1, 5]);
    myCanvas_2.setStrokeStyle('#000000');
    myCanvas_2.stroke();
    myCanvas_2.draw();

  
  },
  showScoreAnimation: function (rightItems, totalItems) {
    /*
    cxt_arc.arc(x, y, r, sAngle, eAngle, counterclockwise);
    x	                    Number	  圆的x坐标
    y	                    Number	  圆的y坐标
    r	                    Number	  圆的半径
    sAngle	            Number	  起始弧度，单位弧度（在3点钟方向）
    eAngle	            Number	  终止弧度
    counterclockwise	    Boolean	  可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
    */
     let that = this;
     let copyRightItems = 0;
     that.setData({
       timer: setInterval(function () {
         copyRightItems++;
         if (copyRightItems == rightItems) {
           clearInterval(that.data.timer)
         } else {
           // 页面渲染完成
           // 这部分是灰色底层
           let cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
           cxt_arc.setLineWidth(6);//绘线的宽度
           cxt_arc.setStrokeStyle('#d2d2d2');//绘线的颜色
           cxt_arc.setLineCap('round');//线条端点样式
           cxt_arc.beginPath();//开始一个新的路径
           cxt_arc.arc(53, 53, 50, 0, 2 * Math.PI, false);//设置一个原点(53,53)，半径为50的圆的路径到当前路径
           cxt_arc.stroke();//对当前路径进行描边
           //这部分是蓝色部分
           cxt_arc.setLineWidth(6);
           cxt_arc.setStrokeStyle('#3ea6ff');
           cxt_arc.setLineCap('round')
           cxt_arc.beginPath();//开始一个新的路径
           cxt_arc.arc(53, 53, 50, -Math.PI * 1 / 2, 2 * Math.PI * (copyRightItems / totalItems) - Math.PI * 1 / 2, false);
           cxt_arc.stroke();//对当前路径进行描边
           cxt_arc.draw();
         }
       }, 20)
     })
   },
   getResultComment: function (completePercent) {
    let that = this;
    switch (true) {
      case completePercent < 60:
        that.setData({
          resultComment: "渣渣"
        })
        break;
      case completePercent >= 60 && completePercent <= 69:
        that.setData({
          resultComment: "学弱"
        })
        break;
      case completePercent >= 70 && completePercent < 80:
        that.setData({
          resultComment: "中等"
        })
        break;
      case completePercent >= 80 && completePercent < 90:
        that.setData({
          resultComment: "良好"
        })
        break;
      case completePercent >= 90 && completePercent < 95:
        that.setData({
          resultComment: "优秀"
        })
        break;
      case completePercent >= 95 && completePercent < 100:
        that.setData({
          resultComment: "学霸"
        })
        break;
      case completePercent >= 100:
        that.setData({
          resultComment: "学神"
        })
        break;
    }
  },
  
 
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})