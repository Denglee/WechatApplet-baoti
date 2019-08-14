<template>
  <div>
    <topTabbar :title="title"/>
    <div class="article-details">
        <h4>{{details.title}}</h4>
        <div class="zuthor">
          作者：{{details.author}}
          时间：{{details.dateAdd}}
        </div>
        <div class='comtent'>
          <img class="details-img" :src="details.pic">
          <div v-html="details.content"></div>
        </div>

         <router-link :to='{name:"articleDetails",params:{sid:nextArticleInfo.id}}' @click.native="flushCom" class="box">
           下一篇：{{nextArticleInfo.title}}
         </router-link>

    </div>

    <goTop/>
   </div>
</template>

<script>
  export default {
    name: "articleDetails",
    data() {
      return {
        details:{},
        title:'新闻详情',
        noIndex:true,
        id:'',
        nextArticleInfo:[],
      }
    },

    methods:{
      flushCom:function(){
          location.reload();
　　　},
      getNextArticle(nowId){
        this.$axios.get('/cms/news/preNext',{
          params:{id: nowId}
        })
        .then(res =>{
          console.log(res.data.data.pre);
          this.nextArticleInfo=res.data.data.pre;
        })
        .catch(error=>{
          console.log("新闻详情数据异常:" + error)
        })
      },

      getArticle(nowId){
        this.$axios.get('/cms/news/detail',{
          params:{id: nowId}
        })
        .then(res =>{
          this.details=res.data.data;
        })
        .catch(error=>{
          console.log("新闻详情数据异常:" + error)
        })
      },
    },
   created() {
      // var nowId=this.$route.params.sid;
      this.getArticle(this.$route.params.sid);

      this.getNextArticle(this.$route.params.sid);
    },
  }
</script>
<style lang="less" scoped>

.article-details{
  padding:2%;
  background-color:#fff;
  width:100%;
  h4{
    font-size:16px;
  }

  .comtent{
    text-align:left;
    font-size:14px;
  }
 .details-img{
    margin-top:10px;
    display: block;
    max-width: 100%;
  }
}
</style>

