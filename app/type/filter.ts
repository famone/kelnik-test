export interface IColumn {
  title: string
  key: string
  sortOrder: null | 'desc' | 'asc'
}

export interface IApartment {
  id: number
  price: number
  area: number
  rooms: number
  floor: number
  floors_total: number
}
