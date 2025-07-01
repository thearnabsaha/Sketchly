"use client"
import { drawPreviousShapes, handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
type Shape = { type: "Rectangle" | "Circle" | "Line" | "Triangle" | "Arrow" | "Rhombus" | "Pencil" | "Eraser", x: number, y: number, width: number, height: number, points?: { x: number; y: number }[],color:string }
import { BACKEND_URL } from "@/lib/config"
import { ArrowRight, Circle, Diamond, Eraser, LineChart, Pencil, RectangleHorizontal, Slash, Triangle } from 'lucide-react';
import { BlueColor, darkColor7, darkColor8, GoldColor, GreenColor, RedColor, TealColor, VioletColor } from '@/lib/actions/colors';
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
  const [shape, setShape] = useState<Shape>()
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [chooseColors, setChooseColors] = useState(darkColor8)
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
    const token = localStorage.getItem("token")
    const roomId = localStorage.getItem("roomId")
    axios.get(`${BACKEND_URL}/shape/${roomId}`, { headers: { Authorization: token } })
      .then((e) => {
        setexistingShapes(e.data.allshapes)
        drawPreviousShapes(e.data.allshapes, canvasRef)
      })
      .catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    const token = localStorage.getItem("token")
    // console.log(shape)
    console.log("from page : ", existingShapes)
    if (chooseShapes !== "Eraser") {
      axios.post(`${BACKEND_URL}/shape`,
        {
          type: shape?.type,
          width: shape?.width,
          height: shape?.height,
          color: shape?.color,
          pencilPoints: shape?.points,
          x: shape?.x,
          y: shape?.y
        },
        { headers: { Authorization: token } })
        .then()
        .catch((e) => console.log(e))
    }
    if (chooseShapes === "Eraser") {
      axios.post(`${BACKEND_URL}/shape/delete`,
        {
          type: shape?.type,
          width: shape?.width,
          height: shape?.height,
          pencilPoints: shape?.points,
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
  console.log(chooseColors)
  const chooseColor2 = () => {
    setChooseColors(BlueColor)
  }
  const chooseColor3 = () => {
    setChooseColors(VioletColor)
  }
  const chooseColor4 = () => {
    setChooseColors(GreenColor)
  }
  const chooseColor5 = () => {
    setChooseColors(GoldColor)
  }
  const chooseColor6 = () => {
    setChooseColors(TealColor)
  }
  const chooseColor1 = () => {
    setChooseColors(RedColor)
  }
  const chooseColor7 = () => {
    setChooseColors(darkColor7)
  }
  const chooseColor8 = () => {
    setChooseColors(darkColor8)
  }

  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-accent rounded-md justify-center p-1">
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseRectangle}><RectangleHorizontal /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseCircle}><Circle /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseLine}><Slash /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseTriangle}><Triangle /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseArrow}><ArrowRight /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseRhombus}><Diamond /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={choosePencil}><Pencil /></div>
        <div className='p-3 rounded-md bg-foreground text-background m-1' onClick={chooseEraser}><Eraser /></div>
      </div>
      <div className=" absolute text-center flex mt-5 bg-accent rounded-md justify-center p-1 left-10 top-50">
        <div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:RedColor}} onClick={chooseColor1}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:BlueColor}} onClick={chooseColor2}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:VioletColor}} onClick={chooseColor3}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:GreenColor}} onClick={chooseColor4}></div>
        </div>
        <div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:GoldColor}} onClick={chooseColor5}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:TealColor}} onClick={chooseColor6}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:darkColor7}} onClick={chooseColor7}></div>
          <div className='p-3 rounded-md text-background m-1 size-5'style={{backgroundColor:darkColor8}} onClick={chooseColor8}></div>
        </div>


      </div>
      <canvas
        id="myCanvas"
        className="bg-background"
        height={dimensions.height}
        width={dimensions.width}
        ref={canvasRef}
        onMouseDown={(e) => handleMousedown(e.nativeEvent, canvasRef, setStartPoint, chooseShapes, setPencilPoints)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent, canvasRef, startPoint, chooseShapes, existingShapes, setendPoint, pencilPoints, setexistingShapes, setShape,chooseColors)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent, canvasRef, startPoint, setStartPoint, chooseShapes, setexistingShapes, setPencilPoints, pencilPoints, setShape, existingShapes,chooseColors)}>
      </canvas>
    </div>
  )
}

export default Room