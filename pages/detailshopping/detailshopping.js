
const { globalData: { baseUrl } } = getApp();
var convertHtmlToText = require("../../utils/check.js");
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:true,
    chooseSize:false,
    animationData:{},
    array: [{ type: '2号'}, { type: '4号' },   { type: '3号' },  { type: '1号' } ],
    id:0,//规格里面用来标识的ID
    userId:null,//用户ID
    goodsid:null,//当前商品的ID
    arraynumber:  [{ name: '大号'}, { name: '小号' }], 
    numId:0,
    arrayprice:  [{ price:8}, { price: 9 }], 
    priceId:0,
    count:1,  
    detail:{//商品数据
      productRows:[],
      productskuRows:[],
      shopRows:[],
    },
    imgUrls: [],//详情轮播
    pageIndex:1,//页数
    babyeValuation:{
      bodycount:2,//宝贝评价的条数
      bodyRows:[],//宝贝数据
    },
    isClick: false,
    findskus:{//规格数据
      findskusRows:[],

    }
    


  
  },
  //点击规格动画弹出
  chooseSezi:function(e){
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation  = wx.createAnimation({
      // 动画持续时间
        duration:500,
        // 定义动画效果，当前是匀速
        timingFunction:'linear'
      })
      // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize:true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function(){
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    },200)
    //
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/product/findskus`,
      cd: (data) => {
        console.log("规格数据",data)
        this.data.findskus.findskusRows=data
        this.setData(this.data)

      },
      method:'POST',
      data:{id:this.data.goodsid}
    })
    







  },
  handelClickNews:function(){
    wx.switchTab({
      url: '/pages/news/news'
    })
  },
  close:function(){
    // this.setData({

    // })
  },
 
  hideModal:function(e){
    console.log("xiaoshi",e)
    var that = this;
    var animation = wx.createAnimation({
      duration:1000,
      timingFunction:'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData:animation.export()
      
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)

  },
  //类型的改变
  choseTxtColor:function(e){
    console.log("选中的值",e)
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      id:id 
    })

  },
  choseTxtNumber:function(e){
    var numId = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      numId,
    })
  },
  choseTxtPrice:function(e){
    var priceId = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      priceId,
    })
  },
  conterpAdd:function(e){
      this.data.count++;
      this.setData(this.data)
    
  },
  conterReduce:function(e){
    this.data.count--;
    if(this.data.count<=1){
      this.data.count=1;
    }
      this.setData(this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户ID
      try {
        var value = wx.getStorageSync('userid')
        if (value) {
          this.setData({
                  userId:value.id,
                  openid:value.openid
                })    
        }
      } catch (e) {
        console.log("errr",e)
    
      }
    let goodsid=options.id//商品id
    // console.log("商品ID",goodsid)
    this.setData({
      goodsid:options.id
    })
    //商品详情产品数据
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/product/findProductIndex`,
      cd: (data) => {
        // console.log("商品详情ID",data)
          data.product.imagepath=data.product.imagepath=='' ? [] : data.product.imagepath.split(','); 
          data.product.particulars = WxParse.wxParse('article', 'html', data.product.particulars, this, 0);//转换富文本
        this.data.detail.productRows = data.product;
        this.data.detail.productskuRows = data.productsku;
        this.data.detail.shopRows = data.shop;
        this.setData(this.data)
      },
      method:'GET',
      data:{id:goodsid}
    })
     //商品评价
     this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/evaluat/findEvaluatByProduct`,
      cd: (data) => {
        // console.log("商品评价",data)
        let photo=data.list.evaluationphoto
        if(photo !=undefined){
          for(var i=0;i<photo.length;i++){
            photo.list[i].evaluationphoto=photo.list[i].evaluationphoto.split(',');
          }
        } 
        this.data.babyeValuation.bodyRows = data.list;
        this.setData(this.data)
      },
      method:'POST',
      data:{
       id:goodsid,
        number:this.data.pageIndex,
        size:this.data.babyeValuation.bodycount,
      }
    })
    //收藏
    this.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/favorites/isFavorites`,
      cd: (res) => {
        // console.log("判断用户是否收藏",res) 
        if(res==true){//收藏
          this.setData({
            isClick: !this.data.isClick
          })

        }
      },
      method:'POST',
      data:{
        mid:this.data.userId,//当前用户的ID
        id:this.data.goodsid,//店铺id 或者商品id
        type:0,//0 商品 1 店铺
      }
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
  //点击收藏夹
  onColletionTap:function(e){
    if(!this.data.isClick==true){//点击收藏判断是否该用户收藏了
      this.getDatas({
        url: `${baseUrl}/zlwymaster/mall/mobile/favorites/addFav`,
        cd: (res) => {
          console.log("添加到收藏库",res)
        },
        method:'POST',
        data:{
          mid:this.data.userId,//当前用户的ID
          id:this.data.goodsid,//店铺id 或者商品id
          type:0,//0 商品 1 店铺
        }
      })
      wx.showToast({
        title: '已收藏',
        });
       } else {
        this.getDatas({
          url: `${baseUrl}/zlwymaster/mall/mobile/favorites/cancelfavorites`,
          cd: (res) => {
            console.log("点击取消收藏",res)
            if(res==true){
              this.setData({
                isClick: this.data.isClick
              })
            }
          },
          method:'POST',
          data:{
            mid:this.data.userId,//当前用户的ID
            id:this.data.goodsid,//店铺id 或者商品id
            type:0,//0 商品 1 店铺
          }
        })
        wx.showToast({
        title: '已取消收藏',
        });

       }
       this.setData({
        isClick: !this.data.isClick
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