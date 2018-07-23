// pages/register/register.js
var app = getApp()  
// var step = 1 // 当前操作的step  
var maxTime = 60  
var currentTime = maxTime //倒计时的事件（单位：s）  
var interval = null  
var hintMsg = null // 提示 
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)

// 检测是否有输入 
function checkIsNotNull(content){  
  return (content && content!=null)  
}  

// 检测输入内容  
function checkPhoneNum(phoneNum){  
  console.log(phoneNum)  
  if(!checkIsNotNull(phoneNum)){  
      return false  
  }  

  return true  
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userCode:"",
    userPassword:"",
    userPwd:"",
    truePwd:true,
    date:'请选择日期',
    fun_id:2,
    time: '获取验证码', //倒计时 
    currentTime:61,
    code:"",
    openid:"",
    disabled:null,

  },

  

  bindinputname: function(e) {
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

  bindincode: function(e) {
    // console.log("Code",e.detail.value)
    if(e.detail.value==""){
      wx.showToast({
        title: '请输入验证码！',
        icon : 'warn', 
        duration: 500,
      })
    }
    this.setData({
      userCode: e.detail.value,  
    })
  },

  bindinputpass: function(e) {
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
//第二次输入密码验证
  bindinputpwd: function(e) {
    if(e.detail.value!=""){
      if(this.data.userPassword!=e.detail.value){
        wx.showModal({
          title: '提示',
          content: '两次密码不一样',
            success: (res)=> {
            this.setData({//不正确清空
              userPwd:"",
            })
            }
          })
      }else{
        this.setData({
          userPwd: e.detail.value,  
        })
      }
    }
  },

  //获取验证码倒计时间
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime+'秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:61,
          disabled: false   
        })
      }
    }, 1000)  
  },
  //获取手机验证码
  getVerificationCode:function() {
    var that = this
    that.setData({
      disabled:true,
    })
    if(that.data.userName!=""){ 
      var currentTime = that.data.currentTime
      interval = setInterval(function () {
        currentTime--;
        that.setData({
          time: currentTime+'秒'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '重新发送',
            currentTime:61,
            disabled: false   
          })
        }
      }, 500)

      wx.request({
        url: `${baseUrl}/zlwymaster/platform/cmembers/sendVuecode?phone=${that.data.userName}`,
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:(res) =>{
          console.log("获取手机验证码",res)
        }
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号码',
        showCancel: false,
          success: (res)=> {//清空手机号吗
          // this.setData({//不正确清空
          //   userName:"",
          // })
          }
        })

    }
      

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
    key:"userdata",
    data:{
      openid:this.data.openid,
      code:this.data.code
    },
  })
  },

  handleClickReg:function(){
    console.log("注册传入的参数",this.data.userName,this.data.userPwd,this.data.userCode,this.data.openid)
    // let that=this
    wx.request({
      url:`${baseUrl}/zlwymaster/platform/cmembers/register`, //仅为示例，并非真实的接口地址 
      method:'POST',
      data:{ 
        phone:this.data.userName,
        username:this.data.userName,
        pwd:this.data.userPwd,
        vuecode:this.data.userCode,
        id:'no',
        type:-1,//代理人5                                                                                                                                             
        openid:this.data.openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded '
      },
      success: (res)=> {
         console.log("注册++",res ) 
        let description=res.data.description;
        switch (description) {
          case "手机号为空！":
          wx.showModal({
                title: '提示',
                content: '手机号不能为空',
                })
           break;
          case "手机号已被注册!":
          wx.showModal({
                  title: '提示',
                  content: '该手机号码已被注册！',
                  success:(res)=>{
                    this.setData({
                      userName:"", 
                    })    
                  }
                  })
            break;
            case "保存失败!":
            wx.showModal({
                    title: '提示',
                    content: '保存失败!',
                    })
              break;
              case"系统异常!":
              wx.showModal({
                      title: '提示',
                      content: '"系统异常!"',
                      })
                break;
          case "注册成功!":
          wx.showModal({
                    title: '提示',
                    content: '恭喜注册成功！',
                      // 18581588710 
                    success:()=>{
                      wx.navigateTo({
                        url: '../logs/logs'
                      })
                     }
                    })
          break;
          default:
          wx.showModal({
            title: '提示',
            content: '你输入有误,请重新输入！',
            })

        } 
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