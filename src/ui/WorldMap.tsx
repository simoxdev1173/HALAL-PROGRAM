
import DottedMap from "dotted-map";

export function WorldMap() {
  // إنشاء الخريطة بنقاط عالية الكثافة
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  // تلوين النقاط باللون الأبيض وجعل الخلفية شفافة
  const svgMap = map.getSVG({
    radius: 0.17, // 👈 تم التعديل هنا: زيادة حجم (سُمك) النقاط بشكل ملحوظ لتصبح أكثر وضوحاً
    color: "#FFFFFF", 
    shape: "circle",
    backgroundColor: "transparent",
  });

  return (
    // 👈 تم التعديل هنا: رفع مستوى الشفافية إلى 45% (بدلاً من 20%) لتكون الخريطة بارزة
    <div className="absolute inset-0 flex items-center justify-center opacity-45 pointer-events-none select-none overflow-hidden mix-blend-screen">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="w-[250%] md:w-[150%] lg:w-[120%] h-auto object-cover max-w-none"
        alt="خريطة العالم"
        draggable={false}
      />
      {/* 👈 تم التعديل هنا: توسيع دائرة الشفافية في التدرج اللوني (transparent_20%) حتى لا يغطي الأخضر على النقاط في المنتصف */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#1F5D3A_100%)]" />
    </div>
  );
}