<template>
    <div class="header">
      <h3 @click='goBack' class="back" :noIndex='noIndex'> < </h3>
      <h3 class="title-info">{{title}} </h3>
    </div>
</template>

<script>
  export default {
    name: "topTabbar",
    data() {
      return {
        // noIndex:true,
      }
    },
    props:{
      "title":String,
      "noIndex":Boolean
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="css" scoped>

.header{
  display: flex;
  padding:0 2%;
  height:40px;
  line-height:40px;
  background-color: #26a2ff;
  color:#fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 111;
}
.back{
  flex: 1;
  /*border: solid 1px red;*/
  position: relative;
  z-index: 1111;
}
.title-info{
  flex: 10;
  text-align: center;
  margin-left: -10%;
}
</style>

