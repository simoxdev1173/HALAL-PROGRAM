"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

/* ---------- TYPES ---------- */
type MapPoint = {
  x: number;
  y: number;
  data?: {
    type?: "gov" | "private";
    id?: string;
  };
};

type Line = {
  start: MapPoint;
  end: MapPoint;
};

/* ---------- DATA ---------- */
const ARAB_BBOXES: [number, number, number, number][] = [
  [34.5, 16.3, 55.7, 32.2],
  [51.5, 22.6, 56.4, 26.1],
  [50.3, 25.7, 50.8, 26.3],
  [52.0, 16.6, 59.9, 26.4],
  [50.7, 24.5, 51.7, 26.2],
  [46.5, 28.5, 48.5, 30.1],
  [42.5, 12.5, 54.0, 19.0],
  [24.7, 22.0, 36.9, 31.7],
  [34.2, 31.2, 35.6, 32.6],
  [34.9, 29.2, 39.3, 33.4],
  [35.7, 32.3, 42.4, 37.3],
  [35.1, 33.0, 36.7, 34.7],
  [38.8, 29.1, 48.6, 37.4],
  [-17.1, 21.4, -1.0, 36.0],
  [-8.7, 19.0, 12.0, 37.1],
  [7.5, 30.2, 11.6, 37.4],
  [9.3, 19.5, 25.2, 33.2],
  [21.8, 8.6, 38.6, 22.2],
  [-17.1, 14.6, -4.8, 27.3],
  [40.9, -1.7, 51.5, 12.0],
  [41.7, 10.9, 43.5, 12.7],
  [-17.1, 21.3, -8.7, 27.7],
];

function isInArabRegion(lat: number, lng: number): boolean {
  return ARAB_BBOXES.some(
    ([lngMin, latMin, lngMax, latMax]) =>
      lng >= lngMin && lng <= lngMax && lat >= latMin && lat <= latMax
  );
}

function reverseProjectMercator(
  x: number,
  y: number,
  maxX: number,
  maxY: number
) {
  const lng = (x / maxX) * 360 - 180;
  const mercatorY = Math.PI * (1 - (2 * y) / maxY);
  const lat = (Math.atan(Math.sinh(mercatorY)) * 180) / Math.PI;
  return { lat, lng };
}

const ARAB_GOV_PARTIES = [
  { id: "SAU", lat: 24.7136, lng: 46.6753 },
  { id: "ARE", lat: 25.2048, lng: 55.2708 },
  { id: "BHR", lat: 26.0667, lng: 50.5577 },
  { id: "OMN", lat: 23.5859, lng: 58.4059 },
  { id: "QAT", lat: 25.3548, lng: 51.1839 },
  { id: "KWT", lat: 29.3759, lng: 47.9774 },
  { id: "YEM", lat: 15.3694, lng: 44.191 },
  { id: "EGY", lat: 30.0444, lng: 31.2357 },
  { id: "PSE", lat: 31.9522, lng: 35.2332 },
  { id: "JOR", lat: 31.9454, lng: 35.9284 },
  { id: "SYR", lat: 33.5138, lng: 36.2765 },
  { id: "LBN", lat: 33.8938, lng: 35.5018 },
  { id: "IRQ", lat: 33.3152, lng: 44.3661 },
  { id: "MAR", lat: 34.0209, lng: -6.8416 },
  { id: "DZA", lat: 36.7525, lng: 3.042 },
  { id: "TUN", lat: 36.8065, lng: 10.1815 },
  { id: "LBY", lat: 32.8872, lng: 13.1913 },
  { id: "SDN", lat: 15.5007, lng: 32.5599 },
  { id: "MRT", lat: 18.0735, lng: -15.9582 },
  { id: "SOM", lat: 2.0469, lng: 45.3182 },
  { id: "DJI", lat: 11.5721, lng: 43.1456 },
];

const PRIVATE_PARTNERS = [
  { id: "UK-P", lat: 51.5074, lng: -0.1278 },
  { id: "BRA-P", lat: -23.5505, lng: -46.6333 },
  { id: "JPN-P", lat: 35.6762, lng: 139.6503 },
  { id: "SGP-P", lat: 1.3521, lng: 103.8198 },
];

/* ---------- COMPONENT ---------- */
export function WorldMap() {
  const { points, lines, viewBox, maxXVal, maxYVal } = useMemo(() => {
    const map = new DottedMap({ height: 65, grid: "diagonal" });

    ARAB_GOV_PARTIES.forEach((gov) => {
      map.addPin({
        lat: gov.lat,
        lng: gov.lng,
        data: { type: "gov", id: gov.id },
        svgOptions: { color: "#C29C41", radius: 0.5 },
      });
    });

    PRIVATE_PARTNERS.forEach((p) => {
      map.addPin({
        lat: p.lat,
        lng: p.lng,
        data: { type: "private", id: p.id },
        svgOptions: { color: "#94a3b8", radius: 0.4 },
      });
    });

    const allPoints = map.getPoints() as MapPoint[];

    const connections = [
      { start: "SAU", end: "UK-P" },
      { start: "ARE", end: "SGP-P" },
      { start: "MAR", end: "BRA-P" },
      { start: "EGY", end: "JPN-P" },
    ];

    const mappedLines: Line[] = connections
      .map((conn) => {
        const start = allPoints.find((p) => p.data?.id === conn.start);
        const end = allPoints.find((p) => p.data?.id === conn.end);
        if (!start || !end) return null;
        return { start, end };
      })
      .filter((l): l is Line => l !== null);

    const maxX = Math.max(...allPoints.map((p) => p.x)) + 2;
    const maxY = Math.max(...allPoints.map((p) => p.y)) + 2;

    return {
      points: allPoints,
      lines: mappedLines,
      viewBox: `0 0 ${maxX} ${maxY}`,
      maxXVal: maxX,
      maxYVal: maxY,
    };
  }, []);

  return (
    <div className="w-full aspect-[2/1] relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-inner">
      <svg viewBox={viewBox} className="w-full h-full p-4">
        <defs>
          <filter id="goldGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {points.map((point, i) => {
            const isGov = point.data?.type === "gov";
            const isPrivate = point.data?.type === "private";

            if (isGov) {
              return (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={0.55}
                  fill="#115B48"
                  filter="url(#goldGlow)"
                />
              );
            }

            if (isPrivate) {
              return (
                <circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r={0.4}
                  fill="#94a3b8"
                />
              );
            }

            const { lat, lng } = reverseProjectMercator(
              point.x,
              point.y,
              maxXVal,
              maxYVal
            );

            const inArab = isInArabRegion(lat, lng);

            return (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={inArab ? 0.32 : 0.18}
                fill={inArab ? "#115B48" : "#1e293b"}
                opacity={inArab ? 0.9 : 0.45}
              />
            );
          })}
        </g>

        {lines.map((line, i) => {
          const midX = (line.start.x + line.end.x) / 2;
          const midY = Math.min(line.start.y, line.end.y) - 12;

          const path = `M ${line.start.x} ${line.start.y} Q ${midX} ${midY} ${line.end.x} ${line.end.y}`;

          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke="#115B48"
                strokeWidth="0.12"
                opacity={0.15}
              />
              <motion.path
                d={path}
                fill="none"
                stroke="#115B48"
                strokeWidth="0.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.4 },
                  opacity: { duration: 0.5, delay: i * 0.4 },
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-white text-right py-16 px-6 md:px-12 flex flex-col items-center gap-10"
      dir="rtl"
    >
      <header className="max-w-4xl mt-5 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6"
        >
          البرنامج العربي{" "}
          <span className="text-emerald-700 font-extrabold underline underline-offset-8 decoration-emerald-100">
            للحلال
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 leading-relaxed"
        >
          منظومة اعتراف متعدد الأطراف تربط{" "}
          <strong className="font-bold text-slate-900">
            جهات التعيين الحكومية العربية
          </strong>{" "}
          بمعايير{" "}
          <strong className="font-bold text-slate-900">
            دولية معتمدة
          </strong>{" "}
          — لضمان مصداقية شهادات الحلال وحماية المستهلك المسلم في كل
          الأسواق، من الدول العربية إلى كل دول العالم.
        </motion.p>
      </header>

      <div className="w-full max-w-6xl relative">
        <WorldMap />
      </div>
    </div>
  );
};

export default Hero;