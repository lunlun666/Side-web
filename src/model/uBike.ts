/*sno(站點代號)、sna(中文場站名稱)、tot(場站總停車格)、
sbi(可借車位數)、sarea(中文場站區域)、mday(資料更新時間)、
lat(緯度)、lng(經度)、ar(中文地址)、sareaen(英文場站區域)、
snaen(英文場站名稱)、aren(英文地址)、bemp(可還空位數)、act(場站是否暫停營運)</div> */

export type uBike = {
  sno: string, // station number 站點代號
  sna: string, // station name with chinese 站點名稱(中文)
  tot: number, // all of station park grid 站點總停車格
  sbi: number, // can borrow number 可借車位
  sarea: string, // station area with chinese 站點區域(中文)
  mday: Date, // data update time 資料更新時間
  lat: number, // latitude 經度
  lng: number, // longitude 緯度
  ar: string, // station address with chinese 站點地址(中文)
  sareaen: string, // station address with english 站點地址(英文)
  snaen: string, //station area with english 站點區域(英文)
  aren: string, // station address with english 站點地址(英文)
  bemp: number, // can return number 可還車位
  act: string, // station is close? 站點是否暫停營運
  srcUpdateTime: Date,
  updateTime: Date,
  infoTime: Date,
  infoDate: Date
}

export type uBikes = uBike[]