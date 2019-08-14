<template>
  <div>
    xiangiqng
  </div>

</template>
<script>


export default {
  name: 'home',
  data(){
  	return {
		  imgBanner:[],
          selected:"",
      tabbars:tabbars,  //底部栏数据
      currentIndex:0,
      name:'',
      // showLogin:2,
      showOut:false,
      showLogin:true,
        pickNum:0,  //底部栏 购物的数量
  	}
  },


  methods:{
    changeHash(index){
      this.currentIndex=index
    },
    quit(){
      delCookie('username');
      this.$router.push('/')
    },
    login(){
      this.$router.push('/login')
    }
  },

   watch:{
    // 监听tabbar选中
    selected:function(newV,oldV){
      // console.log("当前的："+newV,"上一个："+oldV);
      // console.log("selected："+this.selected);
      this.$router.push({name:this.selected});
    }
  }
}
</script>
