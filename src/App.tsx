import { useState, useEffect } from 'react';
import { 
  Shield, LayoutDashboard, Briefcase, GraduationCap, 
  Cpu, Eye, Lock, Target, BookOpen, Users, FileText,
  Menu, ChevronLeft, CheckCircle,
  AlertTriangle,
  Code, Terminal, Search, Bell,
  LogOut, Activity, Award,
  ShieldCheck,
  FileCheck, LockKeyhole,
  Bug, Scan,
  FileSearch, Brain,
  Puzzle, Wrench, BookMarked,
  Scale, Gavel, BadgeCheck,
  BarChart3,
  Globe2, AlertOctagon, History,
  Lightbulb, Crosshair, Radar,
  Unlock,
  Receipt, Ticket, UserCircle,
  FileStack,
  AlertCircle, Loader2, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// ==================== TYPES ====================
interface NavItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface NavSection {
  id: string;
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

// ==================== LOADING COMPONENTS ====================
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="w-14 h-14 bg-gray-200 rounded-xl" />
      <div className="w-16 h-6 bg-gray-200 rounded-full" />
    </div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-full mb-4" />
    <div className="flex gap-2">
      <div className="h-8 bg-gray-200 rounded-full w-20" />
      <div className="h-8 bg-gray-200 rounded-full w-24" />
    </div>
  </div>
);

// ==================== NAVIGATION DATA ====================
const navigationSections: NavSection[] = [
  {
    id: 'dashboard',
    title: 'القيادة والتحكم',
    icon: LayoutDashboard,
    items: [
      { id: 'overview', title: 'نظرة عامة', icon: Activity },
      { id: 'stats', title: 'إحصائيات النظام', icon: BarChart3 },
      { id: 'vision2030', title: 'رؤية 2030', icon: Target },
      { id: 'status', title: 'حالة المنصة', icon: CheckCircle },
    ]
  },
  {
    id: 'services',
    title: 'الخدمات الإلكترونية',
    icon: Briefcase,
    items: [
      { id: 'pentest', title: 'اختبار الاختراق', icon: Bug },
      { id: 'forensics', title: 'التحقيق الرقمي', icon: Search },
      { id: 'recovery', title: 'استرداد الحسابات', icon: Unlock },
      { id: 'audit', title: 'التدقيق الأمني', icon: FileCheck },
    ]
  },
  {
    id: 'academy',
    title: 'الأكاديمية الرقمية',
    icon: GraduationCap,
    items: [
      { id: 'courses', title: 'الدورات التدريبية', icon: BookOpen },
      { id: 'awareness', title: 'التوعية السيبرانية', icon: Lightbulb },
      { id: 'termux', title: 'مختبر Termux', icon: Terminal },
      { id: 'certifications', title: 'الشهادات', icon: Award },
    ]
  },
  {
    id: 'arsenal',
    title: 'الترسانة التقنية',
    icon: Cpu,
    items: [
      { id: 'aikeyboard', title: 'مشروع لوحة المفاتيح AI', icon: Brain },
      { id: 'tools', title: 'الأدوات المخصصة', icon: Wrench },
      { id: 'scripts', title: 'السكربتات', icon: Code },
      { id: 'projects', title: 'المشاريع', icon: Puzzle },
    ]
  },
  {
    id: 'intelligence',
    title: 'مركز الاستخبارات',
    icon: Eye,
    items: [
      { id: 'osint', title: 'OSINT', icon: Search },
      { id: 'threats', title: 'رصد التهديدات', icon: Radar },
      { id: 'leaks', title: 'كشف التسريبات', icon: AlertOctagon },
      { id: 'monitor', title: 'المراقبة', icon: Activity },
    ]
  },
  {
    id: 'blueteam',
    title: 'الدفاع السيبراني',
    icon: Shield,
    items: [
      { id: 'hardening', title: 'تصليد الأنظمة', icon: Lock },
      { id: 'incident', title: 'الاستجابة للحوادث', icon: AlertTriangle },
      { id: 'compliance', title: 'الامتثال', icon: FileCheck },
      { id: 'defense', title: 'استراتيجيات الدفاع', icon: ShieldCheck },
    ]
  },
  {
    id: 'redteam',
    title: 'الهجوم الأخلاقي',
    icon: Target,
    items: [
      { id: 'recon', title: 'جمع المعلومات', icon: Globe2 },
      { id: 'scanning', title: 'فحص الثغرات', icon: Scan },
      { id: 'exploitation', title: 'الاستغلال', icon: Crosshair },
      { id: 'reporting', title: 'كتابة التقارير', icon: FileText },
    ]
  },
  {
    id: 'library',
    title: 'المكتبة والمعرفة',
    icon: BookOpen,
    items: [
      { id: 'ebooks', title: 'الكتب الإلكترونية', icon: BookMarked },
      { id: 'references', title: 'المراجع', icon: FileStack },
      { id: 'laws', title: 'القوانين', icon: Scale },
      { id: 'research', title: 'الأبحاث', icon: FileSearch },
    ]
  },
  {
    id: 'clients',
    title: 'بوابة العملاء',
    icon: Users,
    items: [
      { id: 'login', title: 'تسجيل الدخول', icon: LogOut },
      { id: 'tickets', title: 'نظام التذاكر', icon: Ticket },
      { id: 'invoices', title: 'الفواتير', icon: Receipt },
      { id: 'profile', title: 'الملف الشخصي', icon: UserCircle },
    ]
  },
  {
    id: 'regulations',
    title: 'التنظيم والقانون',
    icon: FileText,
    items: [
      { id: 'privacy', title: 'سياسة الخصوصية', icon: LockKeyhole },
      { id: 'disclaimer', title: 'إخلاء المسؤولية', icon: AlertCircle },
      { id: 'cyberlaws', title: 'قوانين الأمن السيبراني', icon: Gavel },
      { id: 'ethics', title: 'مدونة الأخلاق', icon: BadgeCheck },
    ]
  },
];

// ==================== DATA ====================
const platformStats = [
  { label: 'العملاء النشطون', value: 1247, suffix: '+', icon: Users },
  { label: 'العمليات المنفذة', value: 3589, suffix: '', icon: CheckCircle },
  { label: 'التهديدات المحجوبة', value: 15642, suffix: '', icon: Shield },
  { label: 'نسبة الأمان', value: 99.9, suffix: '%', icon: Lock },
];

const servicesData = [
  {
    title: 'اختبار الاختراق',
    description: 'فحص شامل للأنظمة والشبكات لاكتشاف الثغرات الأمنية قبل المهاجمين',
    icon: Bug,
    features: ['فحص الويب', 'فحص الشبكات', 'فحص تطبيقات الجوال', 'تقارير مفصلة'],
    status: 'متاح',
    price: 'يبدأ من 2,500 ريال',
  },
  {
    title: 'التحقيق الرقمي',
    description: 'تحليل الأدلة الرقمية واستخراج البيانات المفقودة أو المحذوفة',
    icon: Search,
    features: ['تحليل الرام', 'استخراج البيانات', 'تحليل السجلات', 'تقارير قانونية'],
    status: 'متاح',
    price: 'يبدأ من 3,000 ريال',
  },
  {
    title: 'استرداد الحسابات',
    description: 'استعادة الحسابات المخترقة أو المسروقة بشكل قانوني وأمن',
    icon: Unlock,
    features: ['استعادة الحسابات', 'إزالة المحتوى الضار', 'تأمين الحساب', 'دعم قانوني'],
    status: 'متاح',
    price: 'يبدأ من 1,500 ريال',
  },
  {
    title: 'التدقيق الأمني',
    description: 'مراجعة شاملة للبنية التحتية والتطبيقات لضمان الامتثال للمعايير',
    icon: FileCheck,
    features: ['مراجعة الكود', 'فحص السيرفرات', 'مراجعة الصلاحيات', 'معايير الامتثال'],
    status: 'متاح',
    price: 'يبدأ من 5,000 ريال',
  },
];

// ==================== SECTION COMPONENTS ====================
const DashboardSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><SkeletonCard /></div>
          <div><SkeletonCard /></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-t-4 border-t-saudi-green hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-saudi-gray text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-saudi-dark">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-saudi-green/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-saudi-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* System Status & Vision 2030 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-saudi-green">
              <Activity className="w-5 h-5" />
              حالة النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">جميع الأنظمة تعمل بكفاءة</span>
              </div>
              <Badge className="bg-green-100 text-green-700">99.9% uptime</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'الخوادم', status: 'نشط', color: 'green' },
                { name: 'قاعدة البيانات', status: 'نشط', color: 'green' },
                { name: 'الشبكة', status: 'نشط', color: 'green' },
                { name: 'الحماية', status: 'نشط', color: 'green' },
              ].map((item, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full bg-${item.color}-500 mx-auto mb-2`} />
                  <p className="text-sm text-saudi-gray">{item.name}</p>
                  <p className="font-medium text-saudi-dark">{item.status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-saudi-green to-saudi-green-dark text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="w-5 h-5" />
              رؤية 2030
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              انطلاقاً من رؤية المملكة العربية السعودية 2030، نسعى لبناء مجتمع رقمي آمن 
              ومتمكن من مواجهة التحديات السيبرانية.
            </p>
            <div className="space-y-2">
              {[
                'تعزيز الأمن السيبراني الوطني',
                'تطوير الكوادر الوطنية',
                'دعم التحول الرقمي',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-saudi-gold flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-saudi-green">
            <History className="w-5 h-5" />
            آخر النشاطات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'اكتمال فحص أمني', target: 'موقع تجاري', time: 'منذ 5 دقائق', type: 'success' },
              { action: 'اكتشاف تهديد جديد', target: 'فيروس ransomware', time: 'منذ 15 دقيقة', type: 'warning' },
              { action: 'تحديث قاعدة البيانات', target: 'CVE Database', time: 'منذ ساعة', type: 'info' },
              { action: 'تسجيل عميل جديد', target: 'شركة تقنية', time: 'منذ ساعتين', type: 'success' },
            ].map((activity, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="font-medium text-saudi-dark">{activity.action}</p>
                    <p className="text-sm text-saudi-gray">{activity.target}</p>
                  </div>
                </div>
                <span className="text-sm text-saudi-gray">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestService = (service: typeof servicesData[0]) => {
    setSelectedService(service);
    setIsDialogOpen(true);
    toast.info(`تم فتح نموذج طلب: ${service.title}`, {
      position: 'bottom-right',
      rtl: true,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-saudi-green mb-2">الخدمات الإلكترونية</h2>
        <p className="text-saudi-gray">حلول أمنية متكاملة وفق أعلى المعايير العالمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-saudi-green/10 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-saudi-green" />
                  </div>
                  <Badge className={service.status === 'متاح' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                    {service.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-saudi-green font-bold mb-3">{service.price}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1 bg-saudi-green/5 text-saudi-green text-sm rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <Button 
                  className="w-full bg-saudi-green hover:bg-saudi-green-dark text-white"
                  onClick={() => handleRequestService(service)}
                >
                  طلب الخدمة
                  <ChevronLeft className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Service Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>طلب خدمة: {selectedService?.title}</DialogTitle>
            <DialogDescription>املأ البيانات التالية وسنتواصل معك في أقرب وقت</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
              <Input placeholder="محمد أحمد" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <Input type="email" placeholder="email@example.com" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رقم الجوال</label>
              <Input placeholder="05xxxxxxxx" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">تفاصيل الطلب</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-saudi-green resize-none"
                rows={3}
                placeholder="اشرح تفاصيل طلبك..."
              />
            </div>
            <Button 
              className="w-full bg-saudi-green hover:bg-saudi-green-dark text-white"
              onClick={() => {
                toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', {
                  position: 'bottom-right',
                  rtl: true,
                });
                setIsDialogOpen(false);
              }}
            >
              إرسال الطلب
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Process */}
      <Card>
        <CardHeader>
          <CardTitle className="text-saudi-green">خطوات العمل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'الطلب', desc: 'تقديم طلب الخدمة' },
              { step: '02', title: 'التحليل', desc: 'دراسة المتطلبات' },
              { step: '03', title: 'التنفيذ', desc: 'إجراء العملية' },
              { step: '04', title: 'التقرير', desc: 'تسليم النتائج' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-saudi-green text-white flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h4 className="font-bold text-saudi-dark">{item.title}</h4>
                <p className="text-sm text-saudi-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ==================== MAIN APP ====================
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'services': return <ServicesSection />;
      default: return <DashboardSection />;
    }
  };

  // Sidebar content
  const SidebarContent = () => (
    <div className="p-4">
      <nav className="space-y-2">
        {navigationSections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => {
                setActiveSection(section.id);
                setActiveSubSection(section.items[0].id);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === section.id 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <section.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-right text-sm">{section.title}</span>
              <ChevronLeft className={`w-4 h-4 transition-transform ${
                activeSection === section.id ? 'rotate-[-90deg]' : ''
              }`} />
            </button>
            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mr-4 mt-1 space-y-1 overflow-hidden"
                >
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSubSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                        activeSubSection === item.id
                          ? 'bg-saudi-gold/30 text-white'
                          : 'text-white/70 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-saudi-green animate-spin mx-auto mb-4" />
          <p className="text-xl text-saudi-gray">جاري تحميل المنصة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-kufi" dir="rtl">
      {/* Toast Container */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Sidebar Toggle */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-saudi-green border-none p-0">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="font-bold text-white text-sm">منصة أبو نواف</h1>
                        <p className="text-xs text-white/60">الحصن الرقمي</p>
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <SidebarContent />
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-saudi-green flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-saudi-dark text-sm md:text-base">منصة أبو نواف الرقمية</h1>
                <p className="text-xs text-saudi-gray">الحصن الرقمي | Abu Noaf Digital Portal</p>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => toast.info('لديك 3 إشعارات جديدة', { rtl: true })}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <Avatar className="w-9 h-9 border-2 border-saudi-green cursor-pointer" onClick={() => toast.info('الملف الشخصي قريباً', { rtl: true })}>
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-saudi-green text-white text-sm">AN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-[60px] bottom-0 right-0 w-72 bg-saudi-green text-white z-40">
        <ScrollArea className="h-full">
          <SidebarContent />
        </ScrollArea>
        
        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-saudi-green-dark/50">
          <div className="text-center text-white/60 text-xs">
            <p>جميع الحقوق محفوظة © 2025</p>
            <p>منصة أبو نواف الرقمية</p>
            <p className="mt-1 text-saudi-gold">CNC Certified | Level 4</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-[60px] lg:mr-72 min-h-screen">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-saudi-gray mb-4 md:mb-6">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className="hover:text-saudi-green transition-colors"
            >
              الرئيسية
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-saudi-green">
              {navigationSections.find(s => s.id === activeSection)?.title}
            </span>
          </nav>

          {/* Page Title */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-saudi-dark mb-2">
              {navigationSections.find(s => s.id === activeSection)?.title}
            </h1>
            <p className="text-saudi-gray text-sm md:text-base">
              انطلاقاً من رؤية المملكة 2030 نحو مجتمع رقمي آمن
            </p>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 w-12 h-12 bg-saudi-green text-white rounded-full shadow-lg flex items-center justify-center hover:bg-saudi-green-dark transition-colors z-50"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
