<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div v-for="(r, rIdx) in numRows" :key="rIdx" class="flex flex-row">
      <div v-for="(c, cIdx) in numCols" :key="cIdx">
        <div 
          class="w-8 h-8 border-gray-200"
          :class="{
            'border-t-2': rIdx == 0,
            'border-r-2': cIdx < numCols,
            'border-b-2': rIdx < numRows,
            'border-l-2': cIdx == 0,
          }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const numRows = ref(5);
    const numCols = ref(5);

    return { numRows, numCols }
  }
}
</script>

<style>

</style>