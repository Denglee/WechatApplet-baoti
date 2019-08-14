<template>
    <div>
      <!-- 回顶部按钮为一张50*50的图片 -->
      <!-- btnFlag 控制图片显示隐藏 -->
      <!-- backTop 回顶部的方法 -->
      <img v-if="btnFlag" class="go-top" src="../assets/img/goTop.png" @click="backTop">
    </div>
</template>

<script>
  export default {
    name: "goTop",
    data(){
      return {
        btnFlag:false,
      }
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },

    methods: {
      // 点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop () {
          let that = this
          let timer = setInterval(() => {
            let ispeed = Math.floor(-that.scrollTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
            if (that.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 0)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      }
    }

  }
</script>
<style lang="less" scoped>
.go-top{
  position:fixed;
  bottom:16%;
  right:2%;
  z-index:111111;
  width:50px;
  height:50px;
}
</style>

