
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Zap, 
  Droplet, 
  Hammer, 
  Wind, 
  Sparkles, 
  PaintBucket, 
  CheckCircle, 
  Star, 
  User, 
  MessageSquare, 
  Bell, 
  Menu,
  X,
  Camera,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { CATEGORIES, MOCK_CRAFTSMEN } from './constants';
import { Craftsman, UserRole, VerificationStatus } from './types';
import { verifyIdentity } from './services/geminiService';

// --- Sub-components ---

const Header = ({ userRole, onLogout, setView }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0f172a] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <ShieldCheck className="w-8 h-8 text-[#eab308]" />
            <span className="text-xl font-bold tracking-tight">حرفيين حولك</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              <button onClick={() => setView('home')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">الرئيسية</button>
              <button onClick={() => setView('categories')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">التصنيفات</button>
              <button onClick={() => setView('map')} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">الخريطة</button>
              {userRole === UserRole.CRAFTSMAN && (
                <button onClick={() => setView('verification')} className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700">توثيق الحساب</button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-2 border-r pr-4 border-gray-700">
              <button onClick={() => setView('profile')} className="bg-gray-800 p-1 rounded-full border border-gray-600">
                <User className="w-6 h-6" />
              </button>
              <button onClick={onLogout} className="text-gray-400 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onSearch }: any) => {
  return (
    <div className="relative bg-[#0f172a] py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          ابحث عن <span className="text-[#eab308]">حرفي موثق</span> في منطقتك بكل سهولة
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          منصة تجمع بين نخبة الحرفيين والعملاء في المملكة العربية السعودية مع ضمان التوثيق والجودة.
        </p>
        
        <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="عن ماذا تبحث؟ (سباك، كهربائي...)" 
              className="w-full pr-12 pl-4 py-3 rounded-xl border-none focus:ring-0 text-gray-800"
            />
          </div>
          <div className="flex-1 relative border-r border-gray-100">
            <MapPin className="absolute right-4 top-3.5 text-gray-400" />
            <select className="w-full pr-12 pl-4 py-3 rounded-xl border-none focus:ring-0 text-gray-800 appearance-none">
              <option>الرياض، حي النخيل</option>
              <option>جدة، حي الشاطئ</option>
              <option>الدمام، حي الفيصلية</option>
            </select>
          </div>
          <button 
            onClick={onSearch}
            className="bg-[#eab308] text-[#0f172a] font-bold px-10 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-lg"
          >
            بحث الآن
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryList = ({ setView }: any) => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'zap': return <Zap />;
      case 'droplet': return <Droplet />;
      case 'hammer': return <Hammer />;
      case 'wind': return <Wind />;
      case 'sparkles': return <Sparkles />;
      case 'paint-bucket': return <PaintBucket />;
      default: return <Hammer />;
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">أبرز التخصصات</h2>
            <p className="text-gray-500 mt-2">اختر الخدمة التي تحتاجها وسنوصلك بالأفضل</p>
          </div>
          <button onClick={() => setView('categories')} className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            مشاهدة الكل <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="group cursor-pointer text-center"
              onClick={() => setView('results')}
            >
              <div className={`${cat.color} w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-white mb-4 transform transition-transform group-hover:scale-110 shadow-lg group-hover:shadow-xl`}>
                {React.cloneElement(getIcon(cat.icon) as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="font-bold text-gray-800">{cat.nameAr}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Fix: Use React.FC to allow standard React props like 'key' during list reconciliation.
const CraftsmanCard: React.FC<{ craftsman: Craftsman; onClick: () => void }> = ({ craftsman, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      <div className="relative">
        <img src={craftsman.avatar} alt={craftsman.name} className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {craftsman.rating}
        </div>
        {craftsman.verified && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-md">
            <CheckCircle className="w-3.5 h-3.5" />
            موثق
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{craftsman.name}</h3>
        <p className="text-blue-600 text-sm font-semibold mb-3">{craftsman.specialty}</p>
        
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {craftsman.city} - {craftsman.neighborhood}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">سعر الساعة</span>
            <p className="text-lg font-bold text-gray-800">{craftsman.hourlyRate} <span className="text-sm font-normal text-gray-500">ريال</span></p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800">حجز موعد</button>
        </div>
      </div>
    </div>
  );
};

const VerificationProcess = ({ onVerified }: any) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulateOCR = async () => {
    setLoading(true);
    // Simulate image capture
    setTimeout(async () => {
      const mockResult = await verifyIdentity("base64_demo_data");
      setResult(mockResult);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">توثيق الهوية عبر الذكاء الاصطناعي</h2>
          <p className="text-gray-500">خطوة واحدة تمنحك شارة "موثق رسمياً" وتزيد ثقة عملائك</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl flex gap-4">
              <Zap className="text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-800">تأكد من وضوح صورة الهوية ووجود الباركود داخل الإطار لضمان سرعة المعالجة.</p>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">التقط صورة لبطاقة الهوية أو الإقامة</p>
              <p className="text-xs text-gray-400 mt-2">يدعم الباركود والبيانات النصية</p>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all"
            >
              ابدأ عملية المسح
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center py-10">
            {!loading ? (
              <>
                <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8 group">
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-40 border-2 border-green-500 rounded-lg animate-pulse relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500 animate-[scan_2s_linear_infinite]"></div>
                     </div>
                   </div>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <button 
                        onClick={handleSimulateOCR}
                        className="bg-white w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center"
                      >
                         <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-900"></div>
                      </button>
                   </div>
                </div>
                <p className="text-gray-600">ضع البطاقة داخل الإطار الأخضر والتقط الصورة</p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-bold">جاري معالجة البيانات عبر الذكاء الاصطناعي...</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && result && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} /> تم استخراج البيانات بنجاح
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span className="text-green-700">الاسم الكامل:</span>
                  <span className="font-bold">{result.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-green-200 pb-2">
                  <span className="text-green-700">رقم الهوية:</span>
                  <span className="font-bold">{result.idNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">تاريخ الانتهاء:</span>
                  <span className="font-bold">{result.expiryDate}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                onVerified();
                setStep(1);
              }}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
            >
              تأكيد وإتمام التوثيق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  // Authentication Mock
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-10">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-[#eab308] w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">مرحباً بك في حرفيين حولك</h1>
            <p className="text-gray-500 mt-2">سجل دخولك للبدء في استخدام المنصة</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => { setIsLoggedIn(true); setUserRole(UserRole.CUSTOMER); }}
              className="w-full flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold transition-all"
            >
              <User size={24} className="text-blue-500" />
              أنا أبحث عن حرفي (عميل)
            </button>
            <button 
              onClick={() => { setIsLoggedIn(true); setUserRole(UserRole.CRAFTSMAN); }}
              className="w-full flex items-center justify-center gap-3 bg-[#0f172a] hover:bg-gray-800 text-white py-4 rounded-2xl font-bold transition-all"
            >
              <Hammer size={24} className="text-[#eab308]" />
              أنا أريد تقديم خدماتي (حرفي)
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-400 mt-8">
            بإكمال التسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12" dir="rtl">
      <Header 
        userRole={userRole} 
        onLogout={() => setIsLoggedIn(false)} 
        setView={setView} 
      />

      <main>
        {view === 'home' && (
          <>
            <Hero onSearch={() => setView('results')} />
            <CategoryList setView={setView} />
            
            <div className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold mb-10">حرفيين موصى بهم بالقرب منك</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MOCK_CRAFTSMEN.map(c => (
                  <CraftsmanCard 
                    key={c.id} 
                    craftsman={c} 
                    onClick={() => { setSelectedCraftsman(c); setView('details'); }} 
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'results' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters */}
              <div className="w-full md:w-64 space-y-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">فلترة حسب المدينة</h3>
                  <div className="space-y-2">
                    {['الرياض', 'جدة', 'الدمام', 'مكة'].map(city => (
                      <label key={city} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-700">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">التقييم</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map(stars => (
                      <label key={stars} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span className="flex items-center gap-1 text-gray-700">
                          {stars} نجوم وما فوق <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">نتائج البحث ({MOCK_CRAFTSMEN.length})</h2>
                  <select className="bg-white border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-blue-500">
                    <option>الأقرب إليك</option>
                    <option>الأعلى تقييماً</option>
                    <option>الأقل سعراً</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_CRAFTSMEN.map(c => (
                    <CraftsmanCard 
                      key={c.id} 
                      craftsman={c} 
                      onClick={() => { setSelectedCraftsman(c); setView('details'); }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'details' && selectedCraftsman && (
          <div className="max-w-5xl mx-auto px-4 py-12">
             <button 
              onClick={() => setView('home')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-medium"
             >
               <ChevronRight size={20} /> العودة للبحث
             </button>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right">
                    <img src={selectedCraftsman.avatar} className="w-32 h-32 rounded-3xl object-cover ring-4 ring-gray-50 shadow-md" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{selectedCraftsman.name}</h1>
                        {selectedCraftsman.verified && (
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                            <CheckCircle size={14} /> موثق رسمياً
                          </div>
                        )}
                      </div>
                      <p className="text-blue-600 font-bold text-lg mb-4">{selectedCraftsman.specialty}</p>
                      <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-6 justify-center md:justify-start">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {selectedCraftsman.city} - {selectedCraftsman.neighborhood}</span>
                        <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {selectedCraftsman.rating} ( {selectedCraftsman.reviewCount} تقييم )</span>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {selectedCraftsman.subSpecialties.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">نبذة عن الحرفي</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedCraftsman.bio}</p>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">صور من المشاريع السابقة</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedCraftsman.portfolio.length > 0 ? selectedCraftsman.portfolio.map((img, i) => (
                        <img key={i} src={img} className="rounded-xl h-32 w-full object-cover hover:opacity-90 cursor-pointer" />
                      )) : (
                        <div className="col-span-3 py-8 text-center text-gray-400">لا يوجد صور مشاريع حتى الآن</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-8">التقييمات والتعليقات</h2>
                    {selectedCraftsman.ratings.length > 0 ? (
                      <div className="space-y-8">
                        {selectedCraftsman.ratings.map((r, i) => (
                          <div key={i} className="border-b border-gray-50 pb-8 last:border-0">
                             <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                    {r.customerName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900">{r.customerName}</p>
                                    <p className="text-xs text-gray-400">{r.date}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                 {r.overall} <Star size={14} fill="currentColor" />
                               </div>
                             </div>
                             <p className="text-gray-600 italic">"{r.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-400">لا توجد تقييمات حالياً</div>
                    )}
                  </div>
                </div>

                {/* Booking Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                    <div className="text-center mb-8">
                      <span className="text-gray-400 text-sm">التكلفة المتوقعة</span>
                      <p className="text-4xl font-extrabold text-gray-900 mt-1">{selectedCraftsman.hourlyRate} <span className="text-lg font-normal text-gray-400">ريال/ساعة</span></p>
                    </div>

                    <div className="space-y-4 mb-8">
                       <button className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                         <Zap size={20} /> حجز موعد سريع
                       </button>
                       <button className="w-full bg-white text-gray-900 border-2 border-gray-100 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                         <MessageSquare size={20} className="text-blue-500" /> تحدث مع الحرفي
                       </button>
                    </div>

                    <div className="pt-6 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ShieldCheck size={18} className="text-green-500" />
                        <span>دفع آمن داخل التطبيق</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={18} className="text-green-500" />
                        <span>ضمان جودة العمل</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {view === 'verification' && (
          <VerificationProcess onVerified={() => {
            setIsVerified(true);
            alert('تم توثيق حسابك بنجاح! سيتم مراجعة البيانات من قبل فريقنا.');
            setView('home');
          }} />
        )}

        {view === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">تصفح الخدمات حسب التصنيف</h1>
            <p className="text-gray-500 mb-12">اختر التخصص الذي تبحث عنه وسنوفر لك نخبة المحترفين</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  onClick={() => setView('results')}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all group cursor-pointer"
                >
                  <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:-translate-y-2 transition-transform shadow-lg`}>
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cat.nameAr}</h3>
                  <p className="text-sm text-gray-500 mb-6">متوفر حالياً أكثر من 20 حرفي موثق في هذا المجال في منطقتك.</p>
                  <button className="text-blue-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    تصفح الحرفيين <ChevronLeft size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'profile' && (
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-[#0f172a] h-32 relative">
                <div className="absolute -bottom-12 right-12">
                   <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg">
                      <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                        <User size={48} />
                      </div>
                   </div>
                </div>
              </div>
              <div className="p-12 pt-16">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">سلطان الدهمشي</h1>
                    <p className="text-gray-500">عميل مسجل منذ أكتوبر 2023</p>
                  </div>
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all">تعديل الملف</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-xs text-blue-500 font-bold uppercase mb-1">المشاريع المكتملة</p>
                    <p className="text-3xl font-extrabold text-blue-900">12</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <p className="text-xs text-green-500 font-bold uppercase mb-1">النقاط</p>
                    <p className="text-3xl font-extrabold text-green-900">450</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                    <p className="text-xs text-purple-500 font-bold uppercase mb-1">التقييمات</p>
                    <p className="text-3xl font-extrabold text-purple-900">5</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-6">سجل النشاط الأخير</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                        <Hammer size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">تم الانتهاء من مشروع سباكة</p>
                        <p className="text-sm text-gray-500">الحرفي: خالد العنزي</p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">240 ريال</p>
                        <p className="text-xs text-gray-400">منذ يومين</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-right">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
                <ShieldCheck className="w-8 h-8 text-[#eab308]" />
                <span className="text-2xl font-bold text-white tracking-tight">حرفيين حولك</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed mb-6">
                المنصة الأولى الموثوقة لربط الحرفيين بالعملاء في المملكة العربية السعودية باستخدام أحدث تقنيات الذكاء الاصطناعي لضمان الأمان والجودة.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                   <ImageIcon size={18} className="text-white" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                   <MessageSquare size={18} className="text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-white cursor-pointer" onClick={() => setView('home')}>الرئيسية</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setView('categories')}>التصنيفات</li>
                <li className="hover:text-white cursor-pointer">الأسئلة الشائعة</li>
                <li className="hover:text-white cursor-pointer">شروط الاستخدام</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-2 justify-center md:justify-start">Alenezi379@gmail.com</li>
                <li className="flex items-center gap-2 justify-center md:justify-start" dir="ltr">+966 55 338 5844</li>
                <li>المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>جميع الحقوق محفوظة © 2026 - سلطان الدهمشي</p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">سياسة الخصوصية</span>
              <span className="hover:text-white cursor-pointer">اتفاقية المستخدم</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add these styles for the scan animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes scan {
    0% { top: 0; }
    50% { top: 100%; }
    100% { top: 0; }
  }
`;
document.head.appendChild(style);
