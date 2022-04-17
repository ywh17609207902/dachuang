// pages/Contact/Contact.js
const dbc = wx.cloud.database().collection('contactsInfo')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        contactsInfo:[],
        _avatarUrl: '', //用户头像
        _userInfo: {}, //用户信息
        _nickName: '', //用户名
        _openid:'', //用户云ID
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let t = this
        let td = this.data
       wx.cloud.callFunction({
           name:'getUserInfo',
           success(res){
               t.setData({
                _openid:res.result.openid
            })
           }
       }) 
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let t = this
        let td = this.data
        dbc.where({
            _openid:td._openid
        }).get()
        .then(res =>{
            t.setData({
                contactsInfo:res.data
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let t = this
        let td = this.data
        
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

    },

    /**自定义函数 */
    // 添加用户联系人函数，剩余从数据库读取，并渲染到contactInfo中
    addContactsInfo:function(e){
        wx.navigateTo({
          url: '../addContacts/addContacts',
        })
    }

})