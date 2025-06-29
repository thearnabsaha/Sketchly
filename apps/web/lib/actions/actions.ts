export const drawPreviousShapes = (existingShapes:any,canvasRef:any) => {
    existingShapes.forEach((e:any) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        ctx.strokeStyle = 'black'
        ctx.strokeRect(e.x, e.y, e.width, e.height)
    })
}
export const drawRect = (e: MouseEvent, startPoint: { x: number; y: number }, canvas: HTMLCanvasElement) => {
    const rectangle = canvas.getBoundingClientRect()
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const x = e.clientX - rectangle.left
    const y = e.clientY - rectangle.top
    const width = x - startPoint.x
    const height = y - startPoint.y
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(startPoint.x, startPoint.y, width, height)
}
export const handleMousedown = (e: MouseEvent,canvasRef:any,startPoint:any,setStartPoint:any,chooseShapes:any,setchooseShapes:any,existingShapes:any,setexistingShapes:any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rectangle = canvas.getBoundingClientRect()
    setStartPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
}
export const handleMousemove = (e: MouseEvent,canvasRef:any,startPoint:any,setStartPoint:any,chooseShapes:any,setchooseShapes:any,existingShapes:any,setexistingShapes:any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!startPoint) return;
    if (chooseShapes == "rectangle") {
        drawRect(e, startPoint, canvas)
    }
    drawPreviousShapes(existingShapes,canvasRef)
}
export const handleMouseup = (e: MouseEvent,canvasRef:any,startPoint:any,setStartPoint:any,chooseShapes:any,setchooseShapes:any,existingShapes:any,setexistingShapes:any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!startPoint) return;
    if (chooseShapes == "rectangle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev:any) => [...prev, { x: startPoint.x, y: startPoint.y, width, height }])
    }
    setStartPoint(null)
}