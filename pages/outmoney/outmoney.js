// pages/redMoney/redMoney.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // array: ['微信', '中国', '巴西', '日本'],
    index: 0,
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    selectPerson:true,
    firstPerson:'微信 wei****232',
    selectArea:false,
  
  },
    //点击选择类型
    clickPerson:function(){
      var selectPerson = this.data.selectPerson;
      if(selectPerson == true){
       this.setData({
       selectArea:true,
       selectPerson:false,
    })
      }else{
       this.setData({
       selectArea:false,
       selectPerson:true,
    })
      }
    } ,
    //点击切换
    mySelect:function(e){
     this.setData({
       firstPerson:e.target.dataset.me,
       selectPerson:true,
       selectArea:false,
     })
    },
    forgetpassword:function(){
      wx.navigateTo({
        url:"../forgetpaypassword/forgetpaypassword"
      })
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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