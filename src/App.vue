<template>
  <div class="w-screen h-screen container mx-auto">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background: rgb(203,203,203);
  background: radial-gradient(circle, rgba(203,203,203,1) 0%, rgba(66,66,66,1) 100%);
}
</style>
