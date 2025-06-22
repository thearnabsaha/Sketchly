"use client"
import React, { useEffect, useRef, useState } from 'react'
import { GoCircle } from 'react-icons/go';
import { MdOutlineRectangle } from 'react-icons/md';
type Rectangle = { x: number, y: number, width: number, height: number }
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("rectangle")
  const [existingShapes, setexistingShapes] = useState<Rectangle[]>([])
  const draw=()=>{
      existingShapes.forEach((e) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      ctx.strokeStyle = 'black'
      ctx.strokeRect(e.x, e.y, e.width, e.height)
    })
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const handleMousedown = (e: MouseEvent) => {
      const rectangle = canvas.getBoundingClientRect()
      setStartPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
    }
    const handleMousemove = (e: MouseEvent) => {
      if (!startPoint) return;
      if(chooseShapes=="rectangle"){
      const rectangle = canvas.getBoundingClientRect()
      const x = e.clientX - rectangle.left
      const y = e.clientY - rectangle.top
      const width = x - startPoint.x
      const height = y - startPoint.y
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'black'
      ctx.strokeRect(startPoint.x, startPoint.y, width, height)
      }
      draw()
    }
    const handleMouseup = (e: MouseEvent) => {
      if (!startPoint) return;
      const rectangle = canvas.getBoundingClientRect()
      const x = e.clientX - rectangle.left
      const y = e.clientY - rectangle.top
      const width = x - startPoint.x
      const height = y - startPoint.y
      setexistingShapes((prev) => [...prev, { x:startPoint.x, y:startPoint.y, width, height }])
      setStartPoint(null)
    }
    canvas.addEventListener("mousedown", handleMousedown)
    canvas.addEventListener("mouseup", handleMouseup)
    canvas.addEventListener("mousemove", handleMousemove)

    return () => {
      canvas.removeEventListener("mousedown", handleMousedown)
      canvas.removeEventListener("mouseup", handleMouseup)
      canvas.removeEventListener("mousemove", handleMousemove)
    }
  }, [startPoint,existingShapes])
  const chooseRectangle=()=>{
    setchooseShapes("rectangle")
  }
  const chooseCircle=()=>{
    setchooseShapes("circle")
  }

  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-green-400 rounded-md w-72 justify-center py-1">
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseRectangle}><MdOutlineRectangle size={20}/></div>
        <div className='p-3 rounded-md bg-orange-300 m-1'onClick={chooseCircle}><GoCircle size={20}/></div>
        <div className='p-3 rounded-md bg-orange-300 m-1'><MdOutlineRectangle size={20}/></div>
      </div>
      <canvas id="myCanvas" className='bg-red-100 rounded-lg' height={800} width={1600} ref={canvasRef}>
      </canvas>
    </div>
  )
}

export default Room