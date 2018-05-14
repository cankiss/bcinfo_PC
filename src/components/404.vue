<template>
  <div id="tencent-404"></div>
</template>
<script>
export default {
  created(){
    this.$nextTick(()=>{
      let _script = document.createElement('script')
      _script.setAttribute('src','//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js')
      _script.setAttribute('homePageUrl',location.origin)
      _script.setAttribute('homePageName','返回到主页')
      document.getElementById('tencent-404').appendChild(_script)
    })
  }
}
</script>

<style>
</style>
