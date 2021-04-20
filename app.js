let config = require('./key')

App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo);
    let clientID = config.appKey
    wx.BaaS.init(clientID)

    wx.BaaS.auth.loginWithWechat().then(user => {
      wx.setStorageSync('user', user);
    }, err => {
      console.log(err)
    })
  }
})
