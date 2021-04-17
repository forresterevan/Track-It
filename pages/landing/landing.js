// pages/landing/landing.js
Page({
  data: {},
  
  onLoad: function () {
    setTimeout(this.navigateToIndex, 3000);
  },

  navigateToIndex: function () {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
