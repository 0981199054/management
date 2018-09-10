<template>
  <div>
    <el-button type="primary" class="del_btn" @click="del_data">删除</el-button>
    <el-select v-model="value" class='shop_select' @change="inputChange" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="inputValue" class="shop_inp" />
    <el-button type="primary" icon="el-icon-search" class="shop_search" @click="search"></el-button>
    <el-button type="primary" class="shop_back" @click="back">返回</el-button>
    <el-table ref="multipleTable" :data="dormitory" tooltip-effect="dark" style="width: 100%" height="530px" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed prop="commodity_name" label="商品名称" width="200" align="center">
      </el-table-column>
      <el-table-column prop="commodity_img" label="商品图片 " width="120" align="center">
        <template slot-scope="scope">
          <div class="box">
            <img :src="IP+/images/+scope.row.commodity_img[0]" class="head_pic" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="promotion" label="促销价格" width="145" align="center">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="77" align="center">
      </el-table-column>
      <el-table-column prop="expressage" label="商品快递" width="120" align="center">
      </el-table-column>
      <el-table-column prop="commodity.Money_Off.full" label="优惠条件" width="77" align="center">
      </el-table-column>
      <el-table-column prop="commodity.Money_Off.decrease" label="优惠内容" width="77" align="center">
      </el-table-column>
      <el-table-column prop="specification.style" label="商品规格" width="200" align="center">
      </el-table-column>
      <el-table-column prop="stock" label="商品库存" width="77" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" @click="upd_data">修改</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="page" layout="prev, pager, next" @current-change='change' :total="this.total">
    </el-pagination>
    <el-dialog v-if="multipleSelection.length>0" title="修改数据" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].commodity_name" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="促销价格" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].promotion" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].price" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品快递" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].expressage" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠条件" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].Money_Off.full" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠内容" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].Money_Off.decrease" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-button type="primary" class="shop_add_btn" @click="shop_add_btn">增加规格</el-button>
          <div class="shop_label">
            <el-col :span="14" v-for="(item,index) in multipleSelection[0].specification" :key="index">
              <el-input v-model="multipleSelection[0].specification[index]" auto-complete="off"></el-input>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-col :span="14">
            <el-input v-model="multipleSelection[0].stock" auto-complete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      IP: 'http://127.0.0.1:3333',
      dormitory: [],
      multipleSelection: [],
      rows: 10,
      page: 1,
      total: 1,
      dialogTableVisible: false,
      dialogFormVisible: false,
      inputValue: '',
      arr: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      options: [
        {
          value: 'commodity_name',
          label: '商品名称'
        },
        {
          value: 'promotion',
          label: '促销价格'
        },
        {
          value: 'price',
          label: '商品价格'
        },
        {
          value: 'stock',
          label: '商品库存'
        }
      ],
      value: ''
    }
  },
  created () {
    console.log(this.$store.state.login.list.storeAll[0]._id)
    axios.post(this.IP + '/shop_fin', {
      _id: this.$store.state.login.list.storeAll[0]._id,
      submitType: 'findJoin',
      ref: ['commodity']
    }).then(msg => {
      console.log('msg', msg.data)
      this.$store.commit('shopData', msg.data)
      this.dormitory = this.$store.state.login.data.commodity
      this.total = this.$store.state.login.data.commodity.length
    })
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },
    // 修改
    upd_data () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择需要操作的数据'
        })
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          type: 'error',
          message: '请选择一条数据进行修改'
        })
      } else {
        this.dialogFormVisible = true
      }
    },
    sure () {
      for (var i = 0; i < this.multipleSelection[0].specification.length; i++) {
        if (
          this.multipleSelection[0].specification[i] === '' ||
          typeof this.multipleSelection[0].specification[i] === 'undefined'
        ) {
          this.multipleSelection[0].specification.splice(i, 1)
          i = i - 1
        }
      }
      axios.post(this.IP + '/update', this.multipleSelection[0]).then(msg => {
        this.dialogFormVisible = false
      })
    },
    // 删除
    del_data () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择需要操作的数据'
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.arr = this.$store.state.login.list.storeAll[0]
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.arr.commodity = this.arr.commodity.filter(item => {
              return (
                item !== this.multipleSelection[i]._id
              )
            })
          }
          // console.log(this.arr)
          // 更新数据
          axios.post(this.IP + '/shop_id_upd', this.arr).then(msg => {
            axios.post(this.IP + '/delshop', {
              ids: this.multipleSelection.map(item => item._id)
            }).then(msg => {
              axios.post(this.IP + '/shop_fin', {
                _id: this.$store.state.login.list.storeAll[0]._id,
                submitType: 'findJoin',
                ref: ['commodity']
              }).then(msg => {
                console.log('msg', msg.data)
                this.$store.commit('shopData', msg.data)
                this.dormitory = this.$store.state.login.data.commodity
                this.total = this.$store.state.login.data.commodity.length
                this.$forceUpdate()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 换页
    change (val) {
      this.page = val
      axios
        .post(this.IP + '/retailers_getdata', {
          page: this.page,
          rows: this.rows
        })
        .then(msg => {
          this.dormitory = msg.data.rows
          this.total = msg.data.total
        })
    },
    inputChange (val) {
      this.options.value = val
    },
    // 搜索按钮
    search () {
      // console.log(this.options.value)
      // console.log(this.inputValue)
      if (this.options.value) {
        let param = {}
        param[this.options.value] = this.inputValue
        this.page = 1
        axios
          .post(this.IP + '/retailers_getdata', {
            ...param,
            page: this.page,
            rows: this.rows
          })
          .then(msg => {
            this.dormitory = msg.data.rows
            this.total = msg.data.total
          })
      } else {
        this.$message({
          type: 'error',
          message: '请选择查询类型'
        })
      }
    },
    // 返回
    back () {
      this.page = 1
      this.inputValue = ''
      axios
        .post(this.IP + '/shop_fin', {
          _id: this.$store.state.login.list.storeAll[0]._id,
          submitType: 'findJoin',
          ref: ['commodity']
        })
        .then(msg => {
          this.$store.commit('shopData', msg.data)
          this.dormitory = this.$store.state.login.data.commodity
          this.total = this.$store.state.login.data.commodity.length
        })
    },
    shop_add_btn () {
      var data = ''
      this.multipleSelection[0].specification.push(data)
    }
  }
}
</script>
<style>
.head_pic {
  width: 100px;
  height: 100px;
  float: left;
}
.box {
  width: 101px;
}
.del_btn {
  margin-left: 15px;
}
.shop_select {
  width: 110px;
  margin-left: 10px;
}
.shop_inp {
  width: 208px;
  margin-left: -5px;
}
.shop_search {
  margin-left: -5px;
}
.shop_add_btn {
  position: relative;
  top: 10px;
}
.shop_label {
  padding-top: 14px;
}
.el-button--primary {
  background-color: #ff5777;
  border: none;
}
.el-pager li.active {
  color: #ff5777;
}
.el-pager li:hover {
  color: #ff5777;
}
.el-pagination button:hover {
  color: #ff5777;
}
.el-button--primary:hover {
  background-color: #ff5777;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #ff5777;
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #ff5777;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff5777;
  border-color: #ff5777;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #ff5777;
}
.el-checkbox__input:hover .el-checkbox__inner {
  border-color: #ff5777;
}
</style>
