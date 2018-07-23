Page({
  data: {
  // 新用户如何让登录
  showView: false,
  //挪车二维码如何领取
  showViews: false,
  // 挪车服务如何领取
  show_tab3:false,
  // 次卡如何办理
  show_tab4: false,
  },
  
  onLoad: function (options) {
  // 生命周期函数--监听页面加载
  
  // 新用户如何让登录
  showView: (options.showView == "true" ? true : false);
  //挪车二维码如何领取
  showViews: (options.showViews == "true" ? true : false);
  // 挪车服务如何领取
  show_tab3: (options.show_tab3 == "true" ? true : false);
  // 次卡如何办理
  show_tab4: (options.show_tab4 == "true" ? true : false);
  },
  // 新用户如何让登录
  onChangeShowState: function () {
  var that = this;
  that.setData({
  // 1
  showView: (!that.data.showView),
  // 2
  showViews:false,
  // 3
  show_tab3: false,
  // 4
  show_tab4: false
  })
  },

  
  //挪车二维码如何领取
  btn_show: function () {
  var that = this;
  that.setData({
  // 2
  showViews: (!that.data.showViews),
  // 1
  showView: false,
  // 3
  show_tab3: false,
  // 4
  show_tab4: false
  })
  },
  // 挪车服务如何领取
  show_tab3: function () {
  var that = this;
  that.setData({
  // 3
  show_tab3: (!that.data.show_tab3),
  // 2
  showViews:false,
  // 1
  showView: false,
  // 4
  show_tab4: false
  })
  },
  // 次卡如何办理
  show_tab4: function () {
  var that = this;
  that.setData({
  // 4
  show_tab4: (!that.data.show_tab4),
  // 3
  show_tab3:false,
  // 2
  showViews: false,
  // 1
  showView: false,
  })
  },
  
  // 拨打电话
  btn_sub: function () {
  wx.showModal({
  content: '400-3735324', confirmText: "呼叫", cancelColor: "#2F79A5", confirmColor: "#2F79A5", success: function (res) {
  if (res.confirm) {
  wx.makePhoneCall({
  phoneNumber: '400-3735324',
  success: function () {
  console.log("拨打电话成功！")
  },
  fail: function () {
  console.log("拨打电话失败！")
  }
  })
  } else {
  
  }
  
  }
  })
  }
  })