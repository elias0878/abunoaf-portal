import { useState, useEffect } from 'react';
import { 
  Shield, LayoutDashboard, Briefcase, GraduationCap, 
  Cpu, Eye, Lock, Target, BookOpen, Users, FileText,
  Menu, ChevronLeft, ExternalLink, CheckCircle,
  AlertTriangle, Server, Database,
  Code, Terminal, Search, Bell,
  LogOut, Activity, Award,
  Clock, ShieldCheck,
  FileCheck, LockKeyhole, Fingerprint,
  Smartphone, Monitor, Bug, Scan, Network,
  FileSearch, Brain,
  Puzzle, Wrench, BookMarked, Video,
  CreditCard,
  Scale, Gavel, BadgeCheck,
  BarChart3,
  Globe2, AlertOctagon, History,
  Lightbulb, Crosshair, Radar,
  Unlock,
  Receipt, Ticket, UserCircle,
  Headphones,
  FileStack,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

// Navigation Structure - 10 Sections
const navigationSections = [
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

// Stats Data
const platformStats = [
  { label: 'العملاء النشطون', value: 1247, suffix: '+', icon: Users },
  { label: 'العمليات المنفذة', value: 3589, suffix: '', icon: CheckCircle },
  { label: 'التهديدات المحجوبة', value: 15642, suffix: '', icon: Shield },
  { label: 'نسبة الأمان', value: 99.9, suffix: '%', icon: Lock },
];

// Services Data
const servicesData = [
  {
    title: 'اختبار الاختراق',
    description: 'فحص شامل للأنظمة والشبكات لاكتشاف الثغرات الأمنية قبل المهاجمين',
    icon: Bug,
    features: ['فحص الويب', 'فحص الشبكات', 'فحص تطبيقات الجوال', 'تقارير مفصلة'],
    status: 'متاح',
  },
  {
    title: 'التحقيق الرقمي',
    description: 'تحليل الأدلة الرقمية واستخراج البيانات المفقودة أو المحذوفة',
    icon: Search,
    features: ['تحليل الرام', 'استخراج البيانات', 'تحليل السجلات', 'تقارير قانونية'],
    status: 'متاح',
  },
  {
    title: 'استرداد الحسابات',
    description: 'استعادة الحسابات المخترقة أو المسروقة بشكل قانوني وأمن',
    icon: Unlock,
    features: ['استعادة الحسابات', 'إزالة المحتوى الضار', 'تأمين الحساب', 'دعم قانوني'],
    status: 'متاح',
  },
  {
    title: 'التدقيق الأمني',
    description: 'مراجعة شاملة للبنية التحتية والتطبيقات لضمان الامتثال للمعايير',
    icon: FileCheck,
    features: ['مراجعة الكود', 'فحص السيرفرات', 'مراجعة الصلاحيات', 'معايير الامتثال'],
    status: 'متاح',
  },
];

// Academy Courses
const academyCourses = [
  {
    title: 'أساسيات الأمن السيبراني',
    level: 'مبتدئ',
    duration: '20 ساعة',
    students: 1250,
    icon: Shield,
    description: 'تعلم المفاهيم الأساسية للأمن السيبراني ومبادئ حماية الأنظمة',
  },
  {
    title: 'مختبر Kali Linux',
    level: 'متوسط',
    duration: '40 ساعة',
    students: 890,
    icon: Terminal,
    description: 'إتقان أدوات Kali Linux لاختبار الاختراق والتحقيق الرقمي',
  },
  {
    title: 'Termux للمحترفين',
    level: 'متقدم',
    duration: '30 ساعة',
    students: 2100,
    icon: Smartphone,
    description: 'تحويل جهاز Android إلى منصة اختبار اختراق متكاملة',
  },
  {
    title: 'Python للأمن السيبراني',
    level: 'متوسط',
    duration: '35 ساعة',
    students: 1560,
    icon: Code,
    description: 'برمجة أدوات الأمن السيبراني باستخدام لغة Python',
  },
];

// Arsenal Projects
const arsenalProjects = [
  {
    title: 'AI Keyboard Project',
    description: 'لوحة مفاتيح ذكية مدعومة بالذكاء الاصطناعي للرد الآلي والمساعدة في البرمجة',
    status: 'قيد التطوير',
    progress: 75,
    icon: Brain,
    tech: ['Python', 'TensorFlow', 'React'],
  },
  {
    title: 'OSINT Tool Suite',
    description: 'مجموعة أدوات متكاملة للبحث والتحليل الاستخباراتي المفتوح المصدر',
    status: 'مكتمل',
    progress: 100,
    icon: Search,
    tech: ['Python', 'APIs', 'Docker'],
  },
  {
    title: 'Termux Scripts Pack',
    description: 'حزمة سكربتات متخصصة لأتمتة المهام الأمنية على Termux',
    status: 'مكتمل',
    progress: 100,
    icon: Terminal,
    tech: ['Bash', 'Python', 'Termux API'],
  },
  {
    title: 'Security Scanner',
    description: 'ماسح أمني متكامل لفحص الثغرات في المواقع والشبكات',
    status: 'بيتا',
    progress: 60,
    icon: Scan,
    tech: ['Go', 'Vue.js', 'PostgreSQL'],
  },
];

// Intelligence Data
const intelligenceData = [
  {
    title: 'رصد التهديدات',
    description: 'مراقبة مستمرة للتهديدات السيبرانية النشطة وتحليل أنماط الهجمات',
    icon: Radar,
    alerts: 12,
    status: 'نشط',
  },
  {
    title: 'تحليل التسريبات',
    description: 'فحص قواعد البيانات المسربة والتحقق من وجود بيانات العملاء',
    icon: Database,
    alerts: 3,
    status: 'نشط',
  },
  {
    title: 'استخبارات مفتوحة',
    description: 'جمع وتحليل المعلومات من المصادر المفتوحة لدعم التحقيقات',
    icon: Globe2,
    alerts: 0,
    status: 'نشط',
  },
  {
    title: 'تحليل البرمجيات الخبيثة',
    description: 'فحص وتحليل البرمجيات الضارة وفهم آليات عملها',
    icon: Bug,
    alerts: 7,
    status: 'نشط',
  },
];

// Blue Team Strategies
const blueTeamData = [
  {
    title: 'تصليد Windows',
    description: 'تعزيز أمان أنظمة Windows من خلال الإعدادات والسياسات الأمنية',
    icon: Monitor,
    items: ['Group Policy', 'Windows Defender', 'Firewall', 'Updates'],
  },
  {
    title: 'تصليد Linux',
    description: 'تأمين خوادم Linux بأفضل الممارسات والإعدادات الأمنية',
    icon: Server,
    items: ['SSH Hardening', 'SELinux', 'iptables', 'Audit'],
  },
  {
    title: 'أمن الشبكات',
    description: 'حماية البنية التحتية للشبكة من الهجمات الداخلية والخارجية',
    icon: Network,
    items: ['Segmentation', 'IDS/IPS', 'VPN', 'Monitoring'],
  },
  {
    title: 'إدارة الهويات',
    description: 'التحكم في الوصول وإدارة هويات المستخدمين بشكل آمن',
    icon: Fingerprint,
    items: ['MFA', 'Password Policy', 'Access Control', 'SSO'],
  },
];

// Red Team Techniques
const redTeamData = [
  {
    title: 'جمع المعلومات',
    description: 'المرحلة الأولى: جمع المعلومات عن الهدف بشكل سلبي ونشط',
    icon: Globe2,
    phase: '01',
  },
  {
    title: 'فحص الثغرات',
    description: 'المرحلة الثانية: اكتشاف الثغرات والنقاط الضعيفة في الأنظمة',
    icon: Scan,
    phase: '02',
  },
  {
    title: 'الاستغلال',
    description: 'المرحلة الثالثة: استغلال الثغرات المكتشفة للوصول للنظام',
    icon: Crosshair,
    phase: '03',
  },
  {
    title: 'ما بعد الاستغلال',
    description: 'المرحلة الرابعة: الحفاظ على الوصول وتصعيد الصلاحيات',
    icon: Target,
    phase: '04',
  },
];

// Library Resources
const libraryData = [
  {
    title: 'الكتب الإلكترونية',
    count: 150,
    icon: BookMarked,
    description: 'مكتبة شاملة من الكتب المتخصصة في الأمن السيبراني',
  },
  {
    title: 'أوراق الغش',
    count: 75,
    icon: FileStack,
    description: 'مراجع سريعة لأهم الأوامر والأدوات',
  },
  {
    title: 'قاعدة بيانات الثغرات',
    count: 25000,
    icon: Database,
    description: 'قاعدة بيانات شاملة للثغرات الأمنية المعروفة',
  },
  {
    title: 'الفيديوهات التعليمية',
    count: 300,
    icon: Video,
    description: 'دروس مصورة وشرح تفصيلي للأدوات والتقنيات',
  },
];

// Client Portal Features
const clientPortalData = [
  {
    title: 'نظام التذاكر',
    description: 'إدارة الطلبات والمشاكل الأمنية بشكل منظم وفعال',
    icon: Ticket,
  },
  {
    title: 'التقارير الأمنية',
    description: 'الوصول للتقارير الأمنية المفصلة والتوصيات',
    icon: FileText,
  },
  {
    title: 'الفواتير والمدفوعات',
    description: 'إدارة الفواتير والمدفوعات بشكل آمن وشفاف',
    icon: CreditCard,
  },
  {
    title: 'الدعم المباشر',
    description: 'تواصل مباشر مع فريق الدعم الفني على مدار الساعة',
    icon: Headphones,
  },
];

// Regulations Data
const regulationsData = [
  {
    title: 'سياسة الخصوصية',
    description: 'كيفية جمع واستخدام وحماية بيانات المستخدمين',
    icon: LockKeyhole,
  },
  {
    title: 'إخلاء المسؤولية',
    description: 'الشروط والأحكام لاستخدام المنصة والخدمات',
    icon: AlertCircle,
  },
  {
    title: 'قوانين الأمن السيبراني',
    description: 'الامتثال لأنظمة مكافحة الجرائم المعلوماتية السعودية',
    icon: Gavel,
  },
  {
    title: 'مدونة الأخلاق',
    description: 'المبادئ الأخلاقية التي تحكم عملنا وخدماتنا',
    icon: BadgeCheck,
  },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => (
          <Card key={index} className="saudi-card saudi-card-hover border-t-4 border-t-saudi-green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-saudi-gray text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-saudi-dark">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-saudi-green/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-saudi-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status & Vision 2030 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 saudi-card">
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

        <Card className="saudi-card bg-gradient-to-br from-saudi-green to-saudi-green-dark text-white">
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
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-saudi-gold" />
                <span>تعزيز الأمن السيبراني الوطني</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-saudi-gold" />
                <span>تطوير الكوادر الوطنية</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-saudi-gold" />
                <span>دعم التحول الرقمي</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="saudi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-saudi-green">
            <History className="w-5 h-5" />
            آخر النشاطات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'اكتمال فحص أمني', target: 'موقع تجاري', time: 'منذ 5 دقائق', type: 'success' },
              { action: 'اكتشاف تهديد جديد', target: 'فيروس ransomware', time: 'منذ 15 دقيقة', type: 'warning' },
              { action: 'تحديث قاعدة البيانات', target: 'CVE Database', time: 'منذ ساعة', type: 'info' },
              { action: 'تسجيل عميل جديد', target: 'شركة تقنية', time: 'منذ ساعتين', type: 'success' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">الخدمات الإلكترونية</h2>
        <p className="saudi-section-subtitle">حلول أمنية متكاملة وفق أعلى المعايير العالمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servicesData.map((service, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
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
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-saudi-green/5 text-saudi-green text-sm rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
              <Button className="w-full mt-4 saudi-button-primary">
                طلب الخدمة
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Process */}
      <Card className="saudi-card">
        <CardHeader>
          <CardTitle className="text-saudi-green">خطوات العمل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
    </div>
  );

  const renderAcademy = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">الأكاديمية الرقمية</h2>
        <p className="saudi-section-subtitle">تعلم الأمن السيبراني من الصفر حتى الاحتراف</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academyCourses.map((course, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-saudi-gold/20 flex items-center justify-center">
                  <course.icon className="w-7 h-7 text-saudi-gold-dark" />
                </div>
                <Badge className="bg-saudi-green/10 text-saudi-green">{course.level}</Badge>
              </div>
              <CardTitle className="text-xl mt-4">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-saudi-gray mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students.toLocaleString()} طالب
                </span>
              </div>
              <Button className="w-full saudi-button-secondary">
                بدء التعلم
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cyber Awareness */}
      <Card className="saudi-card bg-gradient-to-r from-saudi-green/5 to-saudi-gold/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-saudi-green">
            <Lightbulb className="w-5 h-5" />
            التوعية السيبرانية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'تعرف على التصيد الاحتيالي', desc: 'كيفية التعرف على رسائل البريد الاحتيالية' },
              { title: 'كلمة المرور القوية', desc: 'أهمية استخدام كلمات مرور معقدة وفريدة' },
              { title: 'المصادقة الثنائية', desc: 'تفعيل 2FA لحماية إضافية' },
            ].map((tip, i) => (
              <div key={i} className="p-4 bg-white rounded-lg">
                <h4 className="font-bold text-saudi-dark mb-2">{tip.title}</h4>
                <p className="text-sm text-saudi-gray">{tip.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderArsenal = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">الترسانة التقنية</h2>
        <p className="saudi-section-subtitle">أدوات ومشاريع مخصصة للأمن السيبراني</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {arsenalProjects.map((project, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-saudi-green/10 flex items-center justify-center">
                  <project.icon className="w-7 h-7 text-saudi-green" />
                </div>
                <Badge className={
                  project.status === 'مكتمل' ? 'bg-green-100 text-green-700' :
                  project.status === 'قيد التطوير' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }>
                  {project.status}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-4">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-saudi-gray">التقدم</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-saudi-gray text-xs rounded">
                    {t}
                  </span>
                ))}
              </div>
              <Button className="w-full saudi-button-outline">
                عرض التفاصيل
                <ExternalLink className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderIntelligence = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">مركز الاستخبارات</h2>
        <p className="saudi-section-subtitle">رصد وتحليل التهديدات السيبرانية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {intelligenceData.map((item, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-saudi-green/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-saudi-green" />
                </div>
                {item.alerts > 0 && (
                  <Badge className="bg-red-100 text-red-700">
                    {item.alerts} تنبيه
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-saudi-gray">النظام {item.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Threat Map Placeholder */}
      <Card className="saudi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-saudi-green">
            <Globe2 className="w-5 h-5" />
            خريطة التهديدات العالمية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-saudi-dark to-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Radar className="w-16 h-16 mx-auto mb-4 text-saudi-green" />
              <p className="text-lg">نظام رصد التهديدات العالمي</p>
              <p className="text-sm text-white/60">يتم تحديث البيانات كل 5 دقائق</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBlueTeam = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">الدفاع السيبراني</h2>
        <p className="saudi-section-subtitle">استراتيجيات وحلول حماية المنظومات الرقمية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blueTeamData.map((item, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-blue-600" />
              </div>
              <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.items.map((subItem, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {subItem}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incident Response */}
      <Card className="saudi-card border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            الاستجابة للحوادث
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'الاكتشاف', desc: 'رصد الحادثة' },
              { step: '2', title: 'التحليل', desc: 'فهم المشكلة' },
              { step: '3', title: 'الاحتواء', desc: 'وقف الانتشار' },
              { step: '4', title: 'الإزالة', desc: 'حذف التهديد' },
              { step: '5', title: 'الاستعادة', desc: 'عودة الخدمة' },
            ].map((phase, i) => (
              <div key={i} className="text-center p-4 bg-red-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  {phase.step}
                </div>
                <h4 className="font-bold text-saudi-dark text-sm">{phase.title}</h4>
                <p className="text-xs text-saudi-gray">{phase.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRedTeam = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">الهجوم الأخلاقي</h2>
        <p className="saudi-section-subtitle">اختبار اختراق معتمد لقياس قوة الدفاعات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {redTeamData.map((phase, index) => (
          <Card key={index} className="saudi-card saudi-card-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg mb-4">
                {phase.phase}
              </div>
              <CardTitle className="text-lg">{phase.title}</CardTitle>
              <CardDescription className="text-sm">{phase.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Ethical Hacking Notice */}
      <Card className="saudi-card bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
            تنبيه أخلاقي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-800 leading-relaxed">
            جميع الأنشطة الواردة في هذا القسم مخصصة للأغراض التعليمية والاختبار المعتمد فقط. 
            يجب الحصول على إذن كتابي صريح قبل اختبار أي نظام. نحن لا نتحمل مسؤولية أي استخدام غير قانوني.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">المكتبة والمعرفة</h2>
        <p className="saudi-section-subtitle">مصادر المعرفة الشاملة في الأمن السيبراني</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {libraryData.map((resource, index) => (
          <Card key={index} className="saudi-card saudi-card-hover text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-saudi-green/10 flex items-center justify-center mx-auto mb-4">
                <resource.icon className="w-8 h-8 text-saudi-green" />
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-saudi-green">{resource.count.toLocaleString()}</p>
              <p className="text-sm text-saudi-gray">مورد</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Saudi Cyber Laws */}
      <Card className="saudi-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-saudi-green">
            <Scale className="w-5 h-5" />
            القوانين والمعايير السعودية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'نظام مكافحة الجرائم المعلوماتية', desc: 'الإطار القانوني لحماية الأنظمة والبيانات' },
              { title: 'الإطار الوطني للأمن السيبراني', desc: 'معايير ومتطلبات الأمن السيبراني للمنشآت' },
              { title: 'نظام حماية البيانات الشخصية', desc: 'تنظيم جمع ومعالجة وحماية البيانات الشخصية' },
            ].map((law, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-bold text-saudi-dark">{law.title}</h4>
                  <p className="text-sm text-saudi-gray">{law.desc}</p>
                </div>
                <Button variant="outline" size="sm" className="border-saudi-green text-saudi-green hover:bg-saudi-green hover:text-white">
                  عرض
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClients = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">بوابة العملاء</h2>
        <p className="saudi-section-subtitle">بوابة آمنة لإدارة الخدمات والمشاريع</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clientPortalData.map((feature, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-saudi-gold/20 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-saudi-gold-dark" />
              </div>
              <CardTitle className="text-xl mt-4">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full saudi-button-primary">
                الوصول
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Login Form */}
      <Card className="saudi-card max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full bg-saudi-green/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-saudi-green" />
          </div>
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>أدخل بيانات الاعتماد الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
            <Input type="email" placeholder="email@example.com" className="saudi-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">كلمة المرور</label>
            <Input type="password" placeholder="••••••••" className="saudi-input" />
          </div>
          <Button className="w-full saudi-button-primary">
            تسجيل الدخول
          </Button>
          <div className="text-center text-sm">
            <a href="#" className="text-saudi-green hover:underline">نسيت كلمة المرور؟</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRegulations = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="saudi-section-title">التنظيم والقانون</h2>
        <p className="saudi-section-subtitle">الإطار القانوني والتنظيمي للمنصة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regulationsData.map((item, index) => (
          <Card key={index} className="saudi-card saudi-card-hover">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-saudi-green/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-saudi-green" />
              </div>
              <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-saudi-green text-saudi-green hover:bg-saudi-green hover:text-white">
                قراءة المزيد
                <ChevronLeft className="w-4 h-4 mr-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code of Ethics */}
      <Card className="saudi-card bg-gradient-to-br from-saudi-green to-saudi-green-dark text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BadgeCheck className="w-5 h-5" />
            ميثاق الشرف الأخلاقي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'الالتزام بالقوانين والأنظمة',
              'حماية خصوصية العملاء',
              'الشفافية في التعامل',
              'عدم الإضرار بالأنظمة',
              'نشر الوعي الأمني',
              'دعم التحول الرقمي',
            ].map((principle, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-saudi-gold flex-shrink-0" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'services': return renderServices();
      case 'academy': return renderAcademy();
      case 'arsenal': return renderArsenal();
      case 'intelligence': return renderIntelligence();
      case 'blueteam': return renderBlueTeam();
      case 'redteam': return renderRedTeam();
      case 'library': return renderLibrary();
      case 'clients': return renderClients();
      case 'regulations': return renderRegulations();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-kufi" dir="rtl">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-saudi-green flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-saudi-dark">منصة أبو نواف الرقمية</h1>
                <p className="text-xs text-saudi-gray">الحصن الرقمي | Abu Noaf Digital Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar className="w-9 h-9 border-2 border-saudi-green">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="bg-saudi-green text-white text-sm">AN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-[60px] bottom-0 right-0 z-40 w-72 bg-saudi-green text-white transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      } lg:translate-x-0`}>
        <ScrollArea className="h-full">
          <div className="p-4">
            <nav className="space-y-2">
              {navigationSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="flex-1 text-right">{section.title}</span>
                    <ChevronLeft className={`w-4 h-4 transition-transform ${
                      activeSection === section.id ? 'rotate-[-90deg]' : ''
                    }`} />
                  </button>
                  {activeSection === section.id && (
                    <div className="mr-4 mt-1 space-y-1 animate-slide-in-right">
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
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Footer Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-saudi-green-dark/50">
            <div className="text-center text-white/60 text-xs">
              <p>جميع الحقوق محفوظة © 2025</p>
              <p>منصة أبو نواف الرقمية</p>
              <p className="mt-1 text-saudi-gold">CNC Certified | Level 4</p>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className={`pt-[60px] transition-all duration-300 ${
        sidebarOpen ? 'lg:mr-72' : ''
      }`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-saudi-gray mb-6">
            <span>الرئيسية</span>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-saudi-green">
              {navigationSections.find(s => s.id === activeSection)?.title}
            </span>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-saudi-dark mb-2">
              {navigationSections.find(s => s.id === activeSection)?.title}
            </h1>
            <p className="text-saudi-gray">
              انطلاقاً من رؤية المملكة 2030 نحو مجتمع رقمي آمن
            </p>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
