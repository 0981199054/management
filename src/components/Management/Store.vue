<template>
  <div class="all">
    <div class="right">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="height:85px;">
        <el-tab-pane label="商品管理" value='Commodity' name="first"></el-tab-pane>
        <el-tab-pane label="店铺管理" value='Shop' name="second"></el-tab-pane>
        <el-tab-pane label="订单管理" value='Order' name="third"></el-tab-pane>
        <el-tab-pane label="推送管理" value='Push' name="four"></el-tab-pane>
        <el-tab-pane label="店铺申请" value='Shopapply' name="five"></el-tab-pane>
      </el-tabs>
      <div class="header_logo">
        <img src="../../assets/mg_logo.png" alt="">
      </div>
      <div class="perm_pe_img">
        <div class="t_img">

        </div>
        <div class="header_title">
          <p>瑶啊瑶i</p>
          <span>粉丝：</span>
          <span>消息：</span>
        </div>
        <div class="cancel" @click="backlogin"><p>注销0</p></div>
      </div>
      <div class="two_div">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  data () {
    return {
      activeName: 'first'
    }
  },
  created () {
    if (this.$store.state.login.list.name === 'test') {
      this.$router.push(`/log`)
    } else {
      this.dataList = this.$store.state.login.list
      console.log(this.dataList)
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push(`/${tab.$attrs.value}`)
    },
    backlogin () {
      this.$router.push('log')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.right {
  position: relative;
}
.el-tabs__nav {
  margin-left: 20%;
}
.el-tabs__item {
  font-size: 16px;
  padding: 22px 20px 58px 20px;
}
.el-tabs__active-bar {
  width: 65px;
}
.el-tabs__item.is-active {
  color: #ff5777;
}
.el-tabs__item:hover {
  color: #ff5777;
}
.el-tabs__active-bar {
  background-color: #ff5777;
}
.el-tabs__nav-scroll {
  height: 80px;
}
.header_logo img {
  width: 250px;
  height: 80px;
  position: absolute;
  top: 0%;
  left: 2%;
}
.header_box {
  display: flex;
}
.t_img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url("../../assets/touxian.jpg");
  background-size: 50px 50px;
}
.t_img{
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: url('../../assets/touxian.jpg');
  background-size: 50px 50px;
}
.perm_pe_img {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 2%;
  left: 77%;
}
.header_title {
  width: 160px;
  margin-left: 4%;
}
.header_title span {
  font-size: 14px;
  color: #999;
}
.header_title span:nth-of-type(2) {
  margin-left: 6%;
}
.cancel {
  width: 70px;
}
.cancel p {
  margin-top: 24px;
  font-size: 14px;
}
</style>
