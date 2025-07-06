"use client"
import { drawPreviousShapes, handleMousedown, handleMousemove, handleMouseup } from '@/lib/actions/actions';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
type Shape = { type: "Rectangle" | "Circle" | "Line" | "Triangle" | "Arrow" | "Rhombus" | "Pencil" | "Eraser" | "Text", x: number, y: number, width: number, height: number, points?: { x: number; y: number }[], color: string }
import { BACKEND_URL } from "@/lib/config"
import { ArrowRight, Circle, Diamond, Eraser, Heading, Pencil, RectangleHorizontal, Redo, Slash, Triangle, Undo } from 'lucide-react';
import { BlueColor, GreyColor, PeachColor, GoldColor, GreenColor, RedColor, TealColor, VioletColor } from '@/lib/actions/colors';
import { Button } from '@workspace/ui/components/button';
const Room = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [endPoint, setendPoint] = useState<{ x: number, y: number } | null>(null)
  const [chooseShapes, setchooseShapes] = useState("Rectangle")
  const [existingShapes, setexistingShapes] = useState<Shape[]>([])
  const [shape, setShape] = useState<Shape>()
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [chooseColors, setChooseColors] = useState(PeachColor)
  const [cursorType, setcursorType] = useState("crosshair")
  const [undoStack, setUndoStack] = useState<Shape[][]>([]);
  const [redoStack, setRedoStack] = useState<Shape[][]>([]);
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

  const clearCanvas = () => {
    const token = localStorage.getItem("token")
    const roomId = localStorage.getItem("roomId")
    axios.delete(`${BACKEND_URL}/shape/room/${roomId}`,
      { headers: { Authorization: token } })
      .then((e) => {
        console.log(e)
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setexistingShapes([])
      })
      .catch((e) => console.log(e))
  }
  const chooseRectangle = () => {
    setchooseShapes("Rectangle")
    setcursorType('crosshair')
  }
  const chooseCircle = () => {
    setcursorType('crosshair')
    setchooseShapes("Circle")
  }
  const chooseLine = () => {
    setcursorType('crosshair')
    setchooseShapes("Line")
  }
  const chooseTriangle = () => {
    setcursorType('crosshair')
    setchooseShapes("Triangle")
  }
  const chooseArrow = () => {
    setcursorType('crosshair')
    setchooseShapes("Arrow")
  }
  const chooseRhombus = () => {
    setchooseShapes("Rhombus")
    setcursorType('crosshair')
  }
  const chooseText = () => {
    setchooseShapes("Text")
    setcursorType('text')
  }
  const choosePencil = () => {
    setcursorType('crosshair')
    setchooseShapes("Pencil")
  }
  const chooseEraser = () => {
    setcursorType('url("/eraser.svg"),auto')
    setchooseShapes("Eraser")
  }
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
    setChooseColors(GreyColor)
  }
  const chooseColor8 = () => {
    setChooseColors(PeachColor)
  }
  const handleUndo = () => {
  //   if (undoStack.length === 0) return;
  //   const lastState = undoStack[undoStack.length - 1];
  //   setUndoStack(prev => prev.slice(0, prev.length - 1));
  //   setRedoStack(prev => [...prev, existingShapes]);
  //   setexistingShapes(lastState ?? []);
  //   drawPreviousShapes(lastState ?? [], canvasRef);
  }
  const handleRedo = () => {
  //   if (redoStack.length === 0) return;
  //   const nextState = redoStack[redoStack.length - 1];
  //   setRedoStack(prev => prev.slice(0, prev.length - 1));
  //   setUndoStack(prev => [...prev, existingShapes]);
  //   setexistingShapes(nextState ?? []);
  //   drawPreviousShapes(nextState, canvasRef);
  }
  return (
    <div className='flex justify-center relative'>
      <div className=" absolute text-center flex mt-5 bg-accent rounded-md justify-center p-1">
        <Button className={`p-2 rounded-md text-background m-1 ${chooseShapes=="Rectangle"?"bg-foreground opacity-70":"bg-foreground"}`} onClick={chooseRectangle}><RectangleHorizontal /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Circle"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseCircle}><Circle /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Line"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseLine}><Slash /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Triangle"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseTriangle}><Triangle /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Arrow"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseArrow}><ArrowRight /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Rhombus"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseRhombus}><Diamond /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Text"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseText}><Heading /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Pencil"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={choosePencil}><Pencil /></Button>
        <Button className={`p-2 rounded-md ${chooseShapes=="Eraser"?"bg-foreground opacity-70":"bg-foreground"} text-background m-1`} onClick={chooseEraser}><Eraser /></Button>
      </div>
      <div className=" absolute text-center mt-5 bg-accent rounded-md justify-center p-1 left-10 top-50">
        <Button className='w-full' onClick={clearCanvas}>Clear</Button>
        <div className='flex'>
          <div className='my-2'>
            <Button onClick={handleUndo}><Undo /></Button>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==RedColor?"border-white":""}`} style={{ backgroundColor: RedColor }} onClick={chooseColor1}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==BlueColor?"border-white":""}`} style={{ backgroundColor: BlueColor }} onClick={chooseColor2}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==VioletColor?"border-white":""}`} style={{ backgroundColor: VioletColor }} onClick={chooseColor3}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==GreenColor?"border-white":""}`} style={{ backgroundColor: GreenColor }} onClick={chooseColor4}></div>
          </div>
          <div className='my-2'>
            <Button onClick={handleRedo}><Redo /></Button>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==GoldColor?"border-white":""}`} style={{ backgroundColor: GoldColor }} onClick={chooseColor5}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==TealColor?"border-white":""}`} style={{ backgroundColor: TealColor }} onClick={chooseColor6}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==GreyColor?"border-white":""}`} style={{ backgroundColor: GreyColor }} onClick={chooseColor7}></div>
            <div className={`p-5 rounded-md text-background m-1 size-5 border ${chooseColors==PeachColor?"border-white":""}`} style={{ backgroundColor: PeachColor }} onClick={chooseColor8}></div>
          </div>
        </div>
      </div>
      <canvas
        id="myCanvas"
        className="bg-background"
        height={dimensions.height}
        width={dimensions.width}
        ref={canvasRef}
        style={{ cursor: cursorType }}
        onMouseDown={(e) => handleMousedown(e.nativeEvent, canvasRef, setStartPoint, chooseShapes, setPencilPoints)}
        onMouseMove={(e) => handleMousemove(e.nativeEvent, canvasRef, startPoint, chooseShapes, existingShapes, setendPoint, pencilPoints, setexistingShapes, setShape, chooseColors)}
        onMouseUp={(e) => handleMouseup(e.nativeEvent, canvasRef, startPoint, setStartPoint, chooseShapes, setexistingShapes, setPencilPoints, pencilPoints, setShape, existingShapes, chooseColors)}>
      </canvas>
    </div>
  )
}

export default Room