// pages/testse/testse.js
var check = require("../../utils/check.js");
const app = getApp()
const { globalData: { baseUrl } } = getApp();
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    showView: true,
    time: '获取验证码', //倒计时 
    currentTime:61,//倒计时 
    //输入框
    userName:'',//手机号
    usercode:"",//验证码
    id:"",//用户ID,同步从本地获取
    userTotal:{},//首页用户资产总额
    db:"0",//现金券
    integration:"0",//省钱
    hb:"0",//HB
    fh:"0",//赚钱
    x:0,
    y:0,
    winWidth:"",
    winHeight:"",
    HBs:"0",//canvasHB
    hbBalance:"0",

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

        //获取区域地址
        check.getDatas({
          url: `${baseUrl}/zlwymaster/agent/manager/area/findArea`,
          cd: (data) => { 
                console.log("区域地址",data,) 
                wx.setStorage({
                key:"areadata",
                  data:{
                   data:data
                  },
              })
              },
          method:'GET',
          data:{},
        })




     //同步获取本地数据
    //  try {
    //   var value = wx.getStorageSync('userid')
    //   if (value) {
    //     console.log("ID",value)
    //     this.setData({
    //             id:value.id,
    //             openid:value.openid
    //           })    
    //   }
    // } catch (e) {
    //   console.log("errr",e)
  
    // }

    //弹窗领取红包
    showView: (options.showView == "true" ? true : false)
    //定位
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
 
   
      //canvas
    const width=150;
    const height=100;
    const ctx = wx.createCanvasContext('myCanvas')
    const ctx_1 = wx.createCanvasContext('myCanvas_2');
    var a=0
    var b=0
    setInterval(function(){
        // ctx.fill();
        ctx.translate(width,height);
        ctx_1.translate(width,height);
        a=a+0.001;
        b=b-0.001
        ctx.rotate(a)
        ctx_1.rotate(b)
        //蓝色
        ctx.setLineWidth(1);   //边框宽度
        ctx.setLineDash([10, 0]);   //
        //+++++++++++++++
        ctx.beginPath()
        ctx.arc(0-20, 0-87, 3, 0, 2 * Math.PI)
        ctx.setFillStyle('white')

        ctx.fill();
        ctx.beginPath()
        ctx.arc(0+20, 0+87, 3, 0, 2 * Math.PI)
        ctx.setFillStyle('white')
        ctx.fill();
        //左边圆弧
        ctx.beginPath()
        ctx.arc(0, 0, 90, Math.PI/2+0.2, 1.5 * Math.PI-0.2)
        ctx.setStrokeStyle('#ffffff')
        ctx.stroke();
        //右边半圆
        ctx.beginPath()
        ctx.arc(0, 0, 90, Math.PI*1.5+0.2, Math.PI/2-0.2)
        ctx.setStrokeStyle('#ffffff')
        ctx.stroke();

        //中心虚线
        ctx.beginPath();
        ctx.setLineWidth(10);   //边框宽度
        ctx.setLineDash([1, 5]);
        ctx.arc(0,0,50,0,Math.PI*2-0.1);
        ctx.setStrokeStyle('#ffffff');
        ctx.stroke();
        ctx.draw();
        //第二个
        // ctx_1
         //蓝色
         ctx_1.setLineWidth(1);   //边框宽度
         ctx_1.setLineDash([10, 0]);   //
         //+++++++++++++++
         ctx_1.beginPath()
         ctx_1.arc(0-16, 0-67, 3, 0, 2 * Math.PI)
         ctx_1.setFillStyle('white')
 
         ctx_1.fill();
         ctx_1.beginPath()
         ctx_1.arc(0+16, 0+67, 3, 0, 2 * Math.PI)
         ctx_1.setFillStyle('white')
         ctx_1.fill();
        ctx_1.beginPath()
        ctx_1.arc(0, 0, 70, Math.PI/2+0.2, 1.5 * Math.PI-0.2)
     
        ctx_1.setStrokeStyle('#ffffff')
        ctx_1.stroke();
        //右边半圆
        ctx_1.beginPath()
        ctx_1.arc(0, 0, 70, Math.PI*1.5+0.2, Math.PI/2-0.2)
        ctx_1.setStrokeStyle('#ffffff')
        ctx_1.stroke();
        ctx_1.draw();
    },10)
  
  
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
    onChangeShowState: function () {
      var that = this;
      that.setData({
        showView: (!that.data.showView)
      })
    },
    //扫码
    saoma(){
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res)
        }
      })
    },
    outprofit(){//点击进入分润系统
      console.log("in")
      wx.navigateTo({
        url: '../outprofit/outprofit'
      })

    },
  
    // 点击进入余额
    handeClickCash(){
      wx.navigateTo({
        url: '../cash/cash?currentTab=0'
      })
    },
     // 点击进入省钱
     handeClickSave(){
      wx.navigateTo({
        url: '../cash/cash?currentTab=1'
      })
    },
     // 点击进入HB
     handeClickHb(){
      wx.navigateTo({
        url: '../cash/cash?currentTab=2'
      })
    },
     // 点击进入赚钱
     handeClickMake(){
      wx.navigateTo({
        url: '../cash/cash?currentTab=3'
      })
    },
      // 点击进入开店
      handeClickOpenStore(){
        wx.navigateTo({
          url: '../setupshop/setupshop'
        })
      },
        // 点击进入创业
      handeClickBusiness(){
      wx.navigateTo({
        url: '../applypartner/applypartner'
      })
    },
      // 点击弹出图片
      handeClickShareShow(){
        this.setData({
          flag:false,
        })  
      },
       // 点击弹出影藏图片
       handeClickShareHide:function(){
         console.log("in")
        this.setData({
          flag:true,
        })  
       },
       //获取验证码倒计时间
    getCode: function (options){
      var that = this;
      var currentTime = that.data.currentTime
      var interval = setInterval(function () {
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
    getVerificationCode(){
      this.getCode();
      var that = this
      that.setData({
        disabled:true
      })
    }, 
  
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
         //同步获取本地数据
         try {
          var value = wx.getStorageSync('userid')
          if (value) {
            console.log("ID",value)
            this.setData({
                    id:value.id,
                    openid:value.openid
                  })    
          }
        } catch (e) {
          console.log("errr",e)
      
        }
   //首页数据
   this.getDatas({
    url: `${baseUrl}/zlwymaster/platform/zlCapital/getCapitalTotal`,
    cd: (data) => {
          // console.log("用户资产总额",data) 
          if(data==null){
            return;
          }
          if(data.fh==null){
            this.setData({
              fh:"0",
              db:data.db,
              integration:data.integration,
              hb:data.hb,
            })
          }else{
            this.setData({
              db:data.db,
              integration:data.integration,
              hb:data.hb,
              fh:data.fh,
            })

          } 
        },
    method:'POST',
    data:{
            id:this.data.id,
        }, 
  })
     //canvas
     this.getDatas({
      url: `${baseUrl}/zlwymaster/hb/hbDistribution/hbindex`,
      cd: (data) => { 
            // console.log("头部分润号",data,) 
              this.setData({
                HBs:data.data.hb,
                hbBalance:data.data.hbBalance,
              
              })
          },
      method:'POST',
      data:{
             memberId:this.data.id,
           
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