//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    motto: 'Hello World',  
    userInfo: {}  
  },
 //事件处理函数  
 bindViewTap: function() {  
  wx.navigateTo({  
    url: '../logs/logs'  
  })  
},  
  onLoad: function () {
    // wx.login({
    //   //获取code
    //   success: function (res) {
    //     var code = res.code; //返回code
    //     console.log(code);
    //     var appId = '...';
    //     var secret = '...';
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
    //       data: {},
    //       header: {
    //         'content-type': 'json'
    //       },
    //       success: function (res) {
    //         var openid = res.data.openid //返回openid
    //         console.log('openid为' + openid);
    //       }
    //     })
    //   }
    // })
    var that = this  
    //调用应用实例的方法获取全局数据  
    wx.getUserInfo(function(userInfo){  
      console.log(userInfo)
      //更新数据  userInfo
      that.setData({  
        userInfo:userInfo  
      })  
    })  

    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo:function(cb){  
    var that = this;  
    if(this.globalData.userInfo){  
      typeof cb == "function" && cb(this.globalData.userInfo)  
    }else{  
      //调用登录接口  
      wx.login({  
        success: function () {  
          wx.getUserInfo({  
            success: function (res) {  
              console.log(res)
              that.globalData.userInfo = res.userInfo;  
              typeof cb == "function" && cb(that.globalData.userInfo)  
            }  
          })  
        }  
      });  
    }  
  }
   
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
