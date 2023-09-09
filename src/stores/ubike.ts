import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'
import { uBikes } from '@/model/uBike'

type storeType = {
  uBikes: uBikes[]
  favorites: uBikes[]
}
export const useUbikeStore = defineStore(
  'uBkie', () => {
    const state: storeType = reactive({
      uBikes: [],
      favorites: []
    })

    const getAllUBikeData = () => {
      console.log(import.meta.env.VITE_UBIKE_API)
      axios.get(import.meta.env.VITE_UBIKE_API)
        .then((res) => {
          console.log('all ubike =>', res)
        })
        .catch((error) => {
          console.log('getAllUBikeData error')
        })
    }

    return {
      state,
      getAllUBikeData,
    }
  }, 
  { persist: true }
)