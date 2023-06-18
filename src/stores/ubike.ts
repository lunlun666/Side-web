import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUbikeStore = defineStore(
  'ubkie', () => {

    const state = reactive({
      favorites: []
    })

    return {
      state,
    }
  }, 
  { persist: true }
)