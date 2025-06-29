"use client"
import { handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import React, { useEffect, useRef, useState } from 'react'
type Shape = { type: "Rectangle"|"Circle"|"Line",x: number, y: number, width: number, height: number }
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
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
  const chooseRhombus = () => {
    setchooseShapes("Rhombus")
  }

  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-green-400 rounded-md justify-center p-1">
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseRectangle}>Rectangle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseCircle}>Circle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseLine}>Line</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseTriangle}>Triangle</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseArrow}>Arrow</div>
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={chooseRhombus}>Rhombus</div>
      </div>
      <canvas
        id="myCanvas"
        className='bg-red-100 rounded-lg'
        height={800}
        width={1600}
        ref={canvasRef}
        onMouseDown={(e) => handleMousedown(e.nativeEvent,canvasRef,setStartPoint)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent,canvasRef,startPoint,chooseShapes,existingShapes,setendPoint)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent,canvasRef,startPoint,setStartPoint,chooseShapes,setexistingShapes)}>
      </canvas>
    </div>
  )
}

export default Room