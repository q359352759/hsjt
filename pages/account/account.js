const app = getApp()
const { globalData: { baseUrl } } = getApp();
console.log(baseUrl)
Page({
  data:{
    // userInfo:{  
    //   avatarUrl:"",//用户头像  
    //   nickName:"",//用户昵称  
    // },
    value:"",
    // showModal: false,//弹窗
    imgUrl:null,
    // warnSize:'default',
    // address:'china',
    index:1,
    id:"",
    phone:"",
    userdata:{},
    email:"",
    showModalEmail:false,
    // hiddenmodalput:true,
    // isshow:true,

  
  },


      /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {
    },

    inputChange:function(e){
      // console.log("userName",this.data.userdata.userName,e.detail.value)
       this.data.userdata.nick=e.detail.value,
       this.data.value=e.detail.value,
       this.setData(this.data)
    },

    inputChangeEmail:function(e){
      console.log(e.detail.value)
      this.data.userdata.email=e.detail.value,
      this.setData(this.data)
    },
    /**
     * 隐藏模态对话框
     */
    hideModal:function() {
      this.setData({
        showModal: false
      });
    },
    hideModalEmail:function() {
      this.setData({
        showModalEmail: false
      });
    },
    /**
     * 对话框取消按钮点击事件
     */
    // onCancel:function(){

    //   this.hideModal();
    // },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function(){
      this.hideModal();
      this.getDatas({
        url: `${baseUrl}/zlwymaster/platform/cmembers/changeName`,
        cd: (data) => {
          console.log("修改成功",data)

        },
        method:'POST',
        data:{
          uId:this.data.id,
          name:this.data.value,//新的名字
        },
      })
    },
    onConfirmEmail:function(){
      this.hideModalEmail();
      this.getDatas({
        url: `${baseUrl}/zlwymaster/platform/cmembers/changeEmail`,
        cd: (data) => {
          console.log("修改成功",data)
          this.getDatas({
            url: `${baseUrl}/zlwymaster/platform/cmembers/userInfo`,
            cd: (data) => {
              console.log("用户修改邮箱数据",data)
              let phone=data.data.cellPhone;
              let tel="";
              if(phone !=""){
              
                for(let i=0;i<phone.length;i++){
                  if(i < 3 || i >= phone.length-3){
                    tel += phone[i];
                  }else{
                    tel += '*';
                }
               }
              }else{
                return;
              }  
              this.setData({
                phone:tel,
                userdata:data.data,
              })
            },
            method:'POST',
            data:{
                uId:this.data.id,
            },
          })
        },
        method:'POST',
        data:{
          uId:this.data.id,
          name:this.data.email,//新的邮箱
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

     //事件处理函数
     setPhotoInfo: function() {
      let that=this;
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          console.log("pic",res)
          let tempFilePaths=res.tempFilePaths;
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
    setName:function(){
      this.setData({
        showModal: true
      })
    },
    setLoginpPssword:function(){
      wx.navigateTo({
        url:"../forgetpossword/forgetpossword"
      })
    },
    ForgetPaypassword:function(){
      wx.navigateTo({
        url:"../paymentpassword/paymentpassword"
      })
    },
    addAddress:function(){
      wx.navigateTo({
        url:"../collectadress/collectadress"
      })
    },
    Email:function(){
      this.setData({
        showModalEmail: true
      })

    },


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

      console.log("用户ID",this.data.id)
      this.getDatas({
        url: `${baseUrl}/zlwymaster/platform/cmembers/userInfo`,
        cd: (data) => {
          console.log("用户数据",data)
          // wx.setStorage({
          //   key:'data',
          //   data:data.data
          // })
          let phone=data.data.cellPhone;
          let tel="";
          if(phone!=""){
          
            for(let i=0;i<phone.length;i++){
              if(i < 3 || i >= phone.length-3){
                tel += phone[i];
              }else{
                tel += '*';
            }
           }
          }else{
            return;
          }  
          this.setData({
            phone:tel,
            userdata:data.data,
          })
        },
        method:'POST',
        data:{
          	uId:this.data.id,
        },
      })
    },
    
    onShow: function () {

    
    },


  
})