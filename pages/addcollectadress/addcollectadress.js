// pages/collectadress/collectadress.js

// 引入SDK核心类
var bmap = require('../../utils/bmap-wx.min.js');   
var wxMarkerData = [];  //定位成功回调对象 
//以上是获取地理位置
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "jUkTm49I1Zbo4Hrir15VGjsPRar59Ye7", //填写申请到的ak    
    markers: [],     //地图标记 这里暂没用到  
    longitude: null,   //经度    
    latitude: null,    //纬度    
    address: '',     //地址    
    add:"",
    username:"",
    userphone:"",
    useradresses:"",
    id:"",//用户id
    addressdata:{},
    addressid:"",

  },
  bindName:function(e){
    console.log("name",e.detail.value)
    this.setData({
     username:e.detail.value
    })
   
  },
  bindPhone:function(e){
    if(e.detail.value==""){
      wx.showToast({
        title: '请输入手机号码！',
        icon : 'warn', 
        duration: 500,
      })
    }else if(check.isinutnull(e.detail.value)){//为真不做处理
      // console.log(check.isinutnull(e.detail.value))
    }else if(check.isinutnull(e.detail.value)==0){//为假
     wx.showModal({
      title: '提示',
      content: '请输入11位正确的手机号码',
      showCancel: false,
        success: (res)=> {
        this.setData({//不正确清空
          userphone:"",
        })
        }
      })
    }
    this.setData({
      userphone: e.detail.value,  
    })
  },
  bindAdress:function(e){
    this.setData({
      username:e.detail.value
     })
  },
  handeladress:function(){
    // console.log("infsdf")
    // if(this.data.username!=""){
      this.setData({
        add:this.data.address
      })
    // }
   
  },
  bindinputAdress:function(e){
    this.setData({
      useradresses:e.detail.value
    })
  },

  handleClickSave:function(){
    console.log("addressid",this.data.addressid)
    if(this.data.addressid==""){ 
    
      console.log("增加")
      this.save();//用户添加的时候点击的保存
    }else{
      console.log("修改")
      this.updata()
    }


  },
  save(){
    if(this.data.username!=null&&this.data.id!=null&&this.data.userphone!=null&&this.data.add!=null){
      let city=`${this.data.add}${this.data.useradresses}`
      wx.request({
        url:`${baseUrl}/zlwymaster/platform/sysShippingAddress/add`, //仅为示例，并非真实的接口地址 
        method:'POST',
        data:{ 
          uId:this.data.id,//用户ID
          name:this.data.username,
          tel:this.data.userphone,
          city,   
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: (res)=> {
           console.log("增加成功",res)
          let description=res.data.description;
          switch (description) {
            case "添加成功！":
            wx.showModal({
                  title: '提示',
                  content: '恭喜添加成功！',
                  success:(res)=>{
                    wx.navigateTo({
                      url:'../collectadress/collectadress'
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
    }
  },
  updata(){
    if(this.data.username!=null&&this.data.id!=null&&this.data.userphone!=null&&this.data.add!=null){
      let city=`${this.data.add}${this.data.useradresses}`
      wx.request({
        url:`${baseUrl}/zlwymaster/platform/sysShippingAddress/upd`, //仅为示例，并非真实的接口地址 
        method:'POST',
        data:{ 
          addressId:this.data.addressid,//用户ID
          name:this.data.username,
          tel:this.data.userphone,
          city,   
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: (res)=> {
           console.log("修改成功",res)
          let description=res.data.description;
          switch (description) {
            case "更新成功！":
            wx.showModal({
                  title: '提示',
                  content: '恭喜需要成功！',
                  success:(res)=>{
                      wx.navigateTo({
                        url:'../collectadress/collectadress'
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let addressid=options.id;//根据ID修改渲染在页面上
    console.log("addressid",options.id)
    if(options.id!=undefined){
      this.setData({
        addressid:options.id
      })
      this.getDatas({
        url: `${baseUrl}/zlwymaster/platform/sysShippingAddress/willUpd`,
        cd: (data) => {
          console.log("修改地址",data,)
          let datas=data.data;
          this.setData({
            username:datas.shipto,
            userphone:datas.phone,
            add:datas.address
          })
        },
        method:'GET',
        data:{
          addressId:this.data.addressid
        },
      })

    }
    else{
      console.log("cuowu")
      this.setData({
        username:"",
        userphone:"",
        add:"",
        address:"",
        addressid:"",
      })
    }
   
   

  //获取用户ID
    wx.getStorage({
      key:"userid",
      success:(res)=>{
        this.setData({
          id:res.data.id  
        })
        
      }
    })
    //获取地理位置
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: (res)=> {
          var latitude = res.latitude
          var longitude = res.longitude
          this.setData({
                  latitude:res.latitude,
                  longitude:res.longitude
                })
              }
      })
      var that = this;  
          //新建百度地图对象  
          var BMap = new bmap.BMapWX({  
            ak: that.data.ak  
          });

          var success = function(data){  
            console.log("map",data)
            wxMarkerData = data.wxMarkerData;  
            that.setData({  
              markers:wxMarkerData,  
              latitude: wxMarkerData[0].latitude,  
              longitude:wxMarkerData[0].longitude,  
              address:wxMarkerData[0].address,  
            });  
          }  
          var fail = function(data){  
            console.log("获取地理位置失败",data)
          }  
          BMap.regeocoding({  
            fail:fail,  
            success:success  
          });
  
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