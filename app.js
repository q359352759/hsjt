//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success:(res)=> {
        var codes = res.code; //返回code
          console.log("code",codes);
          wx.request({
                    url:`http://192.168.2.202:8080/zlwymaster/platform/WeixinOpenid/getOpenid`, //仅为示例，并非真实的接口地址 
                    method:'POST',
                    data:{js_code:codes},
                    header: {
                      'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success: function (res) {
                      console.log("后台拿到code,返回一个id",res)
                        wx.setStorage({
                        key:"openid",
                        data:{
                          openid:res.data.openid,
                          code:codes
                        },
                      })
                    }
                  })
          // var appId="wxe92a4803e1635132";
          // var secret="2786a12c3f7a75e36e0b3ecbc8a77035";

        // if (res.code) {
        //   //发起网络请求
        //   wx.request({
        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + codes + '&grant_type=authorization_code',
        //     method:'POST', 
        //     header: {
        //       'content-type': 'json'
        //     },
        //     success: function (res) {
        //       console.log("成功获取用户信息，后台需要用的，目前可以用，可以不用",res)
        //       let openid=res.data.openid;
              
        //       let session_key=res.data.session_key;
        //       console.log("用户code,交给后台",codes)
        //       wx.request({
        //         url:`${baseUrl}/zlwymaster/platform/WeixinOpenid/getOpenid`, //仅为示例，并非真实的接口地址 
        //         method:'GET',
        //         data:{ js_code:codes},
        //         header: {
        //           'content-type': 'application/json' // 默认值
        //         },
        //         success: function (res) {
        //           console.log("后台拿到code,返回一个id",res)
        //         }
        //       })
        //     },
        //     fail:function(){
        //       console.log("接口失败")
        //     },
        //   })
        // } 
        // else {
        //   console.log('登录失败！' + res.errMsg)
        // }
      }
    }),

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     var codes = res.code; //返回code
    //       console.log("code",codes);//修改密码的时候需要用到用户的code，所以存储
    //        //获取用户的openid
          //  wx.request({
          //   url:`http://192.168.2.202:8899/zlwymaster/platform/WeixinOpenid/getWxOpenId`, 
          //   method:'GET',
          //   data:{ js_code:codes},
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
            // success:(res)=> {
              // console.log("openid+++",res.data)//保存到本地需要用的页面直接从本地获取即可
              // let openid=res.data.openid;
              // let session_key=res.data.session_key;
              // wx.setStorage({
              //   key:"userdata",
              //   data:{
              //     openid,
              //     session_key,
              //     code:codes
              //   },
              // })
            // }
    //       })
    //   }
    // })

    // 获取用户信息
    //      wx.getUserInfo({
    //     openIdList: ['selfOpenId'],
    //     lang: 'zh_CN',
    //     success: (res) => {
    //         console.log('success', res.data)
    //     },
    //     fail: (res) => {
    //       console.log("fail",res)
    //         // reject(res)
    //     }
    // })
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl:'https://www.hzjifen.com' //安全域名
    // baseUrl:'http://122.114.227.26:8899'//服务请求
    // baseUrl:'http://192.168.2.146:8080'//龙浩
    // baseUrl:'http://192.168.2.110:8899'
  }
})