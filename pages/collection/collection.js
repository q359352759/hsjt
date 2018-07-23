// pages/collection/collection.js
const { globalData: { baseUrl } } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    userId:null,//当前用户的ID
    Goods:{
      GoodsRows:[],
    }

  
  },
  ClickDel:function(e){
    let productid=e.detail.currentTarget.dataset.item.productid
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: (res) =>{
        if (res.confirm) {
          this.delGoods(productid);
        }
      }
    })

   
 

  },
  //获取用户收藏的商品
  getGoodsData() {
      this.getDatas({
        url: `${baseUrl}/zlwymaster/mall/mobile/favorites/findfavorites`,
        cd: (res) => {
          // console.log("查询用户收藏的宝贝",res) 
          for(let i=0;i<res.list.length;i++){
            res.list[i].imagepath= res.list[i].imagepath = ''?[]: res.list[i].imagepath.split(',')
          }
          this.data.Goods.GoodsRows=res.list
          this.setData(this.data)
          
        },
        method:'POST',
        data:{
        id:this.data.userId,//当前用户的ID
          type:0,//0 商品 1 店铺
        }
      })   
  },
  //删除收藏商品
  delGoods(productid){
          this.getDatas({
            url: `${baseUrl}/zlwymaster/mall/mobile/favorites/cancelfavorites`,
            cd: (res) => {
              this.getGoodsData()
            },
            method:'POST',
            data:{
              mid:this.data.userId,//当前用户的ID
              id:productid,//店铺id 或者商品id
              type:0,//0 商品 1 店铺
            }
          })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取用户ID
      try {
        var value = wx.getStorageSync('userid')
        if (value) {
          this.setData({
                  userId:value.id,
                  openid:value.openid
                })    
        }
      } catch (e) {
        console.log("errr",e)
    
      }
    this.getGoodsData()
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
  
  },
  //请求数据
  getDatas( {url, cd,method,data} ) {
    // console.log("传过来的数据",url,cd,method,data)
    wx.request({
      url, //仅为示例，并非真实的接口地址 
      method,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        cd(res.data)
      }
    })
  },
  // 切换
  bindChange: function( e ) {  
    console.log(e)
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