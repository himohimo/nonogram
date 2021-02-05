<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="flex flex-row" v-for="(r, rIdx) in numRows" :key="rIdx">
      <div class="w-24 mr-2 flex justify-end items-center">
        <div class="mr-2" v-for="(rRule, rRuleIdx) in rowRules[rIdx]" :key="rRuleIdx">
          {{ rRule }}
        </div>
      </div>

      <div v-for="(c, cIdx) in numCols" :key="cIdx">
        <div 
          class="w-8 h-8 border-gray-200 flex justify-center items-center select-none cursor-pointer"
          :class="{
            'border-t-2': rIdx == 0,
            'border-r-2': cIdx < numCols,
            'border-b-2': rIdx < numRows,
            'border-l-2': cIdx == 0,
          }"
          @click="onMark(r, c, true)"
          @contextmenu.prevent="onMark(r, c, false)">
          
            <div v-if="boardMarker[`${r}_${c}`] === true">
              o
            </div>
            <div v-else-if="boardMarker[`${r}_${c}`] === false">
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