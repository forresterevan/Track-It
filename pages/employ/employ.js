// pages/employ/employ.js
const app = getApp()
Page({
  data: {

  },
  employer: function() {
    console.log("employer")
    let Employer = new wx.BaaS.TableObject("user_roles")
    let newEmployer = Employer.create()
    let user = app.globalData.currentUser
    console.log(user)
    newEmployer.set({user_id: user.id, is_employer: true}).save().then(res => {
      console.log(res)
      wx.setStorageSync('employer', res)
      this.navigateToIndex()
      this.setData({employer: true})
    })
  },
  employee: function() {
    console.log("employee")
    let Employee = new wx.BaaS.TableObject("user_roles")
    let newEmployee = Employee.create()
    let user = app.globalData.currentUser
    console.log(user)
    newEmployee.set({user_id: user.id}).save().then(res => {
      console.log(res)
      wx.setStorageSync('employee', res)
      this.navigateToIndex()
      this.setData({employee: true})
    })
  },
  onLoad: function (options) {
    this.silentLogin()
  },

  silentLogin: function () {
    wx.BaaS.auth.loginWithWechat().then(user => {
      console.log(user)
      this.getUserRole(user)
    })
  },

  getUserRole: function (user) {
    let Role = new wx.BaaS.TableObject("user_roles")
    let query = new wx.BaaS.Query()
    query.compare('user_id','=', user.id)
    Role.setQuery(query).find().then(res => {
      console.log(res)
      if(res.data.objects.length > 0) {
        this.navigateToIndex()
      }
    })
  },

  navigateToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})