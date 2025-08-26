import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const per_page = parseInt(query.per_page as string) || 5
  const sort_by = (query.sort_by as string) || null
  const sort_order = (query.sort_order as string) || 'asc'
  const cost_from = parseFloat(query.cost_from as string) || 0
  const cost_to = parseFloat(query.cost_to as string) || Infinity
  const area_from = parseFloat(query.area_from as string) || 0
  const area_to = parseFloat(query.area_to as string) || Infinity
  const rooms = query.rooms ? (query.rooms as string).split(',').map(Number) : []

  const filePath = resolve('./data/apartments.json')
  const jsonRaw = await fs.readFile(filePath, 'utf-8')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let apartments = JSON.parse(jsonRaw) as Array<any>

  apartments = apartments.filter(a =>
    a.price >= cost_from
    && a.price <= cost_to
    && a.area >= area_from
    && a.area <= area_to
    && (rooms.length === 0 || rooms.includes(a.rooms)),
  )

  if (sort_by && ['price', 'area', 'rooms'].includes(sort_by)) {
    apartments.sort((a, b) => {
      if (sort_order === 'asc') return a[sort_by] - b[sort_by]
      return b[sort_by] - a[sort_by]
    })
  }

  const total = apartments.length
  const pages_total = Math.ceil(total / per_page)
  const start = (page - 1) * per_page
  const data = apartments.slice(start, start + per_page)

  return {
    pages_total,
    data,
  }
})
