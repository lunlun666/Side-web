import { defineComponent, onBeforeMount, reactive, ref, computed } from 'vue'
import Axios from 'axios'
import { QTable, QInput, QIcon, QBtn } from 'quasar'
import { useUbikeStore } from '../stores/ubike'
import { differenceWith, isEqual } from 'lodash'


export const Ubike = defineComponent({
	setup() {
		const originDatas = reactive([])
		const allDatas = reactive([])
		const favoriteDatas = ref([])
		const loading = ref(true)
		const filterText = ref('')
		const ubikeStore = useUbikeStore()
		const totalColumns = [
			{
				name: 'location', label: '站點', field: row => row.sna.split('YouBike2.0_')[1],
			},
			{
				name: 'total', label: '總車輛', field: row => row.tot,
			},
			{
				name: 'borrowNumber', label: '可借數量', field: row => row.sbi,
			},
			{
				name: 'parkNumber', label: '可停數量', field: row => row.tot - row.sbi,
			},
			{
				name: 'add'
			}
		]
		const favoriteColumns = [
			{
				name: 'location', label: '站點', field: row => row.sna.split('YouBike2.0_')[1],
			},
			{
				name: 'total', label: '總車輛', field: row => row.tot,
			},
			{
				name: 'borrowNumber', label: '可借數量', field: row => row.sbi,
			},
			{
				name: 'parkNumber', label: '可停數量', field: row => row.tot - row.sbi,
			},
			{
				name: 'remove'
			}
		]

		const addFavoriteData = () => {
			const favvoriteData = ubikeStore.state.favorites.reduce((accumulator: any, fovorite: String) => {
				accumulator.push(originDatas.find((data: Record<string, unknown>) => data.sna === fovorite))
				return accumulator
			}, [])
			console.log(favvoriteData)

			return favvoriteData					
		}

		onBeforeMount(() => {
			Axios.get(
				'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
				).then((res) => {
					// console.log('res =>', res.data)
					originDatas.push(...res.data)
					// allDatas.push(...res.data)
					console.log('ubikeData =>', originDatas)
					if(ubikeStore.state.favorites.length > 0) {
						favoriteDatas.value = addFavoriteData()
						allDatas.push(...differenceWith(originDatas, favoriteDatas.value, isEqual))
						console.log('allDatas ', allDatas)
					} else {
						allDatas.push(...res.data)
					}
					loading.value = false
				})
		})

		return () => (
			<div class={'full-width'}>
				{/* <div>	sno(站點代號)、sna(中文場站名稱)、tot(場站總停車格)、sbi(可借車位數)、sarea(中文場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(中文地址)、sareaen(英文場站區域)、snaen(英文場站名稱)、aren(英文地址)、bemp(可還空位數)、act(場站是否暫停營運)</div> */}
				{/* {ubikeData[0]?.ar} */}
				<div class='q-mb-md'>
					<QTable
						title={'UBike 2.0 所有站點'}
						loading={loading.value}
						columns={totalColumns}
						rows={allDatas}
						row-key={'name'}
						filter={filterText.value}
						v-slots={{
							'top-right':() => (
								<QInput
									outlined 
									v-model={filterText.value}
									v-slots={{
										'append': () => (
											<QIcon name={'search'}/>
										)
									}}
								>
								</QInput>
							),
							'body-cell-add': (props) => (
								<QBtn
									class='q-mr-md'
									label='add to favorite'
									onClick={
										() => {
											console.log('props =>', props)
											ubikeStore.state.favorites.push(props.row.sna)
											favoriteDatas.value.push(props.row)
											allDatas.splice(props.rowIndex, 1)
											console.log('ubikeStore.state.favorites =>', ubikeStore.state.favorites)
										}
									}
								>
								</QBtn>
							)
						}}
					>
					</QTable>
				</div>
				<div>
					{!loading.value && (
							<QTable
							title={'Favorite'}
							loading={loading.value}
							columns={favoriteColumns}
							rows={favoriteDatas.value}
							row-key={'name'}
							v-slots={{
								'body-cell-remove': (props) => (
									<QBtn
										class='q-mr-md'
										label='delet to favorite'
										onClick={
											() => {
												console.log('props =>', props.rowIndex)
												favoriteDatas.value.splice(props.rowIndex, 1)
												ubikeStore.state.favorites.splice(props.rowIndex, 1)
												Object.assign(allDatas, differenceWith(originDatas, favoriteDatas.value, isEqual))
											}
										}
									>
									</QBtn>
								)
							}}
						>
						</QTable>
					)}
				</div>
			</div>
		)
	}
})