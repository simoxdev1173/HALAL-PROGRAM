import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type Point = { x: number; y: number };

type SignaturePadProps = {
  value: string;
  isRtl: boolean;
  onChange: (value: string | null) => void;
  error?: string;
};

export function signatureDataUrlToFile(dataUrl: string, fileName: string) {
  const [metadata, encoded] = dataUrl.split(",");
  const mimeType = metadata.match(/data:(.*?);base64/)?.[1] ?? "image/png";
  const binary = window.atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new File([bytes], fileName, { type: mimeType });
}

export function SignaturePad({ value, isRtl, onChange, error }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const previousPointRef = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderCanvas = () => {
      const width = canvas.getBoundingClientRect().width;
      if (!width) return;
      const height = 168;
      const ratio = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 2.15;
      context.strokeStyle = "#092F27";

      if (value.startsWith("data:image/")) {
        const image = new Image();
        image.onload = () => context.drawImage(image, 0, 0, width, height);
        image.src = value;
      }
    };

    renderCanvas();
    const observer = new ResizeObserver(renderCanvas);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [value]);

  const point = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    canvas.setPointerCapture(event.pointerId);
    const current = point(event);
    context.beginPath();
    context.moveTo(current.x, current.y);
    previousPointRef.current = current;
    drawingRef.current = true;
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    const previous = previousPointRef.current;
    if (!context || !previous) return;
    const current = point(event);
    const midpoint = { x: (previous.x + current.x) / 2, y: (previous.y + current.y) / 2 };
    context.quadraticCurveTo(previous.x, previous.y, midpoint.x, midpoint.y);
    context.stroke();
    previousPointRef.current = current;
  };

  const finishDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current) return;
    drawingRef.current = false;
    previousPointRef.current = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    onChange(canvas.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  const helperId = "electronic-signature-helper";

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <label htmlFor="electronic-signature-pad" className="block text-[13px] font-black tracking-[-0.01em] text-[#173C32]">
            {isRtl ? "التوقيع الإلكتروني" : "Electronic signature"}
          </label>
          <p id={helperId} className="mt-1 text-xs font-semibold leading-5 text-stone-500">
            {isRtl ? "وقّع داخل المساحة باستخدام الفأرة أو إصبعك. سيظهر التوقيع في النسخة المطبوعة." : "Sign using a mouse, stylus, or finger. Your signature will appear in the printable copy."}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={!value}
          className="shrink-0 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-black text-stone-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {isRtl ? "مسح التوقيع" : "Clear signature"}
        </button>
      </div>
      <div className={`relative overflow-hidden rounded-2xl border-2 bg-[#FFFEFB] shadow-[inset_0_1px_10px_rgba(15,55,43,.035)] transition-colors ${error ? "border-red-300" : value ? "border-[#007A55]/55" : "border-stone-200 hover:border-[#007A55]/35"}`}>
        <canvas
          ref={canvasRef}
          id="electronic-signature-pad"
          aria-describedby={helperId}
          className="block h-[168px] w-full touch-none cursor-crosshair"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={finishDrawing}
          onPointerCancel={finishDrawing}
        />
        {!value && (
          <span className={`pointer-events-none absolute inset-x-8 bottom-7 border-b border-dashed border-stone-300 pb-2 text-[11px] font-semibold tracking-[0.08em] text-stone-400 ${isRtl ? "text-right" : "text-left"}`}>
            {isRtl ? "التوقيع المعتمد" : "AUTHORIZED SIGNATURE"}
          </span>
        )}
      </div>
      {error && <p className="text-xs font-black text-red-600">{error}</p>}
    </div>
  );
}
