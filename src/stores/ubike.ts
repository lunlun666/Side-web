import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUbikeStore = defineStore(
  'ubkie', () => {

    const state = reactive({
      favorite: []
    })

    return {
      state,
    }
  }, 
  { persist: true }
)