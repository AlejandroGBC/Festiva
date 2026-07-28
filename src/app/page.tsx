'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const DURACION_TOTAL_MS = 4400
const DURACION_FADE_MS  = 700

type Orbe = {
  w: number; h: number; c: string; d: string; rev: boolean
  t?: string; b?: string; r?: string; l?: string
}

export default function Home() {
  const router   = useRouter()
  const [saliendo, setSaliendo] = useState(false)
  const [montado,  setMontado]  = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMontado(true))
    const timer = setTimeout(() => salir(), DURACION_TOTAL_MS)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function salir() {
    setSaliendo(true)
    setTimeout(() => router.push('/auth/login'), DURACION_FADE_MS)
  }

  const orbes: Orbe[] = [
    { w:420, h:420, t:'-100px', r:'-100px', c:'rgba(123,63,228,0.13)', d:'7s',  rev:false },
    { w:360, h:360, b:'-80px',  l:'-80px',  c:'rgba(255,77,141,0.11)', d:'9s',  rev:true  },
    { w:200, h:200, t:'15%',    l:'5%',     c:'rgba(255,156,46,0.07)', d:'8s',  rev:false },
  ]

  return (
    <>
      <style>{`
        @keyframes pathPop {
          0%   { opacity: 0; transform: scale(0.4) rotate(-8deg); }
          65%  { opacity: 1; transform: scale(1.12) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .f-path {
          opacity: 0;
          transform-origin: center;
          animation: pathPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f-word { opacity: 0; animation: wordIn 0.5s ease forwards; }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0);    opacity: 0.35; }
          50%       { transform: translateY(-9px); opacity: 1;    }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-16px) scale(1.05); }
        }
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f-letter { display: inline-block; opacity: 0; animation: letterIn 0.4s ease forwards; }
        @keyframes lineExpand {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .f-line { transform-origin: center; animation: lineExpand 0.6s ease forwards; }
      `}</style>

      <div
        onClick={salir}
        style={{
          minHeight: '100dvh', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#fff', cursor: 'pointer',
          overflow: 'hidden', position: 'relative',
          opacity:   saliendo ? 0 : 1,
          transform: saliendo ? 'scale(1.05)' : 'scale(1)',
          transition: `opacity ${DURACION_FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
                       transform ${DURACION_FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
      >

        {/* ══ Orbes ══ */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: montado ? 1 : 0, transition: 'opacity 1.4s ease 0.2s',
        }}>
          {orbes.map((o, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${o.w}px`, height: `${o.h}px`,
              top: o.t, bottom: o.b, right: o.r, left: o.l,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
              filter: 'blur(24px)',
              animation: `orbFloat ${o.d} ease-in-out infinite ${o.rev ? 'reverse' : ''}`,
            }}/>
          ))}
          {/* Orbe teal centrado */}
          <div style={{
            position: 'absolute', width: '260px', height: '260px',
            top: '52%', left: '50%', transform: 'translate(-50%,-50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,196,182,0.08) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'orbFloat 11s ease-in-out infinite',
          }}/>
        </div>

        {/* ══ Contenido centrado ══ */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
          width: '100%', maxWidth: '420px',
        }}>

          {/* ── Isotipo ── */}
          <div style={{
            opacity:   montado ? 1 : 0,
            transform: montado ? 'scale(1) translateY(0)' : 'scale(0.65) translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.34,1.56,0.64,1), transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
            display: 'flex', justifyContent: 'center',
          }}>
            <svg width="140" height="140" viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg" aria-label="Isotipo Festiva">
              <path className="f-path" style={{ animationDelay: '180ms' }} fill="#7B3FE4"
                d="M161.72,274.36s-18.29-29.26-14-80A59.8,59.8,0,0,1,152,176.7c5.64-13.75,18.51-38.24,41.07-46.53,0,0,18.56-10.32,66.88-19.43l107.38-23.4s15.66-3.4,32.23-6c0,0,8-1.26,12.08,3.42,0,0,11.38,9,3.79,35-5.69,19.54-11.38,28.34-13.87,31.51-.75.95-1,1.58-2.1,2.95-2.64,3.26-9.1,13-33.46,26.17-.8.44-3.28,1.68-4.18,2.09-2,.91-8.43,4.2-45.11,12.91,0,0-28.08,6.41-50.56,11.06l-18.69,3.36-12,2.38s-8.69,1.57-25.07,8.2a88.16,88.16,0,0,0-20.74,11.86c-3.44,2.64-7.45,5.94-11.71,9.88,0,0-2,.49-11.34,15.92a41,41,0,0,0-3.62,10.3A48.34,48.34,0,0,1,161.72,274.36Z"/>
              <path className="f-path" style={{ animationDelay: '270ms' }} fill="#FF4D8D"
                d="M164.89,406.79a145.66,145.66,0,0,1-7.16-26.9c-2-13.47-2.75-29.22-2.75-29.22s-.95-6.45,0-37.94c0,0,3.6-30.36,26-47.62,0,0,13.47-12.53,52.37-21.06l122-25.74s18.31-3.86,22.39,8.38c0,0,6.17,14.42,0,34.81,0,0-1,7.08-13.79,28.21S329.24,320,329.24,320s2.44.35-29.82,9.08c0,0,10.47-1.49-58.69,11.51,0,0-12.71,2.28-25.32,5.88s-27.23,13.66-27.23,13.66a70,70,0,0,0-15.27,18.5A153.8,153.8,0,0,0,167.59,394,72.45,72.45,0,0,0,164.89,406.79Z"/>
              <path className="f-path" style={{ animationDelay: '360ms' }} fill="#FF9C2E"
                d="M175.26,422c.72-4.27,4.82-25.13,19.57-37.25a95.11,95.11,0,0,1,10.51-8.14,45.82,45.82,0,0,1,9.22-4.78c4.49-1.72,12.31-4.51,24-8a63.43,63.43,0,0,1,8.65-1.69,2.81,2.81,0,0,1,3.05,1.8c.8,2.13,1.7,5.09,2.84,17a164.52,164.52,0,0,1-.85,40.7c-3.23,21.06-21,35.67-21,35.67S217.35,471,203.57,470.37c-10.86-.48-17.73-8.3-21.9-16.69-1.25-2.51-5-11.42-5.91-15.91A51.07,51.07,0,0,1,175.26,422Z"/>
              <polygon className="f-path" style={{ animationDelay: '440ms' }} fill="#FF4D8D"
                points="120.68 279.25 94.5 306.66 68.91 279.13 95.16 251.45 120.68 279.25"/>
              <path className="f-path" style={{ animationDelay: '510ms' }} fill="#7B3FE4"
                d="M315.94,433s15.3-2.43,17.1-17.63a2.49,2.49,0,0,1,2.53-2.17c3.66.07,10.54,1,13,6.9,2.61,6.24-4.65,16.47-8.21,20.94a18.3,18.3,0,0,1-5.74,4.8,30.63,30.63,0,0,1-8.78,3,7.72,7.72,0,0,1-6.45-1.71,13.1,13.1,0,0,1-3.45-4.92C314.38,438.45,313.28,433.71,315.94,433Z"/>
              <path className="f-path" style={{ animationDelay: '570ms' }} fill="#2EC4B6"
                d="M218.58,60.46s10.44-3.15,15.25-6.9a26.88,26.88,0,0,0,9-11.77l1.62-4,1.67-4.86,1.65,4.78,2,4.75s3,6.84,7.35,10.08a36.71,36.71,0,0,0,10.3,5.7l6.27,2.22-5.33,1.86s-7.49,2.64-11.54,6.31a27.8,27.8,0,0,0-6.91,9.54l-1,2.25-1.2,3.06-1.25,3.6-.3.91-.35-1.08-1.28-3.67s-1.58-4.09-2.42-5.72a25.06,25.06,0,0,0-8.31-10.23,39.19,39.19,0,0,0-9.4-4.81l-3.55-1.28Z"/>
            </svg>
          </div>

          {/* ── Wordmark ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', width: '100%',
            marginTop: '16px',
            opacity:   montado ? 1 : 0,
            transform: montado ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
          }}>
            <svg viewBox="364 169 624 192" xmlns="http://www.w3.org/2000/svg"
              aria-label="Festiva"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}>
              <path className="f-word" style={{ animationDelay: '600ms' }} fill="#261E4E" d="M462.63,230.3H413.35v31.59h41.19q5.73,0,8.55,2.57a8.83,8.83,0,0,1,2.83,6.86,8.66,8.66,0,0,1-2.87,6.83c-1.91,1.68-4.75,2.53-8.51,2.53H413.35v40.69q0,7.74-3.5,11.5a12.68,12.68,0,0,1-18-.05q-3.49-3.78-3.49-11.45v-95a20.81,20.81,0,0,1,1.6-8.81,9.91,9.91,0,0,1,5-5,21.21,21.21,0,0,1,8.72-1.55h59q6,0,8.89,2.65a9.87,9.87,0,0,1,0,14Q468.61,230.3,462.63,230.3Z"/>
              <path className="f-word" style={{ animationDelay: '640ms' }} fill="#261E4E" d="M549.06,295.5h-45a30.46,30.46,0,0,0,3.16,13.82,21.17,21.17,0,0,0,19.42,12.05,27.82,27.82,0,0,0,7.54-1,24.72,24.72,0,0,0,6.61-3,50.67,50.67,0,0,0,5.9-4.42q2.68-2.35,7-6.4a7.54,7.54,0,0,1,5-1.52,8.34,8.34,0,0,1,5.73,1.94,6.93,6.93,0,0,1,2.19,5.48,14.94,14.94,0,0,1-2.44,7.28,29.1,29.1,0,0,1-7.37,8,42.34,42.34,0,0,1-12.39,6.36,53.45,53.45,0,0,1-17.14,2.52q-22.16,0-34.46-12.63t-12.3-34.29a57,57,0,0,1,3-18.91,41.74,41.74,0,0,1,8.84-15,38.5,38.5,0,0,1,14.32-9.56,51.43,51.43,0,0,1,18.87-3.33q13.49,0,23.13,5.69a37.4,37.4,0,0,1,14.45,14.7,38.67,38.67,0,0,1,4.8,18.37q0,8.67-5,11.24T549.06,295.5Zm-45-13.05h41.7q-.84-11.81-6.36-17.65t-14.53-5.86a18.39,18.39,0,0,0-14.11,5.94Q505.26,270.82,504.08,282.45Z"/>
              <path className="f-word" style={{ animationDelay: '680ms' }} fill="#261E4E" d="M661.45,306.54a28.18,28.18,0,0,1-4.64,16.3q-4.63,6.78-13.69,10.28t-22,3.49q-12.37,0-21.23-3.79t-13.05-9.47q-4.21-5.69-4.22-11.42a8.84,8.84,0,0,1,2.7-6.49,9.27,9.27,0,0,1,6.82-2.69,8,8,0,0,1,5.56,1.77,19.34,19.34,0,0,1,3.71,5,25.16,25.16,0,0,0,8.47,9.18q4.92,3,13.43,3,6.91,0,11.34-3.07c2.94-2.05,4.42-4.4,4.42-7q0-6.06-4.59-8.84t-15.12-5.31A125,125,0,0,1,600,291.25a31.82,31.82,0,0,1-11.92-8.55,19.58,19.58,0,0,1-4.46-13.06,23.06,23.06,0,0,1,4.12-13.06,28.26,28.26,0,0,1,12.18-9.81q8-3.68,19.42-3.67a63.49,63.49,0,0,1,16,1.86,39.75,39.75,0,0,1,11.88,5,24.73,24.73,0,0,1,7.25,6.9,13.58,13.58,0,0,1,2.48,7.42,8.57,8.57,0,0,1-2.65,6.49q-2.66,2.52-7.54,2.52a9.2,9.2,0,0,1-6-2,39.65,39.65,0,0,1-5.69-6.06,20.77,20.77,0,0,0-6.15-5.4c-2.36-1.34-5.56-2-9.6-2A18.9,18.9,0,0,0,609,260.41q-4.12,2.65-4.12,6.62a7.18,7.18,0,0,0,3,5.94A25.18,25.18,0,0,0,616,276.8q5.13,1.51,14.15,3.71a75.82,75.82,0,0,1,17.48,6.23A29.18,29.18,0,0,1,658,295.29,19,19,0,0,1,661.45,306.54Z"/>
              <path className="f-word" style={{ animationDelay: '720ms' }} fill="#261E4E" d="M682.17,245.12h2.53V231.31c0-3.71.1-6.61.29-8.72a12.85,12.85,0,0,1,1.65-5.43,10.34,10.34,0,0,1,3.87-3.84,11,11,0,0,1,5.65-1.47,11.36,11.36,0,0,1,7.92,3.28,9.82,9.82,0,0,1,3,5.35,48.83,48.83,0,0,1,.63,9v15.66h8.42c3.26,0,5.74.78,7.46,2.32a7.66,7.66,0,0,1,2.57,5.94q0,4.64-3.67,6.49T712,261.72H707.7V304a67.11,67.11,0,0,0,.38,8.3,8.4,8.4,0,0,0,2,4.72c1.09,1.21,2.88,1.81,5.35,1.81a28.36,28.36,0,0,0,5.47-.72,29,29,0,0,1,5.4-.71,6.92,6.92,0,0,1,5,2.23,7.49,7.49,0,0,1,2.23,5.52q0,5.55-6.06,8.51t-17.44,2.94q-10.78,0-16.35-3.62a16.79,16.79,0,0,1-7.28-10q-1.74-6.41-1.73-17.11V261.72h-3c-3.32,0-5.85-.78-7.59-2.36a7.7,7.7,0,0,1-2.61-6,7.43,7.43,0,0,1,2.74-5.94C676,245.9,678.69,245.12,682.17,245.12Z"/>
              <path className="f-word" style={{ animationDelay: '760ms' }} fill="#261E4E" d="M765,256.16v66.47q0,6.92-3.28,10.45a10.87,10.87,0,0,1-8.34,3.53,10.39,10.39,0,0,1-8.22-3.62Q742,329.38,742,322.63v-65.8q0-6.81,3.15-10.27a10.61,10.61,0,0,1,8.22-3.46,11,11,0,0,1,8.34,3.46Q765,250,765,256.16Z"/>
              <path className="f-word" style={{ animationDelay: '800ms' }} fill="#FF4D8D" d="M805,257.42l18.62,52.24,20-54.51q2.36-6.57,4.63-9.31c1.52-1.82,3.82-2.74,6.91-2.74a10.41,10.41,0,0,1,7.46,3,9.23,9.23,0,0,1,3.07,6.83,13.49,13.49,0,0,1-.55,3.53,31.17,31.17,0,0,1-1.26,3.79c-.48,1.18-1,2.53-1.64,4.05L840.21,319q-.91,2.36-2.4,6a30.82,30.82,0,0,1-3.28,6.19,12.94,12.94,0,0,1-4.47,4,13.32,13.32,0,0,1-6.44,1.43,12.43,12.43,0,0,1-7.79-2.23,15.09,15.09,0,0,1-4.3-4.88q-1.39-2.65-4.68-10.49L785,264.84q-.76-2-1.56-4a36.73,36.73,0,0,1-1.35-4.12,15,15,0,0,1-.54-3.63,8.74,8.74,0,0,1,1.43-4.67,11,11,0,0,1,4-3.79,10.69,10.69,0,0,1,5.47-1.48q5.73,0,7.88,3.29A52.39,52.39,0,0,1,805,257.42Z"/>
              <path className="f-word" style={{ animationDelay: '840ms' }} fill="#261E4E" d="M938.11,323.64A70.87,70.87,0,0,1,922,333.37a45.11,45.11,0,0,1-17.48,3.24A33.15,33.15,0,0,1,889,333.12a25.56,25.56,0,0,1-10.32-9.48,24.54,24.54,0,0,1-3.62-13,23.2,23.2,0,0,1,6-16.09q6-6.66,16.43-8.93,2.19-.51,10.86-2.28t14.87-3.24q6.2-1.47,13.44-3.58-.42-9.1-3.66-13.35t-13.44-4.26q-8.76,0-13.19,2.44a21.58,21.58,0,0,0-7.58,7.33,77,77,0,0,1-4.46,6.45q-1.31,1.56-5.6,1.56a9.78,9.78,0,0,1-6.7-2.49,8.11,8.11,0,0,1-2.82-6.36,19.47,19.47,0,0,1,4.29-11.79q4.3-5.73,13.4-9.44t22.66-3.71q15.16,0,23.84,3.58a22.21,22.21,0,0,1,12.26,11.34q3.57,7.74,3.58,20.55,0,8.09,0,13.73T959,304.69a46.34,46.34,0,0,0,2.15,13.52q2.15,7,2.15,9.05a8.48,8.48,0,0,1-3.33,6.45,11.13,11.13,0,0,1-7.54,2.9q-3.54,0-7-3.32A49.12,49.12,0,0,1,938.11,323.64Zm-1.52-33.28a114,114,0,0,1-14.7,3.92q-9.64,2.07-13.35,3a18.19,18.19,0,0,0-7.08,3.8,9.69,9.69,0,0,0-3.37,7.87,11.65,11.65,0,0,0,4,8.89,14.65,14.65,0,0,0,10.36,3.66,26.91,26.91,0,0,0,12.6-3,19.93,19.93,0,0,0,8.46-7.7q3.12-5.23,3.12-17.19Z"/>
              <path className="f-word" style={{ animationDelay: '880ms' }} fill="#FF9C2E" d="M756.34,195.84l2.83,8.71a3,3,0,0,0,2.86,2.08h9.17a3,3,0,0,1,1.76,5.44l-7.41,5.38a3,3,0,0,0-1.09,3.36l2.83,8.72a3,3,0,0,1-4.62,3.36l-7.42-5.39a3,3,0,0,0-3.53,0l-7.42,5.39a3,3,0,0,1-4.62-3.36l2.83-8.72a3,3,0,0,0-1.09-3.36L734,212.07a3,3,0,0,1,1.77-5.44h9.17a3,3,0,0,0,2.85-2.08l2.84-8.71A3,3,0,0,1,756.34,195.84Z"/>
            </svg>
          </div>

          {/* ── Slogan letra por letra ── */}
          <div style={{
            marginTop: '20px',
            opacity:   montado ? 1 : 0,
            transition: 'opacity 0.4s ease 0.9s',
          }}>
            <p style={{
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '4px', textTransform: 'uppercase',
              color: 'rgba(38,30,78,0.38)', margin: 0,
            }}>
              {'Celebra cada momento'.split('').map((char, i) => (
                <span key={i} className="f-letter"
                  style={{ animationDelay: `${900 + i * 38}ms` }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </p>
          </div>

          {/* ── Separador ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginTop: '20px',
            opacity:   montado ? 1 : 0,
            transition: 'opacity 0.5s ease 1.8s',
          }}>
            <div className="f-line" style={{
              width: '40px', height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(123,63,228,0.3))',
              animationDelay: '1800ms',
            }}/>

          </div>

          {/* ── Loader animado ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            marginTop: '32px',
            opacity:   montado ? 1 : 0,
            transition: 'opacity 0.5s ease 2s',
          }}>
            {[
              { color: '#7B3FE4', delay: '0ms'   },
              { color: '#FF4D8D', delay: '180ms' },
              { color: '#2EC4B6', delay: '360ms' },
            ].map((dot, i) => (
              <span key={i} style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: dot.color,
                display: 'inline-block',
                animation: 'dotBounce 1.1s ease-in-out infinite',
                animationDelay: dot.delay,
              }}/>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}