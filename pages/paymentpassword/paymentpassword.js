// pages/paymentpassword/paymentpassword.js
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userpass:"",
    userPassword:"",
    userPwd:"",
    id:"",

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key:"userid",
      success:(res)=>{
        this.setData({
          id:res.data.id  
        })
        
      }
    })

  
  },
  bindPwd: function(e) {
    if(e.detail.value==""){
      wx.showToast({
        title: '密码不能为空',
        icon : 'warn', 
        duration: 500,
      })
    }
     
    this.setData({
      userpass: e.detail.value,  
    })

   
  },
  bindinputpass: function(e) {
    if(e.detail.value==""){
      wx.showToast({
        title: '密码不能为空',
        icon : 'warn', 
        duration: 500,
      })
    }
    if(e.detail.value.length<6){
      wx.showModal({
        title: '提示',
        content: '密码至少6位',
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
      }else if(e.detail.value.length<6){
        wx.showModal({
          title: '提示',
          content: '密码至少6位',
            success: (res)=> {
            this.setData({//不正确清空
              userPwd:"",
            })
            }
          })
      }  
      else{
        this.setData({
          userPwd: e.detail.value,  
        })
      }

    }
    
    
  },
  handleClickOK:function(){
    // console.log(this.data.userName,this.data.userPwd,this.data.userCode,this.data.openid)
    wx.request({
      url:`${baseUrl}/zlwymaster/platform/cmembers/updatepwd`, //仅为示例，并非真实的接口地址 
      method:'POST',
      data:{ 
        uId:this.data.id,
        type:'pay',
        oldpwd :this.data.userpass,
        newpwd:this.data.userPwd,        
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (res)=> {
         console.log("修改支付密码",res)
        let description=res.data.description;
        switch (description) {
          case "旧密码为空！":
          wx.showModal({
                title: '提示',
                content: '旧密码不能为空！',
                })
           break;
          case "旧密码不正确！":
          wx.showModal({
                  title: '提示',
                  content: '旧密码不正确！',
                  success:(res)=>{
                    this.setData({
                      userpass:"", 
                    })    
                   }
                  })
            break;
          case "支付密码更新成功！":
          wx.showModal({
                    title: '提示',
                    content: '恭喜支付密码更新成功！',
                      // 18581588710 
                    success:()=>{
                        wx.switchTab({
                          url: "/pages/mine/mine"//注意是绝对路径
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
  forgetpassword:function(){
    wx.navigateTo({
      url:"../forgetpaypassword/forgetpaypassword"
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