<template>
  <div>

    <topTabbar :title="title"/>

    <div calss="page-loadmore-wrapper" ref="wrapper" :style="{height:wrapperHeight +'px'}" style="overflow: scroll;" >

      <mt-loadmore  :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
        <ul class="goods-ul">
          <li v-for="lists in funList" :key="lists.id">
              <router-link :to='{name:"GoodsDetail",params:{id:lists.id}}' class="box">
              <div class="flex2">
                  <img :src="lists.pic" alt="">
              </div>
              <div class="flex5">
                  <div class="title">{{lists.name}}</div>
                  <div>原价：￥<span class="originalPrice">{{lists.originalPrice}}</span> 
                       现价：￥<span class="price">{{lists.minPrice}}</span></div>
              </div>
          </router-link>
          </li>
        </ul>
      </mt-loadmore>

    </div>
  </div>
</template>
<script>
  /*
  *  mt-loadmore 中的属性
      1、bottomLoad 函数
      2、机制 bottomLoad :buttom-all-loaded 默认为false，此时可以上拉， true禁止上拉
      3、auto-fill 默认为tue，此时自动检测父容器，并且调用 bottomload直到撑满父容器
      4、pull 拉动未满足 70px 、drop未达到70px， loading加载中
      5、loadmore组件对象的 onBottomLoaded() 通知结束loading进入pull状态
      6、在组件上写 ref,在js中 通过this.$refs.xxx 获取组件对象
      通过在普通标签写ref，在js中通过 this.$refs.xxx 获取dom对象
      7、上拉加载更多公式
      进入检测机制： 可视高度 +页面卷起的高度=设备的高度
  * */
    export default {
        name: "goodsList",
        data() {
            return {
              funList:[],
              page:1,
              // page:this.$route.params.page,
              allLoaded:false,
              wrapperHeight:0,
              autoFill:false,
              nickname:'',
               title:"商品列表页"
            }
        },
      methods:{
        // 上拉加载事件
        loadBottom(){
          console.log("上拉调用了");
          // 上拉加载数据
          this.loadGoodsByPage();
          // console.log(this.$refs.loadmore);
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status){
          console.log(status);
        },
        loadTop(){     //下拉刷新事件
          this.page=1;
          this.loadGoodsByPage();
          setTimeout(()=>{
            this.$refs.loadmore.onTopLoaded();
          },500);
        },
        handleTopChange(status){  //下拉刷新的状态
          console.log("下拉:"+status);
          this.topStatus = status; //当前状态
          if(this.topStatus == 'drop'){ //下拉状态
            this.topRefreshVal="松开立即刷新";
          }else if(this.topStatus == 'pull'){ //松开下拉
            this.topRefreshVal="下拉可以刷新";
          }else{
            this.topRefreshVal="正在刷新数据中……";
          }
        },
        loadGoodsByPage(){
          // this.$axios.get('getgoods/?pageindex=${this.page}')
          this.$axios.get('shop/goods/list',{
              // http://mobile.93sucai.com/index/classtype/index.html?ajax=1&page=1&type=1&nickname=
            params:{pageSize:10,page:this.page}
          })
            .then(res =>{
              if(res.data.data.length < 10){
                this.$toast("没有数据");
                // 如果为 true 表示所有的数据都加载完成 禁止上拉
                this.allLoaded=true;
              }
              if(this.page == 1){
                this.funList=res.data.data;
                console.log(this.funList)
              }else {
                this.funList=this.funList.concat(res.data.data);
                console.log(this.funList);
              }
              this.page++;
            })
            .catch(err =>{
              console.log("goodlist"+err);
            })
        }
      },
      created() {
        // 加载第一页的商品列表数据
        this.loadGoodsByPage();
      },
      mounted() {
          this.wrapperHeight = document.documentElement.clientHeight -
            this.$refs.wrapper.getBoundingClientRect().top;
      }

    }
</script>

<style lang="less" scoped>

.page-loadmore-wrapper{
   overflow: scroll;
}

.img{
    display: block;
    width: 100%;
    border-radius: .08rem;
}
.goods-ul{
  padding:2%;
  li{
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: solid 1px #ddd;
      text-align: left;
      
  }
}

.box{
    display: flex;
}
.flex2{
    flex: 2;
    overflow:hidden;
}
.flex2 img{
    display: block;
    width: 100%;
    height: 5.8rem;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}

.flex5{
    flex: 5;
    padding-left: 2%;
    overflow:hidden;
  .title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 0;
        font-size: .16rem;
    }
    .price{
      color:#ffa300;
    }
}
</style>
