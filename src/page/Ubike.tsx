import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import Axios from 'axios'
import { QTable, QInput, QIcon } from 'quasar'


export const Ubike = defineComponent({
	setup() {
		const ubikeData = reactive([])
		const loading = ref(true)
		const filterText = ref('')
		const tableColumns = [
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
		]

		// const a = ['aaa', 'bbb', 'ccc']

		onBeforeMount(() => {
			Axios.get(
				'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
				).then((res) => {
					console.log('res =>', res.data)
					ubikeData.push(...res.data)
					console.log('ubikeData =>', ubikeData)
					loading.value = false
				})
		})
		return () => (
			<div class={'full-width'}>
				{/* <div>	sno(站點代號)、sna(中文場站名稱)、tot(場站總停車格)、sbi(可借車位數)、sarea(中文場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(中文地址)、sareaen(英文場站區域)、snaen(英文場站名稱)、aren(英文地址)、bemp(可還空位數)、act(場站是否暫停營運)</div> */}
				{/* {ubikeData[0]?.ar} */}
				<QTable
					title={'UBike 2.0 所有站點'}
					loading={loading.value}
					columns={tableColumns}
					rows={ubikeData}
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
						)
					}}
				>
				</QTable>
				{/* <div>
					outside:
					<div>
						{a[0]}
						{a[1]}
						{a[2]}
					</div>
				</div> */}
			</div>
		)
	}
})