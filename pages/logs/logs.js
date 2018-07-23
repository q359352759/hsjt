//logs.js
// const util = require('../../utils/util.js')
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)
Page({
  data: {
    // logs: [],
    userName:'',
    userPassword:'',
    openid:"",


  },
  onLoad: function () {
    wx.getStorage({
      key: 'userdata',
      success:(res)=> {
        console.log("本地用户存储数据去取出对应的数据",res)
        this.setData({
          openid:res.data.openid
        })

      } 
    })
    
    // wx.login({
    //   success:(res)=> {
    //     var codes = res.code; //返回code
    //       console.log("code",codes);
    //       wx.request({
    //                 url:`${baseUrl}/zlwymaster/platform/WeixinOpenid/getOpenid`, //仅为示例，并非真实的接口地址 
    //                 method:'GET',
    //                 data:{ js_code:codes},
    //                 header: {
    //                   'content-type': 'application/json' // 默认值
    //                 },
    //                 success: function (res) {
    //                   this.setData({
    //                     openid:res.data.openid
    //                   })
    //                   console.log("后台拿到code,返回一个id",res)
    //                 }
    //               })


    //       // var appId="wx02ff8da81601f267";
    //       // var secret="f5a2383eee4c6b122026265ca7b22740";

    //     // if (res.code) {
    //     //   //发起网络请求
    //     //   wx.request({
    //     //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + codes + '&grant_type=authorization_code',
    //     //     method:'POST', 
    //     //     header: {
    //     //       'content-type': 'json'
    //     //     },
    //     //     success: function (res) {
    //     //       console.log("成功获取用户信息，后台需要用的，目前可以用，可以不用",res)
    //     //       let openid=res.data.openid;
    //     //       let session_key=res.data.session_key;
    //     //       console.log("用户code,交给后台",codes)
    //     //       wx.request({
    //     //         url:`${baseUrl}/zlwymaster/platform/WeixinOpenid/getOpenid`, //仅为示例，并非真实的接口地址 
    //     //         method:'GET',
    //     //         data:{ js_code:codes},
    //     //         header: {
    //     //           'content-type': 'application/json' // 默认值
    //     //         },
    //     //         success: function (res) {
    //     //           console.log("后台拿到code,返回一个id",res)
    //     //         }
    //     //       })
    //     //     },
    //     //     fail:function(){
    //     //       console.log("接口失败")
    //     //     },
    //     //   })
    //     // } 
    //     // else {
    //     //   console.log('登录失败！' + res.errMsg)
    //     // }
    //   }
    // }),

    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // });


  },
    //请求数据
    getDatas( {url, cd,method,data} ) {
      console.log("传过来的数据",url,cd,method,data)
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
  //手机号
  bindinputname: function(e) {
    console.log(e)
    if(e.detail.value==""){
      wx.showToast({
        title: '请输入手机号码！',
        icon : 'warn', 
        duration: 500,
      })
    }else if(check.isinutnull(e.detail.value)){//为真不做处理
      console.log(check.isinutnull(e.detail.value))
    }else if(check.isinutnull(e.detail.value)==0){//为假
     wx.showModal({
      title: '提示',
      content: '请输入11位正确的手机号码',
      showCancel: false,
        success: (res)=> {
        this.setData({//不正确清空
          userName:"",
        })
        }
      })
    }
    this.setData({
      userName: e.detail.value,  
    })
  },
  //密码
  bindinputpassword:function(e){
    console.log(e)
    if(e.detail.value==""){
      wx.showToast({
        title: '密码不能为空',
        icon : 'warn', 
        duration: 500,
      })
    }else if(check.password(e.detail.value)){//为真不做处理
      console.log(check.password(e.detail.value))
    }else if(check.password(e.detail.value)==0){//为假
     wx.showModal({
      title: '提示',
      content: '密码由6-16位由数字和26个英文字母混合而成',
      showCancel: false,
        success: (res)=> {
        this.setData({//不正确清空
          userPassword:"",
        })
        }
      })
    }
    this.setData({
      userPassword: e.detail.value,  
    })

  },
  
  logines:function(){
    console.log("输入框的数据",this.data.userName,this.data.userPassword,this.data.openid)
    wx.request({
      url:`${baseUrl}/zlwymaster/platform/cmembers/membersLogin`, //
      method:'POST',
      data:{
        phone:this.data.userName,
        pwd:this.data.userPassword,
        openid:this.data.openid,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded ' // 默认值
      },
      success:(res)=> {
        console.log("登录成功返回的数据",res)
        let description=res.data.description;
        console.log("description",description)
        switch (description) {
          case "手机号为空！":
          wx.showModal({
                title: '提示',
                content: '手机号不能为空',
                })
           break;
           case "手机号不存在!":
           wx.showModal({
                 title: '提示',
                 content: '手机号不存在!',
                 success:(res)=>{
                  wx.navigateTo({
                    url: '../register/register'
                  })
                  this.setData({//不正确清空
                    userName:"",
                    userPassword:"",
                  })
                 }
                 })
            break;
          case "登录失败，密码不正确!":
          wx.showModal({
                  title: '提示',
                  content: '登录失败，密码不正确!',
                  success:(res)=>{
                    this.setData({
                      userName:"",
                      userPassword:"",
                    })    
                  }
                  })
            break;
          case "登录成功！":
          let openid=res.data.data.openId;
          let id=res.data.data.ids
          //登录成功数据保存到本地
            wx.setStorage({
            key:"userid",
            data:{
              openid,
              id,
            },
          })
          wx.showModal({
                    title: '提示',
                    content: '恭喜登录成功！',
                      // 18581588710 
                    success:()=>{
                        wx.switchTab({
                          url: "/pages/home/home"//注意是绝对路径
                        })
                    }

                    })
          break;
          default:
          console.log("0");
        }        
      
      }
    })
 

  },
  handelClickClerpwd:function(){
    wx.navigateTo({
      url: '../forgetpossword/forgetpossword'
    })

  },

  //注册
  handelClickReg:function(){
 
    wx.navigateTo({
      url: '../register/register'
    })
  },
})
