// var city_data = { "北京": { "北京市": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"] }, "上海": { "上海市": ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县"] }, "天津": { "天津市": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "蓟县"] }, "河北": { "保定市": ["安国市", "安新县", "北市区", "博野县", "定兴县", "定州市", "阜平县", "高碑店", "高阳县", "涞水县", "涞源县", "蠡县", "满城县", "南市区", "清苑县", "曲阳县", "容城县", "顺平县", "唐县", "望都县", "新市区", "雄县", "徐水县", "易县", "涿州市"] }};
var cityData = [
  {
  "name":"北京",
  "code":"110000",
  "sub": [
  {
  "name": "北京市",
  "code": "110000",
  "sub":[
  {
  "name":"东城区",
  "code":"110101"
  },
  {
  "name":"西城区",
  "code":"110102"
  },
  {
  "name":"朝阳区",
  "code":"110105"
  }]
}
]}]

//获取城市所有列表
function init(that){
  that.setData( { 
  'cityData': cityData
  });
  }
  
   
  
  module.exports={
  init:init
  }

// module.exports.getCity =getCity
