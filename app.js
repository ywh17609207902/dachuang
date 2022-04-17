// app.js
App({
  onLaunch() {

    // 使用云开发
    wx.cloud.init({
      env:"cloud1-1glqwd50145bbddb",
      traceUser:false
    })

    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    
  },
  globalData: {
    userInfo: null
  }
})
