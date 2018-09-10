let module2 = {
  state: {
    list: [
      { id: '1', name: 'ipad1', unit: 200, num: 1, ischeck: true },
      { id: '2', name: 'ipad2', unit: 300, num: 1, ischeck: true },
      { id: '3', name: 'ipad3', unit: 400, num: 1, ischeck: true },
      { id: '4', name: 'ipad4', unit: 500, num: 1, ischeck: true },
      { id: '5', name: 'ipad5', unit: 600, num: 1, ischeck: true }
    ]
  },
  // 提升性能
  getters: {
    // 总价格
    sun (state) {
      return state.list.reduce((p, n) => {
        if (!n.ischeck) return p
        return p + n.unit * n.num
      }, 0)
    },
    // 总数量
    account (state) {
      return state.list.reduce((p, n) => {
        if (!n.ischeck) return p
        return p + n.num
      }, 0)
    }
  },
  // 改变状态唯一途径
  mutations: {
    addNum (state, data) {
      state.list.forEach(item => {
        if (item.id === data.id) {
          item.num++
        }
      })
    },
    decNum (state, data) {
      state.list.forEach(item => {
        if (item.id === data.id) {
          if (item.num > 0) { item.num-- }
        }
      })
    },
    // ChangeNum (state, data) {
    //   state.list.find(item => item.id === data.id).num += data.val
    // },
    delNum (state, data) {
      state.list = state.list.filter(item => item.id !== data.id)
    },
    changeAll (state, data) {
      state.list.forEach(item => {
        item.ischeck = data
      })
    },
    addList (state, obj) {
      state.list.push(obj.data)
    },
    oppo (state, data) {
      state.list.forEach(item => {
        if (item.id === data.id) {
          item.ischeck = data.ischeck
        }
      })
    }
  }
}

export default module2
