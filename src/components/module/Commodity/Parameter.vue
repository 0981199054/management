<template>

    <div>
        <input placeholder="请输入商品参数" id="inputText" type="text">
        <!-- <el-button type="primary" plain>主要按钮</el-button> -->
        <el-button type="primary" plain @click="clicvlbutton">确定</el-button>
        <ul id="ultext" v-for="(obj,index) in textext" :key="index">
           <li><span>{{index+1}}:</span>({{obj}})</li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      textext: []
    }
  },
  methods: {
    clicvlbutton () {
      if (inputText.value === '') {
        this.$message({
          message: '系统提示！内容不能为空',
          type: 'warning'
        })
      } else {
        this.textext.push(inputText.value)
        inputText.value = ''
        this.$emit('childValue', this.textext)
      }
    }
  }
}
</script>

<style scoped>
#ultext {
  list-style: none;
}
#ultext li {
  font-size: 12px;
  color: gray;
}
#inputText {
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid gray;
}
</style>
