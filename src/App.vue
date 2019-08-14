<template>
  <div id="app">

    <!--顶部栏区域-->
<!--     <mt-header title="首页" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header> -->

    <!-- 路由组件出口 -->
    <router-view class='main-box'></router-view>

       <!-- 底部栏 -->
    <div class="tabbar">
      <ul>
        <li v-for='(tabbar,index) in tabbars' :key='tabbars.id'>
            <router-link :to='tabbar.routerName' @click.native="changeHash(index)" :class='{"link-active":index==currentIndex}'>
              <img :src="tabbar.tabImgSrc">
                <mt-badge size="samll" v-if="index===2">{{pickNum}}</mt-badge>
              <div>{{tabbar.title}}</div>
            </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

  // 底部栏图标显示
  import home from "./assets/img/home.png"
  import vip from "./assets/img/vip.png"
  import shopcar from "./assets/img/car.png"
  import search from "./assets/img/search.png"
  var tabbars=[
    {id:1, tabImgSrc:home, title:"首页",routerName:{name:'home',}},
    {id:2, tabImgSrc:vip, title:"文章",routerName:{name:'articleList',}},
    {id:3, tabImgSrc:shopcar, title:"购物车",routerName:{name:'goodsList',}},
    {id:4, tabImgSrc:search, title:"个人中心",routerName:{name:'user',}},
  ]

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

/*  created() {
    // // http://hn2.api.okayapi.com/?&service=App.Table.Get&model_name=okayapi_article&id=1
    // http://hn2.api.okayapi.com/?&service=&total=3
      this.$axios.get('http://hn2.api.okayapi.com/?service=App.Common_Faker.Image',{
        params:{
          app_key:'9253546D515412902B39F9ED135923D0',
          total:4,
        }
      })
        .then(res =>{
          console.log(res.data.data.items.imageUrl);
          this.imgBanner=res.data.data.items.imageUrl;
        })
        .catch(error=>{
          console.log("新闻详情数据异常:" + error)
        })
  },
*/
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


<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#leave{
  padding-top: 40px;
  padding-bottom: 60px;
}
.main-box{
   padding-top: 40px;
   padding-bottom:62px;
   overflow:hidden;
}
.tabbar{
  position: fixed;
  width: 100%;
  left:0;
  bottom: 0;
  background-color: #ddd;
  border-top: solid 1px #ddd;
}

.tabbar li{
  float: left;
  width: 25%;
  text-align: center;
    position: relative;
}
.tabbar a{
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 0;
}
.tabbar img{
  width: 30px;
  display: block;
  margin: 0 auto;
}
.tabbar .router-link-exact-active {
  color: red;
  background-color: #fff;
}
.mint-badge {
    position: absolute;
    top: 4px;
    right: 4px;
    width:20px;
    height: 20px;
    border-radius: 50%;
}
</style>
