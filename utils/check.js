// 检测是否有输入  
function checkIsNotNull(content){  
    return (content && content!=null)  
}  
  
// 检测输入内容  
function checkPhoneNum(phoneNum){  
    console.log(phoneNum)  
    if(!checkIsNotNull(phoneNum)){  
        return false  
    }  
  
    return true  
}  
  
// 比较两个内容是否相等  
function isContentEqual(content_1, content_2){  
    if(!checkIsNotNull(content_1)){  
        return false  
    }  
  
    if(content_1 === content_2){  
        return true  
    }  
  
    return false  
}  
//手机号码
function isinutnull(content){
    let value=content
    let strkong=/^1[1-9][0-9]{9}$/;
    if(strkong.test(value)){  
        console.log("tr")  
         return 1;
    }else{
        return 0;
    } ;
}
//验证码
function VerificationCode(contents){
    // console.log(typeof contents)
    let num=~~contents;
    console.log(typeof num)
    let code=/^[0-9]{9}$/;
    if(code.test(num)){  
        // console.log("tr")  
         return 1;
    }else{
        return 0;
    } ;
}
//密码
function password(contentsd){
    let mun=contentsd;
    let pass=/^[0-9a-zA-Z]{6,}$/g;
    if(pass.test(mun)){  
         return 1;
    }else{
        return 0;
    } ;
}

  // 请求数据
function getDatas( {url, cd,method,data} ) {
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
  }

  
module.exports = {  
   isinutnull,
  VerificationCode ,
  password,
  getDatas
}  