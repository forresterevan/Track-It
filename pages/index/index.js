const app = getApp()
Page({
  data: {
  },
  onLoad() {
    this.getJobs()
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
  }
})
