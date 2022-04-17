// pages/work/work.js
var zhenzisms = require('../../utils/zhenzisms.js');
//获取应用实例
const app = getApp()

Page({
  data:{
    number:""
  },
  bindKeyInput: function(e){
    this.setData({
      number: e.detail.value
    })
  },
  sendSmscode:function(){
    const number ="this.data.number";
    const apiUrl ="https://sms_developer.zhenzikj.com";
    const appId ="110751";
    const appSecret ="494966b8-d8ab-4406-a167-daf65bc43a0f";
    zhenzisms.client.init(apiUrl, appId, appSecret);
    var params = {};
    //接受手机号码
    params.number = '18511111111';
    params.templateId = '7929';
    //生成验证码，参数1:验证码位数，参数2:验证码有效期(秒),参数3:手机号码
    //var code = zhenzisms.client.createCode(4, 300, number);//生成验证码
    var templateParams = [];//生成短信
    params.templateParams = templateParams;
    //发送短信
    zhenzisms.client.send(function (res) {
      console.log(res.data)
    }, params);
  },
  onLoad(){

  },
  calling:function() {
    wx.makePhoneCall({
      phoneNumber: '120',
      sucess:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  }
})