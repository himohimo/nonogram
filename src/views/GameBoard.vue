<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    
    <div class="flex flex-row" v-for="(r, rIdx) in numRows" :key="rIdx">
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
          class="w-8 h-8 border-gray-200 flex justify-center items-center select-none cursor-pointer"
          :class="{
            'border-t-2': rIdx == 0,
            'border-r-2': cIdx < numCols,
            'border-b-2': rIdx < numRows,
            'border-l-2': cIdx == 0,
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

<style>

</style>