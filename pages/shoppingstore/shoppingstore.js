// pages/shoppingstore/shoppingstore.js
// var cityData = require('../../utils/city.js');
function initSubMenuDisplay() { 
  return ['hidden', 'hidden', 'hidden'];
}
var initSubMenuHighLight = [
  ['','','','',''],
  ['',''],
  ['','','']
];
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)

Page({

  /**
   * 页面的初始数据
   */
  data: {



    subMenuDisplay:initSubMenuDisplay(),
    imgUrls: [
      "../../images/shopping/012.jpg",
      "../../images/shopping/0123.jpg",
      "../../images/shopping/0124.jpg",
     
    ],
  // tab切换 
    winWidth: 0,  
    winHeight: 0,       
    currentTab: 0,  
    // tab切换结束
      //选择的终点城市暂存数据，分累数据
      endselect: "",
      //终点缓存的五个城市
      endcitys: [],
      //用户选择省份之后对应的城市和县城
      endkeys: {},
      //用户选择县城
      town: [],

      displaycity: 0,
      citytitle: "分类", 
      city1: "目的地",
      qyopen: false,
      qyshow: true,
      nzopen: false,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      isfull: false, 
      city:[],
      select1: '',
      select2: '',
      select3: '',
      shownavindex: '',
      //分类数据
      //改变字体颜色
      // pageBackgroundColor,
      select:"",
      _num:1,
      num:0,
      nums:0,
      Allgoods:{//全部宝贝下的综合分类
        url: `${baseUrl}/zlwymaster/mall/mobile/product/findselfSupporting`,//后面接口名字
        rows:[],
        All:{//全部宝贝下的销量数据
          Salesrows:[],   
        },
        Price:{//全部宝贝下的价格数据
          Pricerows:[],   
        }
      },
      newGoods:{//全部宝贝下的综合分类
        url: `${baseUrl}/zlwymaster/mall/mobile/product/findNewProduct`,//后面接口名字
        rows:[],
      }
      
  
  },


//销量菜单
  tapMainMenu: function(e) {//        获取当前显示的一级菜单标识
    // console.log(e)
    let index_i=e.currentTarget.dataset.index
    // console.log(index_i)
    if(index_i==0){
      this.getDatas({
        url: this.data.Allgoodsurl,
        cd: (data) => {
          console.log("排序条件 0",data)  
          for(let i=0;i<data.length;i++){
            data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');
  
          }
          this.data.Allgoods.rows= data;
          this.setData(this.data)
        },
        method:'GET',
        data:{type:0,size:50},
      })

    }else if(index_i==1){
      this.getDatas({
        url: this.data.Allgoods.url,
        cd: (data) => {
          console.log("排序条件 2",data)
          for(let i=0;i<data.length;i++){
            data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');
  
          }
          this.data.Allgoods.All.Salesrows = data;
          this.setData(this.data)
        },
        method:'GET',
        data:{type:1,size:50},
      })
    }
    else if(index_i==2){
      this.getDatas({
        url: this.data.Allgoods.url,
        cd: (data) => {
          console.log("排序条件 3",data)
          for(let i=0;i<data.length;i++){
            data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');
  
          }
          this.data.Allgoods.Price.Pricerows = data;
          this.setData(this.data)
        },
        method:'GET',
        data:{type:2,size:50},
      })
    }
    this.setData({
      _num:e.target.dataset.num
   })
    var index = parseInt(e.currentTarget.dataset.index);        // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if(this.data.subMenuDisplay[index] == 'hidden') {
        newSubMenuDisplay[index] = 'show';
    } else {
        newSubMenuDisplay[index] = 'hidden';
    }        // 设置为新的数组
    this.setData({
        subMenuDisplay: newSubMenuDisplay,
        // _num:e.target.dataset.num,
    
    });
},

//获取当前显示的一级菜单标识
// tapSubMenu: function(e) { 
//   var index = parseInt(e.currentTarget.dataset.index);
//   // console.log(index);  // 隐藏所有一级菜单
//   this.setData({ 
//      subMenuDisplay: initSubMenuDisplay() 
//   }); 
// },
// tapSubMenu: function(e) {        // 隐藏所有一级菜单
//   this.setData({
//       subMenuDisplay: initSubMenuDisplay()
//   });        // 处理二级菜单，首先获取当前显示的二级菜单标识
//   var indexArray = e.currentTarget.dataset.index.split('-');        // 初始化状态
//   // var newSubMenuHighLight = initSubMenuHighLight;
//   for (var i = 0; i < initSubMenuHighLight.length; i++) {            // 如果点中的是一级菜单，则先清空状态，即非高亮模式，然后再高亮点中的二级菜单；如果不是当前菜单，而不理会。经过这样处理就能保留其他菜单的高亮状态
//       if (indexArray[0] == i) {                for (var j = 0; j < initSubMenuHighLight[i].length; j++) {                    // 实现清空
//               initSubMenuHighLight[i][j] = '';
//           }                // 将当前菜单的二级菜单设置回去
//       }
//   }        // 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
//   initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';        // 设置为新的数组
//   this.setData({
//       subMenuHighLight: initSubMenuHighLight
//   });
// },
//销量菜单结束



  //选择起点，分类数据
  listqy: function (e) {
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/productCategory`,
      cd: (data) => {
        console.log("数据",data)
          this.data.city=data.data
        this.setData(this.data)  
      },
      method:'GET',
      data:{},
    })
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
  handeclickOne:function(e){
    this.setData({
      select1:e.currentTarget.dataset.city,
      num:e.currentTarget.dataset.city
    })
  },
  handeclicTwo:function(e){
    this.setData({
      select2:e.currentTarget.dataset.city,
      nums:e.currentTarget.dataset.city
    })
  },
  handeclicKTree:function(e){
    let item=e.currentTarget.dataset.item.name
    this.setData({
      select3:e.currentTarget.dataset.city,
      citytitle:item,
      qyshow:true,

    })
  },

  

   //点击切换
   mySelect:function(e){
    //  console.log(e)
    this.setData({
      firstPerson:e.target.dataset.me,
      selectPerson:true,
      selectArea:false,
    })
   },
  // swiper切换
  bindChange: function( e ) {  
    // console.log(e)
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      select: !that.data.select
    });
    //swiper切换
    var that = this;  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });
     //swiper切换结束
     //动态获取数据

     this.getDatas({
      url: this.data.Allgoods.url,
      cd: (data) => {
        console.log("加载商品",data)
        for(let i=0;i<data.length;i++){
          data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');

				}
        this.data.Allgoods.rows = data;

        this.setData(this.data)
      },
      method:'GET',
      data:{type:0,size:50},
    })

     
  
  },
  //点击全部渲染全部的列表
list:function(){
  this.getDatas({
    url: this.data.newGoods.url,
    cd: (data) => {
      console.log("商品",data)
      for(let i=0;i<data.length;i++){
        data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');
      }
      this.data.Allgoods.rows = data;
      this.setData(this.data)
    },
    method:'GET',
    data:{type:0,size:50},
  })

},
  //新品
listnews:function(){
  this.getDatas({
    url: this.data.newGoods.url,
    cd: (data) => {
      console.log("新品商品",data)
      for(let i=0;i<data.length;i++){
        data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');

      }
      this.data.newGoods.rows = data;
      this.setData(this.data)
    },
    method:'GET',
    data:{},
  })
},

   
  //请求数据
  getDatas( {url, cd,method,data} ) {
    // console.log("传过来的数据",url,cd,method,data)
    wx.request({
      url, //仅为示例，并非真实的接口地址 
      method,
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        cd(res.data)
      }
    })
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