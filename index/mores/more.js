var tip = 0

Page({

  data: {
    item_hedden: "none",
  },


  onTap_github:function(){
    tip += 1;
    if (tip>5){
      this.setData({
        item_hedden: "flex"
      })
    } 
  },
 
  onTap_back:function(){
    wx.navigateBack({
      url: "../begin/start"
    });

  }
})