<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  /* for Message when success*/
  .el-message--success{
    background: linear-gradient(left, #435ef2, #061d9a);
    border-color: transparent;
    color: #fff;
  }

  .el-message--success .el-message__content {
    color: #fff;
  }

  .el-message {
    top:80px;
  }
</style>
