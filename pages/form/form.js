// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit(e) {
    console.log(e.detail.value)
    let tableName = 'jobs'
    let Jobs = new wx.BaaS.TableObject(tableName)
    let job = Jobs.create()
    let jobinfo = {
      company: e.detail.value.company,
      title: e.detail.value.title,
      city: e.detail.value.city,
      job_type: e.detail.value.job_type,
      description: e.detail.value.description,
    }
    
    job.set(jobinfo).save().then(res => {
      // success
      console.log(res)
    }, err => {
      //err 为 HError 对象
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})