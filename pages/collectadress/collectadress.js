// pages/collectadress/collectadress.js
const app = getApp()
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    addressdata:[],
    index:0,

  
  },
  addAddress:function(){
    wx.navigateTo({
      url:`../addcollectadress/addcollectadress`
    })

  },
  uapdata:function(e){
    // console.log(e)
    let ids=e.detail.ids;//根据ID进行修改

    wx.navigateTo({
      url:`../addcollectadress/addcollectadress?id=${ids}`
    })




  },
  del:function(e){
    let ids=e.detail.ids;//根据ID进行删除
     //根据用户Id查找对应的用户收货地址，删除
     this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/sysShippingAddress/del`,
      cd: (data) => {
        console.log("删除地址",data,)
        if(data.description=="删除成功！"){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          this.getDatas({
            url: `${baseUrl}/zlwymaster/platform/sysShippingAddress/addressList`,
            cd: (data) => {
              console.log("收货地址",data,)
              this.setData({
                addressdata:data.data
              })
            },
            method:'GET',
            data:{
              uId:this.data.id,
            },
          })
        

        }
   

      },
      method:'POST',
      data:{
        uId:this.data.id,
        addressId:ids,
      },
    })
    
  },
  radio:function(e){
    this.setData({
     index:this.data.index++,
    })
    console.log('radio发生change事件，携带value值为：', e)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       //同步获取本地数据
       try {
        var value = wx.getStorageSync('userid')
        if (value) {
          this.setData({
                  id:value.id,
                })    
        }
      } catch (e) {
        console.log("errr",e)
      }
  //根据用户Id查找对应的用户收货地址
    this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/sysShippingAddress/addressList`,
      cd: (data) => {
        console.log("收货地址",data,)
        this.setData({
          addressdata:data.data
        })
      },
      method:'GET',
      data:{
        uId:this.data.id,
      },
    })
  
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