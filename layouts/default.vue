<template>
  <div>
    <!-- 头部组件 -->
    <Header />
    
    <nuxt />

    <!-- 尾部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header"
import Footer from '@/components/footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>


<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

ol,ul,li {
  list-style: none
}

a {
  text-decoration: none;
  color: inherit
}

i,em {
  font-style: normal
}
</style>
