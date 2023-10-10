import { defineComponent } from 'vue'
import { useUbikeStore } from '@/stores/ubike'

export const Ubike2 = defineComponent({
	setup() {
		const ubikeStore = useUbikeStore()
		ubikeStore.fetchAllUBikeData()

		return () => (
      <>
			test
      </>
		)
	}
})