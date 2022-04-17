// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = wx.cloud.database()

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    
    return await db.collection('contactsInfo').add({
        data:{
            contactsName:event.contactsName,
            contactsNumber:event.contactsNumber,
            contactsRelation:event.contactsRelation
        }
    })
}