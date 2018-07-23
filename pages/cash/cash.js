// pages/cash/cash.js
var app = getApp()  
// const app = getApp()
const { globalData: { baseUrl } } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: null,  
    id:"",//用户ID,同步从本地获取
    userTotal:{},//首页用户资产总额
    size:10,//实现条数
    num:1,//显示页数  
    getHbDbLogRows:[],//现金券
    OrderByMember:[],//省钱记录
    getHbDbLogHb:[],//HB
    MemberRows:[],//赚钱
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this;  
    that.setData({
      currentTab:options.currentTab
    })
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo({   
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });    
      }  
   
  
    });
    console.log("sheb",this.data.winHeight)
    //首页数据
    this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/zlCapital/getCapitalTotal`,
      cd: (data) => {
            console.log("用户资产总额",data) 
            if(data.fh==null){
                data.fh=0
                this.setData(this.data)
            }
          
              this.setData({
                  userTotal:data,
              })
          
          
          },
      method:'POST',
      data:{
              id:this.data.id,
           
          }, 
    })
    //现金券
    this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/zlCapitalDetail/getHbDbLog`,
      cd: (data) => {
            console.log("用户现金券记录",data) 
            this.setData({
              getHbDbLogRows:data.list
            }) 
          },
      method:'POST',
      data:{
              id:this.data.id,
              size:this.data.size,
              num :this.data.num,
              type : 1,
          }, 
    })
    //省钱
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/manualOrder/getManualOrderByMemberId`,
      cd: (data) => {
            console.log("用户省钱记录",data) 
            this.setData({
              OrderByMember:data.data.list
            }) 
          },
      method:'POST',
      data:{
              memberId :this.data.id,
              pageSize :this.data.size,
              pageNumber:this.data.num,
          }, 
    })
    //hb
    this.getDatas({
      url: `${baseUrl}/zlwymaster/platform/zlCapitalDetail/getHbDbLog`,
      cd: (data) => {
            console.log("用户hb记录",data) 
            this.setData({
              getHbDbLogHb:data.list
            }) 
          },
      method:'POST',
      data:{
              id:this.data.id,
              size:this.data.size,
              num :this.data.num,
              type : 0,
          }, 
    })
    //赚钱
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/memberdividend/getMemberdividend`,
      cd: (data) => {
            console.log("用户赚钱记录",data) 
            this.setData({
              MemberRows:data.data.list
            }) 
          },
      method:'POST',
      data:{
            memberId :this.data.id,
            pageSize :this.data.size,
            pageNumber:this.data.num,
          }, 
    })
    
  
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
  //现金券：滚动底部顶部加载数据
  lower(e) {
    console.log("in",e)
    let currentTab=e.target.dataset.current
    console.log(currentTab)
    if(currentTab==0||currentTab==null){
      // console.log("0")
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: () => {
          this.data.num++
          //现金券
          this.getDatas({
            url: `${baseUrl}/zlwymaster/platform/zlCapitalDetail/getHbDbLog`,
            cd: (data) => {
                  console.log("用户lower加载现金券记录",data) 
                        wx.hideLoading()
                        if(data.list.length!=[]){
                           this.setData({
                            getHbDbLogRows:[...this.data.getHbDbLogRows,...data.list],
                           })
                        }else{
                          wx.showToast({
                            title: '已经到底了',
                            icon : 'warn', 
                            duration: 500,
                          })
                        }
                },
            method:'POST',
            data:{
                    id:this.data.id,
                    size:this.data.size,
                    num :this.data.num,
                    type : 1,
                }, 
          })
          
        }
      })
    }
    else if(currentTab==1){//存在BUG
      console.log("1111111")
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: () => {
          this.data.num++
          //现金券
          this.getDatas({
            url: `${baseUrl}/zlwymaster/mall/mobile/manualOrder/getManualOrderByMemberId`,
            cd: (data) => {
                  console.log("用户lower加载省钱记录",data) 
                      let res=data.data.list
                      console.log("res",res)
                        wx.hideLoading()
                        if(res.length!=[]){

                          this.setData({
                            OrderByMember:[...this.data.OrderByMember,...res]
                          })

                        }else{
                          wx.showToast({
                            title: '已经到底了',
                            icon : 'warn', 
                            duration: 500,
                          })
                        }
                },
            method:'POST',
            data:{
                  memberId :this.data.id,
                  pageSize :this.data.size,
                  pageNumber:this.data.num,
                }, 
          })
         
          
        },
        complete:()=>{
          console.log("infdsf")
        }
      })
    }
    else if(currentTab==2){
      console.log("2")
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: () => {
          this.data.num++
          //现金券
          this.getDatas({
            url: `${baseUrl}/zlwymaster/platform/zlCapitalDetail/getHbDbLog`,
            cd: (data) => {
                  console.log("用户lower加载HB记录",data) 
                      let res=data.list
                      console.log("res",res)
                        wx.hideLoading()
                        if(res.length!=[]){
                          let arr2=res;
                            this.setData({
                              getHbDbLogHb:[...this.data.getHbDbLogHb,...res]
                            })
                        }
                        else {
                          wx.showToast({
                            title: '已经到底了',
                            icon : 'warn', 
                            duration: 500,
                          })
                        }
                },
            method:'POST',
            data:{
                  id:this.data.id,
                  size:this.data.size,
                  num :this.data.num,
                  type : 0,
                }, 
          })
         
          
        },
        complete:()=>{
          console.log("infdsf")
        }
      })

    }
    else if(currentTab==3){
      console.log("3")
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: () => {
          this.data.num++
          //现金券
          this.getDatas({
            url: `${baseUrl}/zlwymaster/mall/mobile/memberdividend/getMemberdividend`,
            cd: (data) => {
                  console.log("用户lower加载省钱记录",data) 
                      let res=data.data.list
                      console.log("res",res)
                        wx.hideLoading()
                        if(res.length!=[]){
                          this.setData({
                            MemberRows:[...this.data.MemberRows,...res]
                          })

                        }else{
                          wx.showToast({
                            title: '已经到底了',
                            icon : 'warn', 
                            duration: 500,
                          })
                        }
                },
            method:'POST',
            data:{
                  memberId :this.data.id,
                  pageSize :this.data.size,
                  pageNumber:this.data.num,
                }, 
          })
         
          
        },
        complete:()=>{
          console.log("infdsf")
        }
      })
    }

    

  

  },


//分润
  handeLiRuiClick(){
    wx.navigateTo({
      url: '../outprofit/outprofit'
    })
  },
  //店铺
  handeClickShop:function(){
    wx.switchTab({
      url: "/pages/shoppingmall/shoppingmall" //注意是绝对路径
    })
  },
  //提现
  handeClickOutmoney:function(){
    wx.navigateTo({
      url: '../outmoney/outmoney'
    })
  },
  //余额
  handeClickBalance:function(){
    wx.navigateTo({
      url: '../homepage/homepage'
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