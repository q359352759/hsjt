// components/addressItems/addressItems.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
    },
    index:{
      type:String,
    }
  },
  ready(){
    console.log("jkj",this.data.index)
  },

  /**
   * 组件的初始数据
   */
  data: {
  

  },
  // radioChange: function(e) {
  //   // this.setData({
  //   //   index++;
  //   // })
  //   index++;
  //   console.log('radio发生change事件，携带value值为：', e.detail.value)
  // },


  /**
   * 组件的方法列表
   */
  methods: {
    handelClickUpdata(){
      // console.log("in")
      this.triggerEvent("uapdata",{ids:this.data.item.ids})
    },
    handelClicDel(){
      console.log("in")
     this.triggerEvent("del",{ids:this.data.item.ids})
    },
    radioChange(e){
      this.triggerEvent("radio",{e:e.detail.value})
    },

  }
})
