"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Building2, 
  FileCheck2, 
  Search, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CTA_DATA = [
  {
    title: "جهات التعيين الحكومية",
    description: "البرنامج مفتوح للجهات الحكومية العربية المخوَّلة بتعيين جهات تقييم المطابقة في مجال الحلال. عند انضمامكم، تنضوي تلقائياً تحت مظلتكم جميع الجهات التي تعيِّنونها داخل دولتكم.",
    icon: Building2,
    linkText: "تقديم طلب انضمام",
    linkPath: "/join-program",
    tag: "جهات حكومية فقط",
    delay: 0.1,
    image: "/card-11.png"
  },
  {
    title: "الموردون والمنشآت",
    description: "للحصول على شهادة الحلال العربية، تتقدم للجهة المعيَّنة المعتمدة من جهة التعيين الحكومية في دولتك — لا تتقدم مباشرة للمنظمة. ابحث عن الجهة المعيَّنة المناسبة لمجال منتجك.",
    icon: FileCheck2,
    linkText: "ابحث عن جهة معيَّنة معتمدة",
    linkPath: "/certificate-verification",
    tag: "قطاع الأعمال",
    delay: 0.2,
    image: "/card-1.png"
  },
  {
    title: "التحقق من شهادة الحلال",
    description: "تحقق من صحة شهادات الحلال العربية وحالة اعتماد الشركات ومنتجاتها. أدخل رقم الترخيص الموجود على ملصق المنتج أو اسم الشركة.",
    icon: Search,
    linkText: "ابحث عن شركة أو منتج",
    linkPath: "/certificate-verification",
    tag: "خدمة عامة",
    secondary: true,
    delay: 0.3,
    image: "/card-3.png"
  }
];

const HERO_SLIDES = [
  {
    image: "/slider/i-1.jpeg",
    alt: "منتجات غذائية وسلاسل توريد",
  },
  {
    image: "/slider/i-2-2-2.jpeg",
    alt: "وثائق واعتماد رسمي",
  },
  {
    image: "/slider/i-1.png",
    alt: "تجارة وأسواق عالمية",
  },
];

const HERO_SLIDE_DURATION = 6800;
const HERO_TRANSITION_DURATION = 1.45;

type Vector2Like = { set: (x: number, y: number) => void };
type MutableUniform<T> = { value: T };
type TextureLike = {
  image: { width: number; height: number };
  userData: { size: Vector2Like };
  minFilter: unknown;
  magFilter: unknown;
};
type ShaderMaterialLike = {
  uniforms: {
    uTexture1: MutableUniform<TextureLike | null>;
    uTexture2: MutableUniform<TextureLike | null>;
    uProgress: MutableUniform<number>;
    uResolution: MutableUniform<Vector2Like>;
    uTexture1Size: MutableUniform<Vector2Like>;
    uTexture2Size: MutableUniform<Vector2Like>;
    [key: string]: MutableUniform<unknown>;
  };
};
type RendererLike = {
  setSize: (width: number, height: number) => void;
  setPixelRatio: (ratio: number) => void;
  render: (scene: unknown, camera: unknown) => void;
};
type ThreeNamespace = {
  Scene: new () => { add: (object: unknown) => void };
  OrthographicCamera: new (...args: number[]) => unknown;
  WebGLRenderer: new (options: { canvas: HTMLCanvasElement; antialias: boolean; alpha: boolean }) => RendererLike;
  ShaderMaterial: new (options: Record<string, unknown>) => ShaderMaterialLike;
  Mesh: new (...args: unknown[]) => unknown;
  PlaneGeometry: new (...args: number[]) => unknown;
  TextureLoader: new () => { load: (src: string, onLoad: (texture: TextureLike) => void) => void };
  Vector2: new (x: number, y: number) => Vector2Like;
  LinearFilter: unknown;
};
type GsapNamespace = {
  killTweensOf: (target: unknown) => void;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => void;
};
type WebGLWindow = Window & typeof globalThis & {
  THREE?: ThreeNamespace;
  gsap?: GsapNamespace;
};

/* ---------- ACTION CARDS COMPONENT ---------- */
export function ActionCards() {
  return (
    <section className="py-24 relative z-10 bg-[#FAF9F6] overflow-hidden" dir="rtl">
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-14 border-b border-stone-200 pb-6 shadow-[0_1px_0_rgba(255,255,255,1)]">
          <div className="w-3 h-8 bg-[#CA8A04] rounded-sm shadow-[var(--shadow-ind-sharp)]"></div>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">خدمات المنظومة</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CTA_DATA.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              className={`group relative flex flex-col rounded-xl overflow-hidden cursor-pointer ${
                card.secondary 
                  ? "bg-stone-800 shadow-[var(--shadow-ind-floating)] border border-stone-700" 
                  : "bg-white ind-card border border-white/50"
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden ind-recessed rounded-none border-b border-stone-200/20">
                <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute top-4 right-1/2 translate-x-1/2 flex gap-1.5 z-20">
                  <div className="h-1.5 w-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
                  <div className="h-1.5 w-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
                </div>

                <div className="absolute bottom-4 right-6 z-20">
                  <span className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white rounded shadow-[var(--shadow-ind-sharp)] border ${
                    card.secondary ? "bg-stone-700 border-[#CA8A04]/50 text-[#CA8A04]" : "bg-[#007A55] border-[#007A55]/80"
                  }`}>
                    {card.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ind-recessed transition-all duration-300 ${
                    card.secondary ? "bg-stone-900 text-[#CA8A04] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]" : "bg-stone-50 text-[#007A55] group-hover:bg-[#007A55] group-hover:text-white group-hover:shadow-[var(--shadow-ind-floating)]"
                  }`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className={`text-xl font-black ${card.secondary ? "text-white" : "text-stone-800"}`}>{card.title}</h3>
                </div>
                
                <p className={`text-sm leading-relaxed mb-8 flex-grow font-medium ${
                  card.secondary ? "text-stone-400" : "text-stone-600"
                }`}>
                  {card.description}
                </p>

                <Link to={card.linkPath} className={`flex items-center gap-3 font-bold text-sm mt-auto w-fit group/btn transition-colors cursor-pointer uppercase tracking-wider ${
                  card.secondary ? "text-stone-300 hover:text-[#CA8A04]" : "text-stone-700 hover:text-[#007A55]"
                }`}>
                  {card.linkText}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-[var(--shadow-ind-sharp)] ${card.secondary ? "bg-stone-700" : "bg-white border border-stone-200"}`}>
                    <ArrowLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MAIN LAYOUT ---------- */
export const Hero = () => {
  const { t, i18n } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isWebGLReady, setIsWebGLReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const slideAlts = t("hero.slides", { returnObjects: true }) as { alt: string }[];
  const activeSlideRef = useRef(activeSlide);

  // --- WEBGL REFS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderMaterialRef = useRef<ShaderMaterialLike | null>(null);
  const texturesRef = useRef<TextureLike[]>([]);
  const isTransitioningRef = useRef(false);
  const rendererRef = useRef<RendererLike | null>(null);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  // --- 1. LOAD EXTERNAL SCRIPTS & INIT THREE.JS ---
  useEffect(() => {
    if (prefersReducedMotion) return; // Fallback handled by CSS if reduced motion

    const loadScripts = async () => {
      const webglWindow = window as WebGLWindow;
      const loadScript = (src: string, globalName: "gsap" | "THREE") => new Promise<void>((res, rej) => {
        if (webglWindow[globalName]) { res(); return; }
        if (document.querySelector(`script[src="${src}"]`)) {
          const check = setInterval(() => {
            if (webglWindow[globalName]) { clearInterval(check); res(); }
          }, 50);
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { setTimeout(() => res(), 100); };
        s.onerror = () => rej(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });
      
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', 'gsap');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'THREE');
        initWebGL();
      } catch (e) {
        console.error('Failed to load WebGL scripts:', e);
      }
    };

    const initWebGL = async () => {
      const THREE = (window as WebGLWindow).THREE;
      if (!canvasRef.current || !THREE) return;

      // Setup Scene
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false, alpha: false });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, canvasRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Shaders
      const vertexShader = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
      const fragmentShader = `
        uniform sampler2D uTexture1, uTexture2;
        uniform float uProgress;
        uniform vec2 uResolution, uTexture1Size, uTexture2Size;
        
        // Settings strictly mapped to the "Glass/Default" preset from 21 Dev
        uniform float uGlassRefractionStrength;
        uniform float uGlassChromaticAberration;
        uniform float uGlassBubbleClarity;
        uniform float uGlassEdgeGlow;
        uniform float uGlassLiquidFlow;
        uniform float uSpeedMultiplier;
        uniform float uDistortionStrength;
        uniform float uGlobalIntensity;

        varying vec2 vUv;

        vec2 getCoverUV(vec2 uv, vec2 textureSize) {
            vec2 s = uResolution / textureSize;
            float scale = max(s.x, s.y);
            vec2 scaledSize = textureSize * scale;
            vec2 offset = (uResolution - scaledSize) * 0.5;
            return (uv * uResolution - offset) / scaledSize;
        }

        vec4 glassEffect(vec2 uv, float progress) {
            float time = progress * 5.0 * uSpeedMultiplier;
            vec2 uv1 = getCoverUV(uv, uTexture1Size); vec2 uv2 = getCoverUV(uv, uTexture2Size);
            float maxR = length(uResolution) * 0.85; float br = progress * maxR;
            vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
            float d = length(p - c); float nd = d / max(br, 0.001);
            float param = smoothstep(br + 3.0, br - 3.0, d);
            vec4 img;
            
            if (param > 0.0) {
                 float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
                 vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
                 vec2 distUV = uv2 - dir * ro;
                 distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
                 float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
                 img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
                 
                 if (uGlassEdgeGlow > 0.0) {
                    float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
                    img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
                 }
            } else { img = texture2D(uTexture2, uv2); }
            
            vec4 oldImg = texture2D(uTexture1, uv1);
            if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
            return mix(oldImg, img, param);
        }

        void main() {
            gl_FragColor = glassEffect(vUv, uProgress);
        }
      `;

      shaderMaterialRef.current = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null }, 
          uTexture2: { value: null }, 
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, canvasRef.current.clientHeight) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) }, 
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uGlobalIntensity: { value: 1.0 }, 
          uSpeedMultiplier: { value: 1.0 }, 
          uDistortionStrength: { value: 1.0 }, 
          uGlassRefractionStrength: { value: 1.0 }, 
          uGlassChromaticAberration: { value: 1.0 }, 
          uGlassBubbleClarity: { value: 1.0 }, 
          uGlassEdgeGlow: { value: 1.0 }, 
          uGlassLiquidFlow: { value: 1.0 }
        },
        vertexShader, 
        fragmentShader
      });

      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterialRef.current));

      // Load all textures
      const loader = new THREE.TextureLoader();
      const loadedTextures = await Promise.all(
        HERO_SLIDES.map((slide) => new Promise<TextureLike>((resolve) => {
          loader.load(slide.image, (t) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
            resolve(t);
          });
        }))
      );
      
      texturesRef.current = loadedTextures;

      // Set initial textures to the latest selected slide. This handles clicks made
      // while the external WebGL scripts/textures are still loading after refresh.
      if (loadedTextures.length > 0) {
        const initialTexture = loadedTextures[activeSlideRef.current] ?? loadedTextures[0];
        shaderMaterialRef.current.uniforms.uTexture1.value = initialTexture;
        shaderMaterialRef.current.uniforms.uTexture1Size.value = initialTexture.userData.size;
        setIsWebGLReady(true);
      }

      // Render loop
      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      };
      render();

      // Handle Resize
      const handleResize = () => {
        if (!canvasRef.current || !shaderMaterialRef.current) return;
        renderer.setSize(window.innerWidth, canvasRef.current.clientHeight);
        shaderMaterialRef.current.uniforms.uResolution.value.set(window.innerWidth, canvasRef.current.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    };

    loadScripts();
  }, [prefersReducedMotion]);

  // --- 2. HANDLE TRANSITIONS WHEN activeSlide CHANGES ---
  useEffect(() => {
    if (prefersReducedMotion || !shaderMaterialRef.current || texturesRef.current.length === 0) return;
    
    const gsap = (window as WebGLWindow).gsap;
    const material = shaderMaterialRef.current;
    const targetTexture = texturesRef.current[activeSlide];

    // Prevent re-triggering if already on target and no transition is active.
    if (material.uniforms.uTexture1.value === targetTexture && material.uniforms.uProgress.value === 0) return;

    isTransitioningRef.current = true;
    
    // Kill any ongoing transition immediately
    if (gsap) gsap.killTweensOf(material.uniforms.uProgress);

    material.uniforms.uTexture2.value = targetTexture;
    material.uniforms.uTexture2Size.value = targetTexture.userData.size;

    if (gsap) {
      gsap.fromTo(material.uniforms.uProgress, 
        { value: 0 },
        {
          value: 1,
          duration: HERO_TRANSITION_DURATION,
          ease: "power2.inOut",
          onComplete: () => {
            if (activeSlideRef.current !== activeSlide) return;
            material.uniforms.uTexture1.value = targetTexture;
            material.uniforms.uTexture1Size.value = targetTexture.userData.size;
            material.uniforms.uProgress.value = 0;
            isTransitioningRef.current = false;
          }
        }
      );
    } else {
      material.uniforms.uTexture1.value = targetTexture;
      material.uniforms.uTexture1Size.value = targetTexture.userData.size;
      material.uniforms.uProgress.value = 0;
      isTransitioningRef.current = false;
    }
  }, [activeSlide, prefersReducedMotion]);

  // --- 3. AUTO SLIDER TIMER ---
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  // Navigation logic stays responsive even while a transition is running.
  const goToSlide = (index: number) => {
    if (activeSlide !== index) setActiveSlide(index);
  };
  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? HERO_SLIDES.length - 1 : current - 1));
  };
  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="w-full bg-slate-50 transition-[direction] duration-300" dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative w-full h-[690px] lg:h-[760px] xl:h-[840px] flex items-center overflow-hidden bg-slate-950">
        
        {/* --- WEBGL BACKGROUND --- */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          {/* Static fallback if reduced motion is preferred or while loading */}
          {prefersReducedMotion ? (
             <img 
               src={HERO_SLIDES[activeSlide].image} 
               alt={slideAlts[activeSlide]?.alt ?? ""}
               className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
             />
          ) : (
            <>
              <img
                src={HERO_SLIDES[activeSlide].image}
                alt={slideAlts[activeSlide]?.alt ?? ""}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
              />
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${isWebGLReady ? "opacity-100" : "opacity-0"}`}
              ></canvas>
            </>
          )}

          {/* Overlays to ensure text remains highly readable */}
          <motion.div
            key={`wash-${activeSlide}`}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_42%,rgba(0,122,85,0.42),transparent_32%),linear-gradient(90deg,rgba(3,7,18,0.26),rgba(3,7,18,0.72)_52%,rgba(3,7,18,0.95))] pointer-events-none"
          />
          <div className="absolute inset-0 z-10 bg-slate-950/20 mix-blend-multiply pointer-events-none"></div>
          <div
            className="absolute inset-0 z-10 opacity-[0.09] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
        </div>

        {/* --- UI CONTROLS --- */}
        <button
          onClick={goToPrevious}
          aria-label={t("hero.prev")}
          className={`absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-950/30 text-white backdrop-blur-md hover:border-[#CA8A04] hover:bg-slate-950/50 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 sm:h-12 sm:w-12 transition-colors ${isRtl ? "right-3 xl:right-8" : "left-3 xl:left-8"}`}
        >
          {isRtl ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>

        <button
          onClick={goToNext}
          aria-label={t("hero.next")}
          className={`absolute top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-950/30 text-white backdrop-blur-md hover:border-[#CA8A04] hover:bg-slate-950/50 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 sm:h-12 sm:w-12 transition-colors ${isRtl ? "left-3 xl:left-8" : "right-3 xl:right-8"}`}
        >
          {isRtl ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>

        {/* --- TEXT CONTENT & THUMBNAILS --- */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 text-white">
          <motion.div 
            key={`content-${activeSlide}`} // Re-triggers text animation on slide change
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 drop-shadow-[0_16px_40px_rgba(0,0,0,.45)]">
              {t("hero.titlePrefix")} <span className="text-[#CA8A04]">{t("hero.titleHighlight")}</span>
            </h1>
            
            <p className={`text-base md:text-lg xl:text-xl text-slate-100 leading-relaxed font-medium max-w-2xl border-[#CA8A04] bg-gradient-to-l from-white/10 to-transparent py-3 backdrop-blur-[2px] ${isRtl ? "border-r-4 pr-5" : "border-l-4 pl-5"}`}>
              {t("hero.description")}
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-8 xl:mt-12 flex flex-col md:flex-row items-start gap-4 xl:gap-6">
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <span className="text-[#CA8A04] text-xs xl:text-sm font-semibold tracking-wide px-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04] "></span>
                  {t("hero.governmentNote")}
                </span>
                
                <Link to="/join-program" className="btn-primary w-full md:w-auto h-[54px] xl:h-[60px] text-sm xl:text-base group">
                  {t("hero.joinCta")}
                  <div className="w-6 h-6 rounded-sm bg-black/20 flex items-center justify-center">
                    <ArrowLeft size={16} className={`group-hover:text-[#CA8A04] transition-colors ${isRtl ? "" : "rotate-180"}`} />
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-auto md:mt-[22px] xl:mt-[26px]">
                <Link to="/certificate-verification" className="btn-gold w-full md:w-auto h-[54px] xl:h-[60px] text-sm xl:text-base group !bg-slate-900/40  !border-2 !border-[#CA8A04] !text-white ">
                  {t("hero.licenseCta")}
                  <div className="w-6 h-6 rounded-sm bg-black/30 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
                    <ArrowLeft size={16} className={`text-[#CA8A04] transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`} />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 max-w-3xl"
          >
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <button
                    key={slide.image}
                    onClick={() => goToSlide(index)}
                    className={`group relative h-16 lg:h-20 overflow-hidden rounded-xl border cursor-pointer transition-colors focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 ${isRtl ? "text-right" : "text-left"} ${
                      isActive ? "border-[#CA8A04] bg-white/15" : "border-white/15 bg-white/5 hover:border-white/35"
                    }`}
                    aria-label={t("hero.showSlide", { number: index + 1 })}
                  >
                    <img
                      src={slide.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
                    <div className="absolute bottom-0 right-0 left-0 p-3">
                      <div className="h-1 overflow-hidden rounded-full bg-white/20">
                        {isActive && (
                          <motion.div
                            key={`progress-${activeSlide}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: HERO_SLIDE_DURATION / 1000, ease: "linear" }}
                            className="h-full rounded-full bg-[#CA8A04]"
                          />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Industrial Styling */}
      <section className="relative z-10 py-20 lg:py-32 px-6 overflow-hidden bg-[#FAF9F6] border-y border-stone-300 shadow-[var(--shadow-ind-card)]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            
            <div className={`flex flex-col items-start ${isRtl ? "text-right" : "text-left"}`}>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 xl:mb-8 tracking-tight text-stone-800 leading-tight">
                {t("hero.introTitleBefore")}{" "}
                <span className="text-[#007A55] drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                  {t("hero.introTitleHighlight")}
                </span>{" "}
                {t("hero.introTitleAfter")}
              </h1>

              <div className="p-6 xl:p-8 rounded-xl shadow-[var(--shadow-ind-card)] border border-stone-200 relative">
                <p className="text-base lg:text-lg text-justify leading-relaxed text-stone-600 font-medium">
                  {t("hero.introText")}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-3 lg:p-4 bg-white rounded-2xl shadow-[var(--shadow-ind-floating)] border border-stone-200"
            >
              <div className="relative z-10 rounded-xl overflow-hidden ind-recessed shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
                <img src="/sous-hero.png" alt="Editorial Visual" className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
