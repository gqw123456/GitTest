<template>
  <div id="app">
    <Header/>
    <Home/>
    <Footer/>
  </div>
</template>

<script>
  
import Header from './Header.vue';
import Footer from './Footer.vue';
import Home from '../pages/Home.vue';

export default {
  name: 'App',
  components: {
    Header,Footer,Home
  }
}
</script>

<style>

</style>
