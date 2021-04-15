// pages/landing/landing.js
Page({
  data: {
  },
  onLoad: function () {
    this.checklogin()
  },
  userInfoHandler: function(data) {
    console.log(data)
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        console.log(res)
        wx.BaaS.auth.updateUserInfo(res).then(user => {
          console.log(user)
          wx.setStorageSync('user', user)
          this.navigateToEmploy()
          }, err => {
            console.log(err)
        })
      }
    })
  },
  checklogin: function () {
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({
        currentUser: user
      })
      this.navigateToEmploy()
    }
    console.log(user)
  },
  getUserLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
      }
    })
  },
  navigateToEmploy: function(e) {
    wx.navigateTo({
      url: `/pages/employ/employ`,
    })
  }
})