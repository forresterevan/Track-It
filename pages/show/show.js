// pages/show/show.js
Page({
  data: {

  },
  getJobs: function (id) {
    let Jobs = new wx.BaaS.TableObject('jobs')
    Jobs.get(id).then(res => {
      console.log(res)
      this.setData({
        job: res.data
      })
    }, (err) => {
      console.log(err)
    })
  },
 
  onLoad: function (options) {
    let id = options.id
    this.getJobs(id);
  },
})