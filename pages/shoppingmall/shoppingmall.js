// pages/shoppingmall/shoppingmall.js
const { globalData: { baseUrl } } = getApp();
// console.log(baseUrl)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotShopingStore: {
      // title: '',
      // type: 'hotShopingStore',
      url: `${baseUrl}/zlwymaster/mall/mobile/shop/findShopByTime`,//后面接口名字
      rows:[],
    },
    hotShoppingGoods: {
      url: `${baseUrl}/zlwymaster/mall/mobile/product/findselfSupporting`,//后面接口名字
      rows:[],
      pageSize: 50,//start
      totalRow: 0,//conunt,总条数
      pageNumber:1,//显示的那页
    },
    findEvaluatByProduct:{
      url: `${baseUrl}/zlwymaster/mall/mobile/evaluat/findEvaluatByProduct`,//后面接口名字
      rows:[],
      pageSize: 50,//start
      totalRow: 0,//conunt,总条数
      pageNumber:1,//显示的那页
    },

    imgUrls: [
      "../../images/shopping/012.jpg",
      "../../images/shopping/0123.jpg",
      "../../images/shopping/0124.jpg",
     
    ],
  
  },
  ready(){
    // console.log("商铺",this.data.hotShopingStore)
  },
  detailGoods:function(e){
    console.log(e.detail.currentTarget.dataset.item.id)
    let id=e.detail.currentTarget.dataset.item.id;
    wx.navigateTo({
      url:`../detailshopping/detailshopping?id=${id}`
    })
  },

  moreshop:function(){
    console.log("morestore")
    wx.navigateTo({
      url:"../morestore/morestore"
    })
  },
  moregoods:function(){
    console.log("shoppingstore")
    wx.switchTab({
      url:"../shoppingstore/shoppingstore"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  ready(){
  
  },
  onLoad: function (options) {
    this.getDatas({//商铺
      url: this.data.hotShopingStore.url ,
      cd: (data) => {
        console.log("热门商铺",data)
        this.data.hotShopingStore.rows = data;
        this.setData(this.data)
      },
      method:'GET',
      data:{size:10}
    })

    this.getDatas({//商品
      url: this.data.hotShoppingGoods.url,
      cd: (data) => {
        console.log("热门分页商品",data)
        for(let i=0;i<data.length;i++){
          data[i].imagepath=data[i].imagepath=='' ? [] : data[i].imagepath.split(',');

				}
        this.data.hotShoppingGoods.rows = data;//数据
          this.setData(this.data)
       
      },
      method:'GET',
      data:{
        size:this.data.hotShoppingGoods.pageSize,
        // num:this.data.hotShoppingGoods.pageNumber,
        type:0
      },//size:条数，num:页数
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
   
  //滚动底部顶部按需加载，需后台分页处理， start: 0,count: 0,total: 0,
  lower() {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: () => {
        this.data.hotShoppingGoods.pageNumber++;
       console.log("+++++++++,请求的条数，总条数",this.data.hotShoppingGoods.pageSize,this.data.hotShoppingGoods.totalRow)
       let  url=this.data.hotShoppingGoods.url;
        this.getDatas({
          url,
          method:'GET',
          data:{
            type:0,
            size: 10,
            num:this.data.hotShoppingGoods.pageNumber,
          },
          cd:(data) => {
            wx.hideLoading()
            // if(data.list.length!=[]){
            //   console.log("loyew",data.list)
            //   let arr2=data.list;
            //    for(var i=0;i<arr2.length;i++){
            //     this.data.hotShoppingGoods.rows.push(arr2[i]) 
            //    }
            //    this.setData(this.data)
            // }else{
            //   wx.showToast({
            //     title: '已经到底了',
            //     icon : 'warn', 
            //     duration: 500,
            //   })
            // }
        

          }
          
        })
        
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