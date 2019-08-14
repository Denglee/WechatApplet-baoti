<template>
    <div>
        <topTabbar :title="title"/>
        <ul class="rank-list">
          <li v-for="(rankList,index) in rankList" :key="rankList.type" @click="rankHandler(rankList.id,index)"  :class="{active:index==currentIndex}">
              {{ rankList.name }}
          </li>
        </ul>

      <!--图片展示区域-->
      <div class="photo-list">
        <ul>
          <li v-for="(item,index) in mainList" :key="item.id">
            <router-link :to="{name:'articleDetails',params:{sid:item.id}}" class="box">
              <div class="left">
                <img :src="item.pic" alt="">
              </div>
              <div class="right">
                <h4> {{item.title}}</h4>
                <div>作者:{{item.author}}, 分类：{{item.keywords}}</div>
                <div>更新时间：{{item.dateAdd}}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
        name: "articleSort",
        data() {
            return {
              title:"新闻分类",
              rankList:[],
              mainList:[],
              currentIndex:0,
              id:2,
              categoryId:0,
            }
        },
      methods:{
        rankHandler(categoryId,index){
          this.currentIndex=index;
          this.getMain(categoryId);
          // 获去具体信息
        },
        getMain(categoryId){
          this.$axios.get('/cms/news/list/',{
            params:{
              categoryId:categoryId,
              pageSize:10,
              page:1
            }
          })
            .then(res => {
              this.mainList=res.data.data;
              console.log(res.data);
            })
            .catch(err =>{
              console.log('排序出错'+err)
            })
        }
      },

      created() {
         // 获取分类信息
         this.$axios.get("cms/category/list")
          .then(res => {
            this.rankList=res.data.data;
            this.categoryId=res.data.data[0].id;
            this.getMain(this.categoryId);
          })
          .catch(err =>{
            console.log('内容'+err)
          });
      }
    }
</script>
<style scoped lang="less">
  .rank-list{
    background-color: #ccc;
    display:flex;
          position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    z-index: 111;
    li{
      flex:1;
      line-height: 2;
      font-size: 16px;
        text-align: center;
      padding: 2%;
    }

    .active{
      color: red;
      background-color:#ffa300;
    }

  }


  .tip{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: solid 1px red;
    display: inline-block;
    font-weight: bold;
    margin-right: 5px;
    text-align: center;
  }
  .box{
    display: flex;
    margin-top: 4%;
    border-bottom: solid 1px #ddd;
    padding: 2%;
  }
  .left{
    flex: 1;
  }
  .left img{
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  .right{
    flex: 5;
    padding-left: 3%;
    font-size: 16px;
    text-align:left;
    overflow:hidden;
    h4{
      overflow: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
  .photo-list{
    margin-top:50px;
  }
</style>
