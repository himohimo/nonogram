<template>
  <div class="w-full h-full flex flex-col justify-center items-center text-gray-600">
    
    <div class="flex flex-row" v-for="(r, rIdx) in numRows" :key="rIdx">

      <!-- Rules for the rows -->
      <div class="w-24 pr-2 flex justify-end items-center" 
          :class="{ 
            'h-8': rIdx === 0, 
            'mt-24': rIdx === 0, 
            'border-t': hoveredRow === rIdx,
            'border-b': hoveredRow === rIdx,
            'border-l': hoveredRow === rIdx  }">
        <div
          v-for="(rRule, rRuleIdx) in rowRules[rIdx]"
          :key="rRuleIdx"
          class="pr-2">
          {{ rRule }}
        </div>
      </div>

      <div v-for="(c, cIdx) in numCols" :key="cIdx">
        
        <!-- Rules for the columns -->
        <div
          v-if="rIdx === 0"
          class="h-24 flex flex-col justify-end items-center"
          :class="{ 
            'border-t': hoveredCol === cIdx,
            'border-l': hoveredCol === cIdx,
            'border-r': hoveredCol === cIdx }">
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
          @contextmenu.prevent="onMark(rIdx, cIdx, false)"
          @mouseover="onMouseOver(rIdx, cIdx)"
          @mouseleave="onMouseLeave">
          
            <div v-if="boardMarker[`${rIdx}_${cIdx}`] === true" class="bg-red-800 w-5/6 h-5/6 rounded">
              
            </div>
            <div v-else-if="boardMarker[`${rIdx}_${cIdx}`] === false">
              <svg class="text-gray-400 w-4 h-4 font-bold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div> 

          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  props: {
    rules: Object,
    solution: Object
  },
  setup(props) {

    const gbObject = {
      rSize: 10,
      cSize: 10,
      rRules: [
        [0],
        [4],
        [1, 3],
        [6, 1],
        [6, 1],
        [8],
        [8],
        [8],
        [2, 1],
        [2, 2]
      ],
      cRules: [
        [2],
        [4, 1],
        [1, 7],
        [8],
        [7],
        [6],
        [3],
        [3],
        [1, 3, 1],
        [6]
      ],
      solutionSize: 53,
      solution: [
        '3_0',
        '4_0'
      ]
    }

    const numRows = ref(gbObject.rSize);
    const numCols = ref(gbObject.cSize);

    const rowRules = ref(gbObject.rRules);
    const colRules = ref(gbObject.cRules);

    const boardMarker = ref({});

    const onMark = (r, c, marker) => {
      if (boardMarker.value[`${r}_${c}`] === marker) {
        delete boardMarker.value[`${r}_${c}`];
      } else {
        boardMarker.value[`${r}_${c}`] = marker;
      }
    }

    // logic for highlighting row and col
    const hoveredRow = ref(null);
    const hoveredCol = ref(null);

    const onMouseOver = (r, c) => {
      hoveredRow.value = r;
      hoveredCol.value = c;
    }

    const onMouseLeave = () => {
      hoveredRow.value = null;
      hoveredCol.value = null;
    }

    // check if won
    const numMarked = computed(() => {
      if (!boardMarker || !boardMarker.value) { return 0; }

      return Object.entries(boardMarker.value)
        .reduce((acc, [k,v]) => {
          if (v === true) {
            return acc+1;
          } else {
            return acc;
          }
        }, 0);
    });

    watch(numMarked, (newVal, oldVal) => {
      // if (newVal !== gbObject.solutionSize) { return; }
      if (!boardMarker || !boardMarker.value) { return; }

      // compare with solution
      for(const sPosition of gbObject.solution) {
        if (!boardMarker.value[sPosition]) { return; }
      }

      console.log('You won!')
    });

    return {
      numRows, numCols, rowRules, colRules, 
      boardMarker, onMark,
      hoveredRow, hoveredCol, onMouseOver, onMouseLeave
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