// pages/outprofit/outprofit.js
const { globalData: { baseUrl } } = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // index:null,
    url:`${baseUrl}/zlwymaster/hb/hbDistribution/getBeforeSave`,//分润号兑换记录数据地址
    beforeSave:`${baseUrl}/zlwymaster/hb/hbDistribution/beforeSave`,
    timeUrl:`${baseUrl}/zlwymaster/hb/hbDistribution/xfRecord`,
    select2:"0",
    vaule:[123,456,789],
    id:null,//用户ID
    hbindex:[],//用户分润号
    ShowNum:"",//参与分润
    fhnum:[],//正在分润
    serversnumber:[],//总分润
    phs:"0",//分润号的个数,一下全是头部的数据
    ph:"0",
    hb:"0",
    fh:"0",
    dfh:"0",
    dfhMoney:"0",
    paihao:"0",
    fhnumNumber:null,
    index:"0",//切换状态的下标
    userLast:[],//用户最近的三个分润号
    xflistAll:[],//所有分润号
    januaryData:[],//用户最近一月分润号
    quarterData:[],//用户季度分润号
    yearData:[],//用户年分润号

  
  },
  changeHidden: function(){
    this.setData({
        hidden: !this.data.hidden
    });
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
      //头部分润号
      this.getDatas({
        url: `${baseUrl}/zlwymaster/hb/hbDistribution/hbindex`,
        cd: (data) => { 
              console.log("头部分润号",data,) 
              let fhnum= data.data.fhnum
                  let  a=fhnum.toString()
                  var str = a.split('')
                  let serversnumber=data.data.serversnumber
                  let  b=serversnumber.toString()
                  var str_1 = b.split('')
                  let ph= data.data.ph
                  let phs=ph/3
                this.setData({
                  ph:data.data.ph,
                  fh:data.data.fh,
                  hb:data.data.hb,
                  dfh:data.data.dfh,
                  dfhMoney:data.data.dfhMoney,
                  phs,
                  fhnum:str,
                  serversnumber:str_1,
                  fhnumNumber:data.data.fhnum,
                })
            },
        method:'POST',
        data:{
               memberId:this.data.id,
             
            }, 
      })
      //人数参与分润445
      this.getDatas({
        url: `${baseUrl}/zlwymaster/hb/hbDistribution/getShowNum`,
        cd: (data) => { 
              console.log("参与人数",data) 
                this.setData({
                  ShowNum:data,
                })
            },
        method:'POST',
        data:{}, 
      })
      this.getDatas({
        url: this.data.beforeSave,
        cd: (data) => { 
              console.log("加快速度",data) 
            
            },
        method:'POST',
        data:{
          memberid :this.data.id
        }, 
      })
      //分润号兑换记录
      this.getxfRecord()
   
  },
  //分润号兑换记录数据
  getxfRecord(){
    wx.showLoading({
      title: '加载中',
      mask: true,
      success:(res)=>{
        //用户所有分润号
        this.getDatas({
          url: this.data.url,
          cd: (data) => {   
                console.log("用户所有分润号",data) 
                let res=data
                 let Min=data.last
                 let mins=Min.sort((a,b)=>{
                    return a-b;
                 })
                 let paihao=mins[0]-this.data.fhnumNumber
                  this.setData({
                    userLast:res.last,
                    xflistAll:res.xflist,
                    paihao,//分润号中最小的数字
                  },()=>{
                    wx.hideLoading()
                  }) 
              },
          method:'POST',
          data:{
                memberid:this.data.id,
                  type:0, 
              }, 
        })
      }
    })
  }, 
  all:function(e){
    
    let indexs=e.currentTarget.dataset.index
    console.log(indexs)
    //分润号兑换记录
    this.getxfRecord()
    this.setData({
      // index:indexs,
      select2:indexs
    })
    
  },
  january:function(e){
    let indexs=e.currentTarget.dataset.index
    // console.log(indexs)
    wx.showLoading({
      title: '加载中',
      mask: true,
      success:(res)=>{
        //用户所有分润号
        this.getDatas({
          url: this.data.timeUrl,
          cd: (data) => { 
           
                console.log("用户一月分润号",data) 
                let res=data.data
                console.log("res",res)
                if(res==""){
                  this.setData({
                    januaryData:[],
                   },()=>{

                    wx.hideLoading()
                   })  
                }else{
                  this.setData({
                    januaryData:res.xflist,
                   },()=>{
                    wx.hideLoading()
                   })  
                }
                
                
              },
          method:'POST',
          data:{
                memberid:this.data.id,
                  type:1, 
              }, 
        })
      }
    })
    this.setData({
      // index:indexs,
      select2:indexs
    })
    
  },
  quarter:function(e){
    let indexs=e.currentTarget.dataset.index
    wx.showLoading({
      title: '加载中',
      mask: true,
      success:(res)=>{
        //用户所有分润号
        this.getDatas({
          url: this.data.timeUrl,
          cd: (data) => { 
                console.log("用户季度分润号",data) 
                let res=data.data
                console.log("res",res)
                if(res==""){
                  this.setData({
                    quarterData:[],
                   },()=>{
                    wx.hideLoading()   
                   })  
                }else{
                  this.setData({
                    quarterData:res.xflist,
                   },()=>{
                    wx.hideLoading()
                   })  
                }  
              },
          method:'POST',
          data:{
                memberid:this.data.id,
                  type:2, 
              }, 
        })
      }
    })
    this.setData({
      // index:indexs,
      select2:indexs
    })
    
  },
  year:function(e){
    // console.log(e)
    let indexs=e.currentTarget.dataset.index
    wx.showLoading({
      title: '加载中',
      mask: true,
      success:(res)=>{
        //用户所有分润号
        this.getDatas({
          url: this.data.timeUrl,
          cd: (data) => { 
                console.log("用户年分润号",data) 
                let res=data.data
                console.log("res",res)
                if(res==""){
                  this.setData({
                    yearData:[],   
                   },()=>{
                    wx.hideLoading()
                   })
                   
                }else{
                  this.setData({
                    yearData:res.xflist,
                   },()=>{
                    wx.hideLoading()
                   })
                  
                }

               
              },
          method:'POST',
          data:{
                 memberid:this.data.id,
                  type:3, 
              }, 
        })
      }
    })
    this.setData({
      // index:indexs,
      select2:indexs
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