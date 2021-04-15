let config = require('./key')
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
    let clientID = config.appKey
    wx.BaaS.init(clientID)

    wx.BaaS.auth.loginWithWechat().then(user => {
      console.log(user)
      this.globalData.currentUser = user
    }, err => {
      console.log(err)
    })
  },
  globalData: {}
})
