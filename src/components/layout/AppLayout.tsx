import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'

export default function AppLayout() {
  return (
    <div className="flex flex-col h-full bg-surface-900">
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
