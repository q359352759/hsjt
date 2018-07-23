// pages/setupshop/setupshop.js
const check = require("../../utils/check.js");
const { globalData: { baseUrl } } = getApp();
// 引入SDK核心类
var bmap = require('../../utils/bmap-wx.min.js');   
var wxMarkerData = [];  //定位成功回调对象 
//以上是获取用户地理位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "jUkTm49I1Zbo4Hrir15VGjsPRar59Ye7", //填写申请到的ak    
    markers: [],     //地图标记 这里暂没用到  
    longitude: null,   //经度    
    latitude: null,    //纬度    
    selectPerson:true,
    firstPerson:'实体店铺',
    selectArea:false,
    industryData: [],//行业数据
    index: -1,
     winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    id:"",//用户ID
    name:"",//法人姓名
    storName:"",//店铺名
    legalID:"",//身份证
    userPhone:"",//手机号
    value:"",//行业分类的数据
    fraction:"",//分润比例
    address:"",//经营地址
    imgUrl:"",//店铺首页图片
    imgUrl_2:"",//营业执照图片
    license:"",//执照注册号
    adviserPhone:"",//营销顾问手机号
    safeguards:"",//保障金
    industryTypeID:"0",
    chooseSize:false,
    animationData:{},
    number:1,//保障金下拉列表
    text:"",//保障金文字
    showView:true,
   
  },

// 切换
bindChange: function( e ) {  
  var that = this;  
  that.setData( { currentTab: e.detail.current });  

},
hide:function(){
  this.setData({
    showView: (!this.data.showView)
  })

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

//点击行业分类
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为',e);
    let arr=e.detail.value;
    this.setData({
      value:this.data.industryData[arr].id
    })
    // console.log("id",this.data.industryData[arr].id)
    this.setData({
      index: e.detail.value,
    })

  },

   //点击选择类型下拉列表
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
  //判断是否输入手机号码
  bindPhone:function(e){
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
          userPhone:"",
        })
        }
      })
    }
    this.setData({
      userPhone: e.detail.value,  
    })

  },
  //地理位置
  bindAdress:function(e){
    console.log(e.detail.value)
    let value=e.detail.value
    if(value==""){
      wx.showToast({
        title: '请输入地址',
        icon : 'warn', 
        duration: 500,
      })
    }


  },
  //店铺首页
  setPhotoStor: function() {
    let that=this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.log("pic",res)
        let tempFilePaths=res.tempFilePaths;
        console.log("path",tempFilePaths[0])

        let base64 = wx.arrayBufferToBase64(tempFilePaths[0]);
        console.log("base64",base64)
        that.setData({
          imgUrl:tempFilePaths,
        })      
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },
  //营业执照
  setLicense:function(){
    let that=this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.log("pic",res)
        let tempFilePaths=res.tempFilePaths;
        that.setData({
          imgUrl_2:tempFilePaths,
        })      
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },
  bindName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindStor:function(e){
    this.setData({
      storName:e.detail.value
    })
  },
  bindID:function(e){
    this.setData({
      legalID:e.detail.value
    })
  },
  bindfraction:function(e){
    this.setData({
      fraction:e.detail.value
    })
  },
  bindLicense:function(e){
    this.setData({
      license:e.detail.value
    })
  },
  safeguards:function(e){
    this.setData({
      safeguards:e.detail.value
    })
  },
  adviserPhone:function(e){
    this.setData({
      adviserPhone:e.detail.value
    })
  },
  handeClicksafe:function(e){
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
        animationData: animation.export(),
        showView:true,
      })
    },200)

  },
  changeOil:function(e){
    console.log("kkk",e);
    this.setData({
      number:e.target.dataset.num,
      text:e.target.dataset.text
    })
  },


  addShop:function(){
    console.log("法人姓名",this.data.name)
    console.log("店铺名",this.data.storName)
    console.log("身份证",this.data.legalID)
    console.log("手机号",this.data.userPhone)
    console.log("行业分类数据",this.data.value)
    console.log("分润比例",this.data.fraction)
    console.log("地址",this.data.address)
    console.log("店铺首页图片",this.data.imgUrl[0])
    console.log("营业执照图片",this.data.imgUrl_2[0])
    console.log("执照注册号",this.data.license)
    console.log("营销顾问手机号",this.data.adviserPhone)
    console.log("保障金",this.data.safeguards)
    console.log("店铺类型",this.data.currentTab)//0个人店铺
    console.log("经度",this.data.longitude)//经度
    console.log("维度",this.data.latitude)//维度
    console.log("用户ID",this.data.id)//用户ID
    
    if(this.data.name!=""&&this.data.storName!=""&&this.data.legalID!=""&&this.data.userPhone!=""&&this.data.value!=""&&this.data.fraction!=""&&this.data.address!=""&&this.data.imgUrl!=""&&
    this.data.imgUrl_2!=""&&this.data.license!=""&&this.data.adviserPhone!=""&&this.data.safeguards!=""){
      //成功申请店铺
      check.getDatas({
        url: `${baseUrl}/zlwymaster/mall/mobile/shop/addShop`,
        cd: (data) => { 
              console.log("添加店铺成功",data,) 
              if(data=="添加店铺成功"){
                  wx.showModal({
                    title: '提示',
                    content:'恭喜添加成功',
                    })
                    // src="http://wysh1.oss-cn-shanghai.aliyuncs.com/f61b24ddc281421486a52fda0977d2cf.png"
              }
              // else{
              //   let res=data.data
              //   if(res.message=="营销顾问手机号有误!"){
              //     wx.showModal({
              //       title: '提示',
              //       content:res.message,
              //       })
              //   }

              // }
               

            },
        method:'POST',
        data:{
        id:this.data.id,//用户ID
        type:1,//店铺类型
        name:this.data.name,//
        shopName:this.data.storName,
        idCard:this.data.legalID,
        phone:this.data.userPhone,
        industryType:this.data.value,
        shopAddress:this.data.address,
        mainLogo:this.data.imgUrl[0],
        security:this.data.safeguards,
        agentinfo:this.data.adviserPhone,
        contractRatio:this.data.fraction,
        businessLicenceNumberPhoto:this.data.imgUrl_2[0],
        businessLicenceNumber:this.data.license,
        twocategoryid:0,
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        },
      })

    }else{
      wx.showModal({
        title: '提示',
        content:'信息填写有误',
        })

    }

      

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
     //同步获取本地用户ID
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

    //获取营销顾问的信息
    check.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/shop/getAgentinfo`,
      cd: (data) => { 
            console.log("营销顾问的信息",data,) 
            if(data.data==null){
              return
            }else{
              this.setData({
                adviserPhone:data.data
              })
            }
    
          },
      method:'POST',
      data:{
        id:this.data.id
      },
    })


    //获取行业分类
    check.getDatas({
      url: `${baseUrl}/zlwymaster/mall/mobile/shopcategory/getCategory`,
      cd: (data) => { 
            console.log("行业分类数据",data,) 
            let arr=[]
            let arr_2=[]
            for(let i=0;i<data.length;i++){
              arr.push(data[i].one)
              arr_2.push(data[i].one.id)
            }
            // console.log("转换后的",arr,arr_2)
            this.setData({
              industryData:arr,
              index2:arr_2,
            })
            console.log("shuju ",this.data.industryData,this.data.index2)
          },
      method:'POST',
      data:{},
    })
    wx.getSystemInfo( {  
      success:( res ) =>{  
        this.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
    });

    //获取地理位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res)=> {
        console.log("地理位置",res)
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