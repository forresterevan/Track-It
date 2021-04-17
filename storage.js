const userInfoHandler = (data) => {
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
}

const checklogin = () => {
  let user = wx.getStorageSync('user')
  if (user) {
    this.setData({
      currentUser: user
    })
    this.navigateToEmploy()
  }
  console.log(user)
}