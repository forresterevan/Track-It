const app = getApp()
Page({
  data: {
  },
  onLoad() {
    this.getJobs()
    this.userInfoHandler()
  },
  getJobs: function() {
    let Jobs = new wx.BaaS.TableObject('jobs'); 
    Jobs.find().then((res) => {
      this.getCities(res.data.objects) 
      this.setData({ jobs: res.data.objects })
    })
  },
  getCities: function(jobs){
    let cities = jobs.map( job => job.city)

    let cityObj = {}
    cities.forEach(city => cityObj[city] = city)
    let uniqCities = Object.keys(cityObj)
    this.setData({jobsLocation: uniqCities})
  },
  navigateToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  },

  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        wx.setStorageSync('user', user)
        this.setData({user})
        // this.getMyJobs()
        console.log(user.avatar)
      }, err => {
        console.log(err)
    })
  }
})
