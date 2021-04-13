// pages/user/user.js
Page({
  data: {

  },

  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        wx.setStorageSync('user', user)
        this.setData({ currentUser: user })
        this.getMyJobs()
      }, err => {
        console.log(err)
    })
  },
  onLoad: function (options) {
    let currentUser = wx.getStorageSync('user')
    if (currentUser) {
      this.setData({ currentUser: currentUser })
      this.getMyJobs()
    }
  },
  getMyJobs: function () {
    let favoriteJobs= new wx.BaaS.TableObject('favorite_jobs')
      let query = new wx.BaaS.Query()
      let currentUserId = this.data.currentUser.id.toString()
      query.compare('user_id', '=', currentUserId)
      favoriteJobs.setQuery(query).expand(['job_id']).find().then(res => {
        console.log(res)
        this.setData({favoriteJobs: res.data.objects})
      })
  }
})