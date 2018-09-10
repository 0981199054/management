let TBShop = {
  state: {
    list: [],
    user: '',
    userImg: 'index.jpg',
    islog: '未登录'
  },
  // 提升性能
  getters: {
    // 总价格
    sum (state) {
      return state.list.reduce((p, n) => {
        if (!n.ischeck) return p
        return p + n.unit * n.num
      }, 0)
    },
    // 总数量
    JDaccount (state) {
      return state.list.reduce((p, n) => {
        if (!n.ischeck) return p
        return p + (n.num - 0)
      }, 0)
    }
  },
  // 改变状态唯一途径
  mutations: {
    // 增加购买项
    addNum (state, data) {
      state.list.forEach(item => {
        if (item._id === data._id) {
          item.num++
        }
      })
    },
    // 减少购买项
    decNum (state, data) {
      state.list.forEach(item => {
        if (item._id === data._id) {
          if (item.num > 0) { item.num-- }
        }
      })
    },
    // 删除购买项
    delNum (state, data) {
      state.list = state.list.filter(item => item._id !== data._id)
    },
    // 全选框全选
    changeAll (state, data) {
      state.list.forEach(item => {
        item.ischeck = data
      })
    },
    // 子栏选中状态
    oppo (state, data) {
      state.list.forEach(item => {
        if (item._id === data._id) {
          item.ischeck = data.ischeck
        }
      })
    },
    // 获取列表
    getList (state, data) {
      console.log(state.user)
      // state.list = data
      state.list = data.filter(item => item.user === state.user)
    },
    // 存储用户
    JDuser (state, data) {
      state.userImg = data.img
      state.islog = '已登录'
      state.user = data.user
    },
    // 退出登录
    JDexit (state, data) {
      state.userImg = 'index.jpg'
      state.islog = '未登录'
      state.user = ''
    }
  }
}

export default TBShop
