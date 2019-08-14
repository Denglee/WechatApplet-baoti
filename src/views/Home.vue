<template>
    <div id="home">
      <topTabbar :title="title"/>
      <!--轮播图-->
        <!-- <my-swiper url="https://api.apiopen.top/getImages"></my-swiper> -->
      <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="item in imgs" :key="imgs.id">
          <img :src="item.picUrl" class="img-lunbo" alt="">
        </mt-swipe-item>
      </mt-swipe>

      <!-- 九宫格 -->
      <ul class="list clearfix">
        <li v-for='(grid,index) in grids' :key='grids.id'>
            <router-link :to='grid.router'>
              <img :src="grid.src">
              <div>{{grid.title}}</div>
            </router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import src1 from "../assets/img/news.png"
  import src2 from "../assets/img/pic.png"
  import src3 from "../assets/img/shop.png"
  import src4 from "../assets/img/title.png"
  import src5 from "../assets/img/contack.png"
  import src6 from "../assets/img/message.png"

  /*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'

  var grids=[
    {id:1, src:src1, title:"新闻资讯",router:{name:'articleSort',}},
    {id:2, src:src2, title:"图文分享",router:{name:'PhotoList',params:{categoryId:0}}},
    {id:3, src:src3, title:"商品展示",router:
        {
          name:'GoodsList',
          params:{
            page:1
          }
        }
    },
    {id:4, src:src4, title:"最新资讯",router:{name:'NewNews',}},
    {id:5, src:src5, title:"留言反馈",router:{name:'LeaveMess',}},
    {id:6, src:src6, title:"联系我们",router:{name:'ContackUs',}},
  ];
  export default {
    name: "Home",
    data() {
      return {
        imgs:[],
        grids:grids,
        title:'首页',
        noIndex:false
      }
    },
    created() {
      this.$axios.get('/banner/list')
        .then(res =>{
          console.log(res.data.data)
          this.imgs=res.data.data;
        })
        .catch(error=>{
          console.log("轮播图数据异常:" + error)
        })
    },
  }
</script>
<style lang="css" scoped>

  .mint-swipe{
    height: 300px;
  }
  .img-lunbo{
    width: 100%;
    height: 100%;
    display: block;
  }

  .list{
    text-align: center;
    padding: 10px 0;
  }
  .list li{
    float: left;
    width: 33.33%;
    padding: 10px 0;
    font-size: 14px;
  }
  .list li a{
    display: inline-block;
    /* width: 5 */
  }
  .list li img{
    width: 40px;
  }
</style>

