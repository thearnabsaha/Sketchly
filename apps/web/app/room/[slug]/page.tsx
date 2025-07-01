"use client"
import { drawPreviousShapes, handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
type Shape = { type: "Rectangle" | "Circle" | "Line" | "Triangle" | "Arrow" | "Rhombus" | "Pencil" | "Eraser", x: number, y: number, width: number, height: number, points?: { x: number; y: number }[]; }
import { BACKEND_URL } from "@/lib/config"
import { ArrowRight, Circle, Diamond, Eraser, LineChart, Pencil, RectangleHorizontal, Slash, Triangle } from 'lucide-react';
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
  const [shape, setShape] = useState<Shape>()
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({width:0,height:0})
  useEffect(() => {
    setDimensions({width:window.innerWidth,height:window.innerHeight})
    const token = localStorage.getItem("token")
    const roomId = localStorage.getItem("roomId")
    axios.get(`${BACKEND_URL}/shape/${roomId}`,{ headers: { Authorization: token } })
    .then((e) => {
      setexistingShapes(e.data.allshapes)
      drawPreviousShapes(e.data.allshapes, canvasRef)
    })
    .catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    const token = localStorage.getItem("token")
    // console.log(shape)
    console.log("from page : ",existingShapes)
    if(chooseShapes!=="Eraser"){
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
    }
    if(chooseShapes==="Eraser"){
      axios.post(`${BACKEND_URL}/shape/delete`,
        {
          type: shape?.type,
          width: shape?.width,
          height: shape?.height,
          pencilPoints:shape?.points,
          x: shape?.x,
          y: shape?.y
        },
        { headers: { Authorization: token } })
        .then((e) => console.log(e))
        .catch((e) => console.log(e))
    }
        // const token = localStorage.getItem("token")
    // const roomId = localStorage.getItem("roomId")
    // axios.get(`${BACKEND_URL}/shape/${roomId}`,{ headers: { Authorization: token } })
    // .then((e) => {
    //   setexistingShapes(e.data.allshapes)
    //   drawPreviousShapes(e.data.allshapes, canvasRef)
    // })
    // .catch((e) => console.log(e))
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
  const chooseEraser = () => {
    setchooseShapes("Eraser")
  }
  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-accent rounded-md justify-center p-1">
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseRectangle}><RectangleHorizontal/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseCircle}><Circle/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseLine}><Slash/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseTriangle}><Triangle/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseArrow}><ArrowRight/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseRhombus}><Diamond/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={choosePencil}><Pencil/></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseEraser}><Eraser/></div>
      </div>
      <div className=" absolute text-center flex mt-5 bg-accent rounded-md justify-center p-1 left-10 flex-col">
        <div className='p-3 rounded-md text-background m-1 size-5 bg-background' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-foreground' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-chart-1' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-chart-2' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-chart-3' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-chart-4' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-chart-5' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-ring' onClick={chooseRectangle}></div>
        <div className='p-3 rounded-md text-background m-1 size-5 bg-destructive' onClick={chooseRectangle}></div>
      </div>
      <canvas
        id="myCanvas"
        className="bg-background"
        height={dimensions.height}
        width={dimensions.width}
        ref={canvasRef}
        onMouseDown={(e) => handleMousedown(e.nativeEvent, canvasRef, setStartPoint, chooseShapes, setPencilPoints)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent, canvasRef, startPoint, chooseShapes, existingShapes, setendPoint, pencilPoints,setexistingShapes,setShape)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent, canvasRef, startPoint, setStartPoint, chooseShapes, setexistingShapes, setPencilPoints, pencilPoints,setShape,existingShapes)}>
      </canvas>
    </div>
  )
}

export default Room