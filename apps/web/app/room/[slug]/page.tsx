"use client"
import { handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
// import { handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import React, { useEffect, useRef, useState } from 'react'
import { GoCircle } from 'react-icons/go';
import { MdOutlineRectangle } from 'react-icons/md';
type Shape = { type: "Rectangle"|"Circle"|"Line",x: number, y: number, width: number, height: number }
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
  // const drawPreviousShapes = () => {
  //   existingShapes.forEach((e) => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas?.getContext('2d');
  //     if (!canvas || !ctx) return;
  //     ctx.strokeStyle = 'black'
  //     ctx.strokeRect(e.x, e.y, e.width, e.height)
  //   })
  // }
  // const drawRect = (e: MouseEvent, startPoint: { x: number; y: number }, canvas: HTMLCanvasElement) => {
  //   const rectangle = canvas.getBoundingClientRect()
  //   const ctx = canvas?.getContext('2d');
  //   if (!ctx) return;

  //   const x = e.clientX - rectangle.left
  //   const y = e.clientY - rectangle.top
  //   const width = x - startPoint.x
  //   const height = y - startPoint.y
  //   ctx.clearRect(0, 0, canvas.width, canvas.height)
  //   ctx.strokeStyle = 'black'
  //   ctx.strokeRect(startPoint.x, startPoint.y, width, height)
  // }
  // const handleMousedown = (e: MouseEvent) => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const rectangle = canvas.getBoundingClientRect()
  //   setStartPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
  // }
  // const handleMousemove = (e: MouseEvent) => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   if (!startPoint) return;
  //   if (chooseShapes == "rectangle") {
  //     drawRect(e, startPoint, canvas)
  //   }
  //   drawPreviousShapes()
  // }
  // const handleMouseup = (e: MouseEvent) => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   if (!startPoint) return;
  //   if (chooseShapes == "rectangle") {
  //     const rectangle = canvas.getBoundingClientRect()
  //     const x = e.clientX - rectangle.left
  //     const y = e.clientY - rectangle.top
  //     const width = x - startPoint.x
  //     const height = y - startPoint.y
  //     setexistingShapes((prev) => [...prev, { x: startPoint.x, y: startPoint.y, width, height }])
  //   }
  //   setStartPoint(null)
  // }

  const chooseRectangle = () => {
    setchooseShapes("Rectangle")
  }
  console.log(chooseShapes)
  const chooseCircle = () => {
    setchooseShapes("Circle")
  }
  const chooseLine = () => {
    setchooseShapes("Line")
  }
  const chooseTriangle = () => {
    setchooseShapes("Triangle")
  }
  const chooseArrow = () => {
    setchooseShapes("Arrow")
  }

  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-green-400 rounded-md justify-center p-1">
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseRectangle}>Rectangle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseCircle}>Circle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseLine}>Line</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseTriangle}>Triangle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseArrow}>Arrow</div>
      </div>
      <canvas
        id="myCanvas"
        className='bg-red-100 rounded-lg'
        height={800}
        width={1600}
        ref={canvasRef}
        onMouseDown={(e) => handleMousedown(e.nativeEvent,canvasRef,startPoint,setStartPoint,chooseShapes,setchooseShapes,existingShapes,setexistingShapes)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent,canvasRef,startPoint,setStartPoint,chooseShapes,setchooseShapes,existingShapes,setexistingShapes,endPoint,setendPoint)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent,canvasRef,startPoint,setStartPoint,chooseShapes,setchooseShapes,existingShapes,setexistingShapes)}>
      </canvas>
    </div>
  )
}

export default Room