// pages/management/management.js
const check = require("../../utils/check.js");
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
    showView: false,
    id:"",//获取用户ID
    userData:"",
    selfAgentId:null,//用户合伙人的ID
    size:10,//显示条数
    page:1,//显示页数
    MemNumBer:0,//会员
    storeData:[],//商家信息
    MemMber:0,//团队信息
    multiple:0,//提现信息
  },
  handeDetil:function(){
    this.setData({
      showView: (!this.data.showView),
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户ID
         try {
          var value = wx.getStorageSync('userid')
          var userInfo = wx.getStorageSync('userInfo')//用户信息
          if (value) {
            // console.log("ID",value,userInfo)
            this.setData({
                    id:value.id,
                    userData:userInfo.userInfo,
                    selfAgentId:userInfo.selfAgentId
                    // openid:value.openid
                  })    
          }
        } catch (e) {
          console.log("errr",e)
      
        }
          //获取会员的信息
          check.getDatas({
            url: `${baseUrl}/zlwymaster/agent/manager/zlAgentInfo/getAgentMemByPage`,
            cd: (data) => { 
                  console.log("获取会员信息",data,) 
                  this.setData({
                    MemNumBer:data.data.MemNumBer
                  })
                },
            method:'POST',
            data:{
              uId:this.data.id,
              size:this.data.size,
              page:this.data.page,
             	type:0,
            },
          })
            //获取商家的信息
          check.getDatas({
            url: `${baseUrl}/zlwymaster/agent/manager/zlAgentInfo/getAgentSeller`,
            cd: (data) => { 
                  console.log("获取商家信息",data,) 
                  this.setData({
                    storeData:data.data
                  })
                },
            method:'POST',
              data:{
                uId:this.data.id, 
              },
          })
          //获取团队的信息
          check.getDatas({
            url: `${baseUrl}/zlwymaster/agent/manager/zlAgentInfo/getAgentAge`,
            cd: (data) => { 
                  console.log("获取团队信息",data,) 
                  this.setData({
                    MemMber:data.data.MemMber
                  })
                },
            method:'POST',
            data:{
              uId:this.data.id,
            },
          })
          //获取提现的信息
          check.getDatas({
            url: `${baseUrl}/zlwymaster/agent/manager/agentSettle/getMultiple`,
            cd: (data) => { 
                  console.log("获取提现信息",data,) 
                  let number=data.data.multiple[9]
                  let num=Math.round(number * 100) / 100
                  this.setData({
                    multiple:num,

                  })
                },
            method:'GET',
            data:{
              id:this.data.selfAgentId,
              type:0,
            },
          })




    var that = this;  
    wx.getSystemInfo( {  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    })
  },
  // 切换
  bindChange: function( e ) {  
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