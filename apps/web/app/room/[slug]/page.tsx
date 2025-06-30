"use client"
import { handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
type Shape = { type: "Rectangle" | "Circle" | "Line" | "Triangle" | "Arrow" | "Rhombus" | "Pencil", x: number, y: number, width: number, height: number, points?: { x: number; y: number }[]; }
import { BACKEND_URL } from "@/lib/config"
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
  const [shape, setShape] = useState<Shape>()
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token")
    const roomId = localStorage.getItem("roomId")
    axios.get(`${BACKEND_URL}/shape/${roomId}`,{ headers: { Authorization: token } })
    .then((e) => {
      setexistingShapes(e.data.allshapes)
    })
    .catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.post(`${BACKEND_URL}/shape`,
      {
        type: shape?.type,
        width: shape?.width,
        height: shape?.height,
        pencilPoints:shape?.points,
        x: shape?.x,
        y: shape?.y
      },
      { headers: { Authorization: token } })
      .then()
      .catch((e) => console.log(e))
  }, [existingShapes])
  const chooseRectangle = () => {
    setchooseShapes("Rectangle")
  }
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
  const choosePencil = () => {
    setchooseShapes("Pencil")
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
        <div className='p-3 rounded-md bg-orange-300 m-1' onClick={choosePencil}>Pencil</div>
      </div>
      <canvas
        id="myCanvas"
        className='bg-red-100 rounded-lg'
        height={800}
        width={1600}
        ref={canvasRef}
        onMouseDown={(e) => handleMousedown(e.nativeEvent, canvasRef, setStartPoint, chooseShapes, setPencilPoints)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent, canvasRef, startPoint, chooseShapes, existingShapes, setendPoint, pencilPoints)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent, canvasRef, startPoint, setStartPoint, chooseShapes, setexistingShapes, setPencilPoints, pencilPoints,setShape)}>
      </canvas>
    </div>
  )
}

export default Room