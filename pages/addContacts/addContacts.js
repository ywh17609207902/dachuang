// 添加手机联系人页面
// 获取数据库实例
const db = wx.cloud.database().collection('contactsInfo')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    contactsName:'',    //姓名
    contactsNumber:'',   //电话
    contactsRelation:['亲人','朋友','恋人','其他'],   //标签
    index:0
  },
    //   自定义函数
  relationChange(e){
      this.setData({
        //设置关系
          index:e.detail.value
      })
  },
  handleInput(e){
     let type = e.currentTarget.dataset.type;
    this.setData({
      // 设置姓名和电话
        [type]:e.detail.value
    })
  },

  addContactsInfo:function(){
    let t = this
    let td = this.data
    // 电话号的正则表达式
    let numberReg = /^1(3|4|5|6|7|8|9)\d{9}$/


    // 姓名框和电话框不为空
    if (((td.contactsName && td.contactsNumber) == '') ) {
      wx.showToast({
        title: '请填写完整',
        icon:'error'
      })
    }else if (!numberReg.test(td.contactsNumber)) {   //手机号格式不对
      wx.showToast({
        title: '手机格式不正确',
        icon:'error'
      })
    }else{
      db.add({
        data:{
          contactsName:td.contactsName,
          contactsNumber:td.contactsNumber,
          contactsRelation:td.contactsRelation[td.index],
        },
        success(){
          wx.showToast({
            title: '添加成功',
          }),
          setTimeout(function(){
            wx.navigateBack({
              url: '../Contact/Contact',
            })
          },1500)     //跳转时间控制
        },
        fail(){
          wx.showToast({
            title: '请重试',
          }) 
        }
      })
    }
  }
})