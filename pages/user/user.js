// pages/user/user.js
Page({
  data: {
  },
  checkEmployer: function () {
    let userRole = new wx.BaaS.TableObject("user_roles")
    let query = new wx.BaaS.Query()
    query.compare("user_id", "=", this.data.currentUser.id)
    userRole.setQuery(query).find().then(res =>{
      console.log(res)
      let role = res.data.objects[0]
      this.setData({is_employer: role.is_employer})
    })
  },
  toForm: function () {
    wx.navigateTo({
      url: '/pages/form/form',
    })
  },
  navigateToShow: function (e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
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
      this.checkEmployer()
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