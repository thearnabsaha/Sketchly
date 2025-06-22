"use client"
import React, { useEffect, useRef } from 'react'
const Room = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Example: Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 150, 100);
    }, [])
    
  return (
    <div className='flex justify-center'>
      <canvas id="myCanvas" className='bg-red-100 w-[1200px] h-[800px] rounded-lg'ref={canvasRef}></canvas>
    </div>
  )
}

export default Room