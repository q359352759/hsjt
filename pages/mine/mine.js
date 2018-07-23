// pages/mine/mine.js

const app = getApp()
const { globalData: { baseUrl } } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfo: {},
    index:1,
    id:null,
    openid:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userdata:{},//用户的基本信息
    userAssets:{},//用户的资产信息
       
  
  },
  //点击进入查看更多订单
  ordermore:function(){
    wx.navigateTo({
      url: '../mineorder/mineorder?currentTab=0'
    })
  },
  //点击进入提现
  putForward:function(){
    wx.navigateTo({
      url: '../outmoney/outmoney'
    })
  },

//收藏
  shouConllection:function(e){
    console.log("发斯蒂芬",e)
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
      //业务管理
  pendingPayment:function(){
    wx.navigateTo({
      url: '../mineorder/mineorder?currentTab=1'
    })
  },
      //待发货
  pendingDelivery:function(){
    wx.navigateTo({
      url: '../mineorder/mineorder?currentTab=2'
    })
  },
      //待收货
  pendingGoods:function(){
    wx.navigateTo({
      url: '../mineorder/mineorder?currentTab=3'
    })
  },
      //待评价
  pendingEvaluated:function(){
    wx.navigateTo({
      url: '../mineorder/mineorder?currentTab=4'
    })
  },
  //购物车
  shoppingCart:function(e){
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart'
    })
  },
    //商品管理
  shoppingManagement:function(e){
    // wx.navigateTo({
    //   url: '../collection/collection'
    // })
  },
    //业务管理
  businessManagement:function(e){
    wx.navigateTo({
      url: '../management/management'
    })
  },
  //登录
  businesslogin:function(e){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  

    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../account/account'
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
   //同步获取本地数据判断是否进入登录页面
    // try {
    //   var value = wx.getStorageSync('userid')
    //   if (value) {
    //     this.setData({
    //             id:value.id,
    //             openid:value.openid
    //           })    
    //   }
    // } catch (e) {
    //   console.log("errr",e)
  
    // }


  //判断用户是否进入登录页面
    //  console.log("onload",this.data.id)
    //   if(this.data.id==null){   
    //     wx.navigateTo({
    //       url: '../logs/logs'
    //     })
    //   }
    //   else if(this.data.id!=null){
    //     wx.switchTab({
    //       url: "/pages/mine/mine",
    //     })
    //   };
    //   this.getDatas({
    //     url: `${baseUrl}/zlwymaster/platform/cmembers/userInfo`,
    //     cd: (data) => {
    //       console.log("用户数据",data) 
    //       // this.setData({
    //       //   userdata:data.data,
    //       // })
    //     },
    //     method:'POST',
    //     data:{
    //       	uId:this.data.id,
    //     },
    //   })

    },

    // 请求数据
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


  //点击授权
  // getUserInfo: function(e) {
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      //同步获取本地数据判断是否进入登录页面
      try {
        var value = wx.getStorageSync('userid')
        if (value) {
          this.setData({
                  id:value.id,
                  openid:value.openid
                })    
        }
      } catch (e) {
        console.log("errr",e)
    
      }
        console.log("onShowid",this.data.id)

          //判断用户是否进入登录页面
     console.log("onload",this.data.id)
     if(this.data.id==null){   
       wx.navigateTo({
         url: '../logs/logs'
       })
     }
     else if(this.data.id!=null){
       wx.switchTab({
         url: "/pages/mine/mine",
       })
     };
     this.getDatas({
       url: `${baseUrl}/zlwymaster/platform/cmembers/userInfo`,
       cd: (data) => {
         console.log("用户数据",data) 
         wx.setStorage({
          key:"userInfo",
          data:{
            userInfo:data.data,
            selfAgentId: data.data.selfAgentId
          },
        })
         this.setData({
           userdata:data.data,
         })
       },
       method:'POST',
       data:{
           uId:this.data.id,
       },
     })

    this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/zlCapital/userCapital`,
      cd: (data) => {
        console.log("用户资产数据",data) 
        this.setData({
          userAssets:data.data,
        })
      },
      method:'POST',
      data:{
          uId:this.data.id,
      },
    })
    
  
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
