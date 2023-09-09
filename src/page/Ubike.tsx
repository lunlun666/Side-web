import { defineComponent, onBeforeMount, onMounted, reactive, ref, computed } from 'vue'
import Axios from 'axios'
import { QTable, QInput, QIcon, QBtn, QTd } from 'quasar'
import { useUbikeStore } from '../stores/ubike'
import { totalColumns, favoriteColumns } from '../data/tableColumns'
import { differenceWith, isEqual } from 'lodash'
import { Loader } from '@googlemaps/js-api-loader'


export const Ubike = defineComponent({
	setup() {
		const originDatas = reactive([])
		const allDatas = reactive([])
		const favoriteDatas = ref([])
		const loading = ref(true)
		const filterText = ref('')
		const ubikeStore = useUbikeStore()

		const locatArray = reactive([
			{
				lat: 25.045978,
				lng: 121.514501,

			},
			{
				lat: 25.045978,
				lng: 121.516501,
			},
			// {
			// 	lat: 25.045978,
			// 	lng: 121.514501,
			// },

		])

		const addFavoriteData = () => {
			const favvoriteData = ubikeStore.state.favorites.reduce((accumulator: any, fovorite: String) => {
				accumulator.push(originDatas.find((data: Record<string, unknown>) => data.sna === fovorite))
				return accumulator
			}, [])
			console.log(favvoriteData)

			return favvoriteData					
		}

		const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
        version: "weekly",
        libraries: ["places"],
        // language: "zh-TW",
      })
			
			const mapOptions = {
				center: {
					lat: favoriteDatas.value[0]?.lat ?? 25.045978,
					lng: favoriteDatas.value[0]?.lng ?? 121.514501,
				},
				zoom: 16,
			}

			const {Map} = await loader.importLibrary('maps')
			const {Marker} = await loader.importLibrary('marker')

			const map = new Map(document.getElementById('map'), mapOptions)

			favoriteDatas.value.forEach((item) => {
				new Marker({
					position: {
						lat: item.lat,
						lng: item.lng,
					},
					map,
					label: `${item.ar}`
				})
			})
			// new Marker({
			// 	position: locatArray[0],
			// 	map,
			// 	label: `${locatArray[0].lat} / ${locatArray[0].lng}`
			// })
    }

		onBeforeMount(() => {
			Axios.get(
				'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
				).then(async(res) => {
					// console.log('res =>', res.data)
					originDatas.push(...res.data)
					// allDatas.push(...res.data)
					// console.log('ubikeData =>', originDatas)
					if(ubikeStore.state.favorites.length > 0) {
						favoriteDatas.value = addFavoriteData()
						allDatas.push(...differenceWith(originDatas, favoriteDatas.value, isEqual))
						// console.log('allDatas ', allDatas)
					} else {
						allDatas.push(...res.data)
					}
					console.log('init map', JSON.stringify(favoriteDatas.value[0], null, 2))
					console.log('favoriteDatas.value => ', favoriteDatas.value)
					await initMap()
					loading.value = false
				})
		})

		onMounted(async () => {
			// console.log('onMountedonMountedonMountedonMountedonMountedonMounted')
		})

		return () => (
			<div>
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
								<QTd>
									<QBtn
										class='q-mr-md'
										round
										icon='add_location_alt'
										onClick={
											() => {
												console.log('props =>', props)
												ubikeStore.state.favorites.push(props.row.sna)
												favoriteDatas.value.push(props.row)
												allDatas.splice(props.rowIndex, 1)
												console.log('ubikeStore.state.favorites =>', ubikeStore.state.favorites)
											}
										}
									/>
								</QTd>
							)
						}}
					>
					</QTable>
				</div>
				<div class='q-mb-md'>
					{!loading.value && (
							<QTable
							title={'Favorite'}
							loading={loading.value}
							columns={favoriteColumns}
							rows={favoriteDatas.value}
							row-key={'name'}
							v-slots={{
								'body-cell-remove': (props) => (
									<QTd>
										<QBtn
											class='q-mr-md'
											round
											icon='location_off'
											onClick={
												() => {
													console.log('props =>', props.rowIndex)
													favoriteDatas.value.splice(props.rowIndex, 1)
													ubikeStore.state.favorites.splice(props.rowIndex, 1)
													Object.assign(allDatas, differenceWith(originDatas, favoriteDatas.value, isEqual))
												}
											}
										/>
									</QTd>
								)
							}}
						>
						</QTable>
					)}
				</div>
				<div>
					{
						locatArray.map((item) => (
							<div>
								{item.lat} / {item.lng}
							</div>
						))
					}
				</div>
				<div id="map" style='width: 200p; height: 400px;'/>
				<div>
				</div>
			</div>
		)
	}
})