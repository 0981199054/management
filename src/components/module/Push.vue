<template>
    <div>
        <el-button @click="pushBtn" type="primary">推送消息</el-button>
        <el-dialog  title="推送消息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                      推送内容:<el-input v-model="input" type="textarea" :rows="4" ></el-input><br>
                      推送时间:<el-input v-model="time" style="width:250px;"></el-input><br>
                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="isok">确 定</el-button>
                      </span>
         </el-dialog>
         <el-table ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%;" height='600px' @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="用户名称" width="300" prop="nickname">
            </el-table-column>
            <el-table-column label="所在城市" width="300" prop="city"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      IP: 'http://127.0.0.1:3333/taobao',
      data: [],
      dialogVisible: false,
      multipleSelection: [],
      input: '',
      text: [],
      time: ''
    }
  },
  created () {
    axios
      .post(this.IP + '/push', { submitType: 'findJoin', ref: ['people'] })
      .then(msg => {
        this.data = msg.data[0].people
      })
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    pushBtn () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '警告,推送数据不能为空',
          type: 'error'
        })
      } else {
        this.dialogVisible = true
        var now = new Date()
        var year = now.getFullYear() // 得到年份
        var month = now.getMonth() + 1 // 得到月份
        var date = now.getDate() // 得到日期
        var hour = now.getHours() // 得到小时
        var minu = now.getMinutes() // 得到分钟
        var sec = now.getSeconds() // 得到秒
        var newdata = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec
        this.time = newdata
      }
    },
    isok () {
      let pram = {}
      pram = this.input
      axios
        .post(this.IP + '/addpush', { text: pram, time: this.time })
        .then(msg => {
          this.dialogVisible = false
          this.multipleSelection.map(item => {
            item.pushtext.push(msg.data)
          })
          this.multipleSelection.map(item => {
            console.log(item)
            axios
              .post(this.IP + '/user', { _id: item._id, pushtext: item.pushtext })
              .then(msg => {
                this.$message({
                  type: 'success',
                  message: '推送成功!'
                })
              })
          })
        })
    },
    handleClose (done) {
      done()
    }
  }
}
</script>

<style>
</style>
