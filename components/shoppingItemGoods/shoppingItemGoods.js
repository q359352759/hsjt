// components/shoppingItemGoods/shoppingItemGoods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
    },
    picUrls:{
      type:null,
    }

    
  },
  ready(){
   console.log("++++picUrls",this.data.item)
 },
 

  /**
   * 组件的初始数据
   */
  data: {
 
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onTapItem(e){
      // let item=e.detail.currentTarget

      
      this.triggerEvent("detailGoods",e)
  },
//   imgload(){
//     this.triggerEvent("imgload")
// },


  }
})
