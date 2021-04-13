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
      this.setData({ jobs: res.data.objects })
    })
  },
  navigateToShow: function(e) {
    wx.navigateTo({
      url: `/pages/show/show?id=${e.currentTarget.dataset.id}`,
    })
  }
})
