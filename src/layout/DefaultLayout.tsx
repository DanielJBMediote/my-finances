import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  )
}
