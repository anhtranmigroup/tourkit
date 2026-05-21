import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  ShoppingBag, 
  Users, 
  Handshake, 
  Wallet, 
  Settings, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, Tour, Order, Business, Customer } from './types';
import { mockTours, mockOrders, mockBusinesses, mockCustomers } from './data/mockData';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, trend, color }: { label: string, value: string, icon: any, trend?: string, color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
  </div>
);

// --- Views ---

const AdminDashboard = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tổng quan hoạt động</h1>
        <p className="text-slate-500">Chào mừng trở lại, Admin. Đây là tình hình kinh doanh hôm nay.</p>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Xuất báo cáo</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Tạo Tour mới</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Doanh thu tháng" value="$12,450" icon={DollarSign} trend="+12.5%" color="blue" />
      <StatCard label="Đơn đặt chỗ" value="156" icon={ShoppingBag} trend="+8.2%" color="emerald" />
      <StatCard label="Tour đang chạy" value="42" icon={Map} color="violet" />
      <StatCard label="Đối tác mới" value="12" icon={Handshake} trend="+3" color="amber" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
        <h3 className="text-lg font-bold mb-6">Đơn hàng gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase tracking-wider border-b border-slate-50">
                <th className="pb-4 font-semibold">Mã đơn</th>
                <th className="pb-4 font-semibold">Khách hàng</th>
                <th className="pb-4 font-semibold">Tour</th>
                <th className="pb-4 font-semibold">Giá trị</th>
                <th className="pb-4 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-sm font-mono text-slate-500">{order.id}</td>
                  <td className="py-4">
                    <div className="text-sm font-medium">{order.customerName}</div>
                    <div className="text-xs text-slate-400">{order.customerEmail}</div>
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {mockTours.find(t => t.id === order.tourId)?.title}
                  </td>
                  <td className="py-4 text-sm font-bold">${order.totalAmount}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow">
        <h3 className="text-lg font-bold mb-6">Top Sellers</h3>
        <div className="space-y-6">
          {mockBusinesses.filter(b => b.type === 'SELLER').map((seller, i) => (
            <div key={seller.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-bold">{seller.name}</div>
                  <div className="text-xs text-slate-400">12 đơn hàng</div>
                </div>
              </div>
              <div className="text-sm font-bold text-emerald-600">+$2,400</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TourManagement = ({ role }: { role: Role }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Quản lý sản phẩm tour</h1>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
        <Plus size={18} /> Tạo Tour
      </button>
    </div>

    <div className="flex gap-4 bg-white p-4 rounded-xl border border-slate-100 card-shadow">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Tìm kiếm tour..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
        <Filter size={18} /> Lọc
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {mockTours.map(tour => (
        <div key={tour.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-shadow group">
          <div className="relative h-48 overflow-hidden">
            <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 right-4 flex gap-2">
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase backdrop-blur-md ${
                tour.isInMarketplace ? 'bg-emerald-500/80 text-white' : 'bg-slate-500/80 text-white'
              }`}>
                {tour.isInMarketplace ? 'Marketplace' : 'Draft'}
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex gap-2 mb-3">
              {tour.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
              ))}
            </div>
            <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{tour.title}</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400">Giá từ</p>
                <p className="text-lg font-bold text-blue-600">${tour.price.adult}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Marketplace = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <p className="text-slate-500 text-sm">Chọn tour để phân phối và nhận hoa hồng.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTours.filter(t => t.isInMarketplace).map(tour => (
        <div key={tour.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-shadow">
          <img src={tour.images[0]} alt={tour.title} className="w-full h-48 object-cover" />
          <div className="p-5">
            <h3 className="font-bold mb-2">{tour.title}</h3>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <span className="text-slate-400">Hoa hồng: </span>
                <span className="font-bold text-emerald-600">{(tour.commissionRate || 0.1) * 100}%</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">Giá: </span>
                <span className="font-bold">${tour.price.adult}</span>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
              Chọn phân phối
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PublicWeb = () => (
  <div className="min-h-screen bg-white">
    {/* Hero */}
    <div className="relative h-[60vh] flex items-center justify-center text-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://picsum.photos/seed/travel/1920/1080" className="w-full h-full object-cover brightness-50" />
      </div>
      <div className="relative z-10 max-w-3xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Khám phá thế giới cùng TourPlatform
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
            <Map className="text-blue-600" size={20} />
            <input type="text" placeholder="Bạn muốn đi đâu?" className="w-full focus:outline-none font-medium" />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Clock className="text-blue-600" size={20} />
            <input type="text" placeholder="Khi nào?" className="w-full focus:outline-none font-medium" />
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Tìm kiếm
          </button>
        </motion.div>
      </div>
    </div>

    {/* Featured Tours */}
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Tour nổi bật</h2>
          <p className="text-slate-500">Những trải nghiệm tuyệt vời nhất đang chờ đón bạn.</p>
        </div>
        <button className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
          Xem tất cả <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockTours.map(tour => (
          <div key={tour.id} className="group cursor-pointer">
            <div className="relative h-72 rounded-3xl overflow-hidden mb-4">
              <img src={tour.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">{tour.tags[0]}</span>
                  <span className="font-bold text-slate-900">${tour.price.adult}</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{tour.title}</h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-2">{tour.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [role, setRole] = useState<Role>('ADMIN');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = useMemo(() => {
    switch(role) {
      case 'ADMIN':
        return [
          { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
          { id: 'tours', label: 'Sản phẩm Tour', icon: Map },
          { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
          { id: 'customers', label: 'Khách hàng', icon: Users },
          { id: 'partners', label: 'Đối tác', icon: Handshake },
          { id: 'finance', label: 'Tài chính', icon: Wallet },
          { id: 'settings', label: 'Cấu hình', icon: Settings },
        ];
      case 'SUPPLIER':
        return [
          { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
          { id: 'tours', label: 'Tour của tôi', icon: Map },
          { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
          { id: 'sellers', label: 'Đại lý', icon: Handshake },
          { id: 'withdrawals', label: 'Rút tiền', icon: Wallet },
        ];
      case 'SELLER':
        return [
          { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
          { id: 'marketplace', label: 'Marketplace', icon: Globe },
          { id: 'my-tours', label: 'Tour đã chọn', icon: Map },
          { id: 'orders', label: 'Đơn của tôi', icon: ShoppingBag },
          { id: 'commissions', label: 'Hoa hồng', icon: Wallet },
          { id: 'site-config', label: 'Website riêng', icon: Settings },
        ];
      default:
        return [];
    }
  }, [role]);

  const renderContent = () => {
    if (role === 'PUBLIC') return <PublicWeb />;

    switch(activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'tours': return <TourManagement role={role} />;
      case 'marketplace': return <Marketplace />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
          <AlertCircle size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-medium">Module "{activeTab}" đang được phát triển</p>
        </div>
      );
    }
  };

  if (role === 'PUBLIC') {
    return (
      <div className="relative">
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass px-6 py-3 rounded-2xl flex gap-4 shadow-2xl">
          <button onClick={() => setRole('ADMIN')} className="text-xs font-bold uppercase hover:text-blue-600 transition-colors">Admin</button>
          <button onClick={() => setRole('SUPPLIER')} className="text-xs font-bold uppercase hover:text-blue-600 transition-colors">Supplier</button>
          <button onClick={() => setRole('SELLER')} className="text-xs font-bold uppercase hover:text-blue-600 transition-colors">Seller</button>
          <button onClick={() => setRole('PUBLIC')} className="text-xs font-bold uppercase text-blue-600">Web</button>
        </div>
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-slate-100 overflow-hidden flex flex-col sticky top-0 h-screen"
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
              <Globe size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">TourPlatform</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-50">
          <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {role[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{role === 'ADMIN' ? 'Hệ thống Admin' : 'Đối tác Tour'}</p>
              <p className="text-xs text-slate-400 truncate">{role.toLowerCase()}@platform.com</p>
            </div>
          </div>
          <button 
            onClick={() => setRole('PUBLIC')}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-6">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
              <button 
                onClick={() => setRole('ADMIN')} 
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${role === 'ADMIN' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Admin
              </button>
              <button 
                onClick={() => setRole('SUPPLIER')} 
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${role === 'SUPPLIER' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Supplier
              </button>
              <button 
                onClick={() => setRole('SELLER')} 
                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${role === 'SELLER' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Seller
              </button>
            </div>
            <div className="w-px h-6 bg-slate-200" />
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Users size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
