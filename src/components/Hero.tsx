"use client";
import  { useRef } from 'react';
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

// --- STACKED WORLD MAP ---
interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = "#059669" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#6ee7b7", // Changed from gray to a highly visible light emerald
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] relative">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full object-contain [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        draggable={false}
      />
      <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 * i, ease: "easeInOut" }}
              />
              <circle cx={startPoint.x} cy={startPoint.y} r="3" fill={lineColor} />
              <circle cx={endPoint.x} cy={endPoint.y} r="3" fill={lineColor} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// --- MAIN HERO COMPONENT ---
const Hero = () => {
  const connectionDots = [
    {
      start: { lat: 10.7975, lng: -10.8919 }, // morroco (Brasília)
      end: { lat: 10.7223, lng: 44.1393 }, // Lisbon
    },
 
    {
      start: { lat: 10.7975, lng: -10.8919 }, // morroco(Fairbanks)
      end: { lat: 44.2008, lng: -109.4937 }, // Brazil (Brasília)
    },
    {
      start: { lat: 44.2008, lng: -109.4937 },  // Brazil (Brasília)
      end: { lat: -15.7975, lng: -57.8919 }, // Lisbon
    },
    {
      start: { lat: 10.7223, lng: 44.1393 }, // New Delhi
      end: { lat: 28.6139, lng: 77.209 }, // Nairobi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // London
      end: { lat: 51.5074, lng: -0.1278 }, // New Delhi
    },
    {
      start: { lat: 28.6139, lng: 77.209 }, // New Delhi
      end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
    },
    
  ];

  return (
    <div className="min-h-screen bg-white text-right mt-15 py-20 px-6 md:px-12 flex flex-col items-center justify-center gap-12" dir="rtl">
      
      {/* 1. TOP: Title & Subtitle */}
      <header className="max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
        >
          البرنامج العربي <span className="text-emerald-700 font-extrabold underline underline-offset-8 decoration-emerald-100"> للحلال</span>
        </motion.h1>
      <motion.p 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="text-lg md:text-xl text-slate-600 leading-relaxed"
>
 منظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه{" "}
  
  {" "}— لحماية المستهلك المسلم في كل مكان من أي شهادة حلال بلا مصداقية.
</motion.p>
      </header>

      {/* 2. MIDDLE: World Map Container */}
      <div className="w-full max-w-5xl">
        <WorldMap dots={connectionDots} />
      </div>

      {/* 3. BOTTOM: Call to Action Cards */}
      <section className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">الهيئات الدولية</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              للهيئات <strong className="font-bold text-slate-800">خارج المنطقة العربية</strong> الراغبة في الاعتماد الرسمي والاعتراف المتبادل.
            </p>
            <button className="text-sm font-bold text-emerald-700 group-hover:text-emerald-500 transition-colors">
              طلب الاعتماد ←
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all group">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">جهات التعيين</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              للمؤسسات الحكومية الراغبة في <strong className="font-bold text-slate-800">منح علامة الحلال</strong> وتطبيق المعايير المهنية.
            </p>
            <button className="text-sm font-bold text-emerald-700 group-hover:text-emerald-500 transition-colors">
              دليل الانضمام ←
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-white hover:shadow-lg transition-all group">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">الموردون والمنشآت</h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              احصل على <strong className="font-bold text-slate-800">ترخيص علامة الحلال</strong> لضمان قبول منتجاتك في كافة الأسواق العربية.
            </p>
            <button className="text-sm font-bold text-emerald-700 group-hover:text-emerald-500 transition-colors">
              تقديم الطلب ←
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Hero;