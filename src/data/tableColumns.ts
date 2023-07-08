const totalColumns = [
  {
    name: 'location',
    label: '站點',
    field: row => row.sna.split('YouBike2.0_')[1],
  },
  {
    name: 'total',
    label: '總車輛',
    field: row => row.tot,
  },
  {
    name: 'borrowNumber',
    label: '可借數量', field:
    row => row.sbi,
  },
  {
    name: 'parkNumber',
    label: '可停數量',
    field: row => row.tot - row.sbi,
  },
  {
    name: 'add'
  }
]

const favoriteColumns = [
  {
    name: 'location',
    label: '站點',
    field: row => row.sna.split('YouBike2.0_')[1],
  },
  {
    name: 'total',
    label: '總車輛',
    field: row => row.tot,
  },
  {
    name: 'borrowNumber',
    label: '可借數量',
    field: row => row.sbi,
  },
  {
    name: 'parkNumber',
    label: '可停數量',
    field: row => row.tot - row.sbi,
  },
  {
    name: 'remove'
  }
]

export {totalColumns, favoriteColumns}