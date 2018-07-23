// pages/applypartner/applypartner.js
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // region: ['四川省', '成都市', '武侯区'],//初始值
    useID:"",//用户ID
    customItem: '全部',
    name:"",
    phone:"",
    adviserPhone:"",
    condition: false,
    cityData:[],
    qyopen: false,
    qyshow: true,
    select1: '',
    select2: '',
    select3: '',
    value:[0,0,0],
    text_province:"",//省
    text_county:"",//市 
    text_disrict:"",//县城
  
  },
//点击选择区域
bindRegionChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    region: e.detail.value
  })
},
bindName:function(e){
  this.setData({
    name:e.detail.value
  })
},
bindPhone:function(e){
 if(e.detail.value!=""){
    if(check.isinutnull(e.detail.value)==0){//为假
      wx.showModal({
       title: '提示',
       content: '请输入11位正确的手机号码',
       showCancel: false,
         success: (res)=> {
          if (res.confirm) {
            this.setData({//不正确清空
              phone:"",
            })
          } 
         }
       })
     }

  }
 
  this.setData({
    phone:e.detail.value
  })
},
bindAdviser:function(e){
  if(e.detail.value!=""){
    if(check.isinutnull(e.detail.value)==0){//为假
      wx.showModal({
       title: '提示',
       content: '请输入11位正确的手机号码',
       showCancel: false,
         success: (res)=> {
           if (res.confirm) {
             this.setData({//不正确清空
               adviserPhone:"",
             })
           } 
        
         }
       })
     }

  }
 
  this.setData({
    adviserPhone:e.detail.value
  })
},
//选择起点，分类数据
listqy: function (e) {

  if (this.data.qyopen) {
    this.setData({
      qyopen: false,//点击显示
      qyshow: false,//点击显示
    })
  } else {
    this.setData({
      qyopen: true,
      qyshow: false,
    })
  }

},
bindfocus:function(e){
  console.log("eeee",e)
  let val=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]]//县城
  let val_province=this.data.cityData[this.data.value[0]].province.areaname//省
  let val_county=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city.areaname//市区

  if(val==undefined){
    console.log("+++++++++++iddd",this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city)  
    let val_disrict=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city.areaname//市区即县城
    let val_city=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city //县城   
    let cityid=val_city.id
    console.log("cityid",cityid)
    let texts=`${val_province}-${val_disrict}`

    this.setData({
      value:e.detail.value,
      areaid:cityid,//县城ID
      text:texts,
      // text_province:val_province,//省
      // text_county:val_disrict//市区即县城

    })
  }else{
    console.log("+++++++++++",val)
    console.log("id",val.id)
    let text=`${val_province}-${val_county}-${val.areaname}`
    this.setData({
      value:e.detail.value,
      areaid:val.id,
      text,
      // text_province:val_province,//省
      // text_county:val_county,//市区
      // text_disrict:val.areaname//县城

    })


  }

},
bindChange:function(e){
  // console.log("eeee",e)
  this.setData({
    value:e.detail.value
  })


},
handelClose:function(){
  // console.log("value",this.data.value)
  this.setData({
        condition:!this.data.condition,
        text:"",

      })
},
handelSave:function(){
  // console.log("value++++",this.data.value)
  let val=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].districtList[this.data.value[2]]//县城
  let val_province=this.data.cityData[this.data.value[0]].province.areaname//省
  let val_county=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city.areaname//市区

  if(val==undefined){
    // console.log("+++++++++++iddd",this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city)  
    let val_disrict=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city.areaname//市区即县城
    let val_city=this.data.cityData[this.data.value[0]].listcity[this.data.value[1]].city //县城   
    let cityid=val_city.id
    // console.log("cityid",cityid)
    let texts=`${val_province}-${val_disrict}`

    this.setData({
      // value:e.detail.value,
      areaid:cityid,//县城ID
      text:texts,
    })
  }else{
    //  console.log("+++++++++++",val)
    //  console.log("id",val.id)
    let text=`${val_province}-${val_county}-${val.areaname}`
    this.setData({
      // value:e.detail.value,
      areaid:val.id,
      text,
    

    })


  }


  this.setData({
    condition:!this.data.condition,


  })
},
open: function (e) {
  // console.log("e",e)
  this.setData({
    condition:!this.data.condition,


  })
},
btn:function(){
  //申请为合伙人
  console.log("id+name+phone+rePhone+areId",this.data.useID,this.data.name,this.data.phone,this.data.adviserPhone,this.data.areaid)
  check.getDatas({
    url: `${baseUrl}/zlwymaster/mall/mobile/agentinfo/addAgentinfo`,
    cd: (data) => { 
          console.log("申请为合伙人",data,) 
          let message=data.message
          switch (message) {
            case "手机号不正确":
            wx.showToast({
              title: '请正确填写推荐人手机号码！',
              icon: 'success',
              duration: 2000
            })
            break;
            case "同一个手机号不能重复申请":
              wx.showToast({
                title: '同一个手机号不能重复申请',
                icon: 'success',
                duration: 2000
              })
            break;
            case "申请成功":
              wx.showToast({
                title: '恭喜申请成功！',
                icon: 'success',
                duration: 2000
              })
            break;
            default:
            wx.showModal({
              title: '提示',
              content: '你输入有误,请重新输入！',
              })
          } 
        },
    method:'POST',
    data:{
      id:this.data.useID,//当前登录用户ID
      name:this.data.name,
      phone:this.data.phone,
      referencePhone:this.data.adviserPhone,
      areaid:this.data.areaid,
    },
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取区域地址
       try {
      var value = wx.getStorageSync('areadata')
      var Ids = wx.getStorageSync('userid')
      if (value) {
        this.setData({
               cityData:value.data,
               useID:Ids.id
              })    
      }
    } catch (e) {
      console.log("errr",e)
  
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