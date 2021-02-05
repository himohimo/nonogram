<template>
  <div class="w-full h-full flex flex-col justify-center items-center text-gray-600">
    
    <div class="flex flex-row" v-for="(r, rIdx) in numRows" :key="rIdx">

      <!-- Rules for the rows -->
      <div class="w-24 mr-2 flex justify-end items-center" 
          :class="{ 'h-8': rIdx === 0, 'mt-24': rIdx === 0 }">
        <div
          v-for="(rRule, rRuleIdx) in rowRules[rIdx]"
          :key="rRuleIdx"
          class="mr-2">
          {{ rRule }}
        </div>
      </div>

      <div v-for="(c, cIdx) in numCols" :key="cIdx">
        
        <!-- Rules for the columns -->
        <div
          v-if="rIdx === 0"
          class="h-24 flex flex-col justify-end items-center">
          <div 
            v-for="(cRule, cRuleIdx) in colRules[cIdx]"
            :key="cRuleIdx">
            {{ cRule }}
          </div>
        </div>

        <div 
          class="w-8 h-8 border-gray-500 flex justify-center items-center select-none cursor-pointer"
          :class="{
            'border-t-2': rIdx == 0,
            'border-r-2': cIdx < numCols,
            'border-b-2': rIdx < numRows,
            'border-l-2': cIdx == 0,
            'special-bg-1': (rIdx + cIdx) % 2 === 0,
            'special-bg-2': (rIdx + cIdx) % 2 !== 0
          }"
          @click="onMark(rIdx, cIdx, true)"
          @contextmenu.prevent="onMark(rIdx, cIdx, false)">
          
            <div v-if="boardMarker[`${rIdx}_${cIdx}`] === true">
              o
            </div>
            <div v-else-if="boardMarker[`${rIdx}_${cIdx}`] === false">
              x
            </div> 

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const numRows = ref(8);
    const numCols = ref(8);

    const rowRules = [
      [4],
      [3, 2],
      [6],
      [3],
      [6, 1],
      [1, 6],
      [6],
      [2, 3]
    ]

    const colRules = [
      [2, 2],
      [2, 1, 1],
      [8],
      [1, 5],
      [8],
      [3, 4],
      [3],
      [3],
    ]

    const boardMarker = ref({});

    const onMark = (r, c, marker) => {
      if (boardMarker.value[`${r}_${c}`] === marker) {
        delete boardMarker.value[`${r}_${c}`];
      } else {
        boardMarker.value[`${r}_${c}`] = marker;
      }
    }

    return {
      numRows, numCols, rowRules, colRules, 
      boardMarker, onMark
    }
  }
}
</script>

<style lang="scss" scoped>
  .special-bg-1 {
    background-color: #dedede;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23ffffff' fill-opacity='0.3' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
  }

  .special-bg-2 {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23dddddd' fill-opacity='0.3' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");
  }
</style>