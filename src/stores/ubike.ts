import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useFetch } from '@vueuse/core'
import axios from 'axios'
import { uBikes } from '@/model/uBike'

type storeType = {
  uBikes: uBikes[]
  favorites: uBikes[]
  loading: {
    fetchAllUBikeData: boolean
  }
}
export const useUbikeStore = defineStore(
  'uBkie', () => {
    const state: storeType = reactive({
      uBikes: [],
      favorites: [],
      loading: {
        fetchAllUBikeData: false,
      }
    })

    const getAllUBikeData = () => {
      console.log(import.meta.env.VITE_UBIKE_API)
      axios.get(import.meta.env.VITE_UBIKE_API)
        .then((res) => {
          console.log('all ubike =>', res)
          state.uBikes = res.data
        })
        .catch((error) => {
          console.log('getAllUBikeData error')
        })
    }

    const fetchAllUBikeData = () => {
      console.log('fetchAllUBikeData =>', import.meta.env.VITE_UBIKE_API)

      const { onFetchResponse, onFetchError, isFetching, data } = useFetch(import.meta.env.VITE_UBIKE_API)

      onFetchResponse(() => {
        console.log('response =>', data)
      })
      
      onFetchError((e) => {
        console.log('error =>', e)
      })
      state.loading.fetchAllUBikeData = isFetching as any as boolean

      // axios.get(import.meta.env.VITE_UBIKE_API)
      //   .then((res) => {
      //     console.log('all ubike =>', res)
      //     state.uBikes = res.data
      //   })
      //   .catch((error) => {
      //     console.log('getAllUBikeData error')
      //   })
    }

    return {
      state,
      getAllUBikeData,
      fetchAllUBikeData,
    }
  },
  { persist: true }
)