
const draw = (existingShapes: any, canvasRef: any) => {
    existingShapes.forEach((e: any) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        ctx.strokeStyle = 'black'
        ctx.strokeRect(e.x, e.y, e.width, e.height)
    })
}
export const handleMousedown = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!startPoint || !canvas || !ctx) return;

    if (chooseShapes == "rectangle") {
        const rectangle = canvas.getBoundingClientRect()
        setStartPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
        console.log("hi")
    }
    if (chooseShapes == "circle") {

    }
}
export const handleMousemove = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any, existingShapes: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!startPoint || !canvas || !ctx) return;
    if (chooseShapes == "rectangle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = 'black'
        ctx.strokeRect(startPoint.x, startPoint.y, width, height)
    }
    if (chooseShapes == "circle") {

    }
    draw(existingShapes, canvasRef)
}
export const handleMouseup = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any, setexistingShapes: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!startPoint || !canvas || !ctx) return;
    if (chooseShapes == "rectangle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { x: startPoint.x, y: startPoint.y, width, height }])
        setStartPoint(null)
    }
    if (chooseShapes == "circle") {

    }
}



    // canvas.addEventListener("mousedown", (e)=>handleMousedown(e,canvasRef,startPoint,setStartPoint,chooseShapes))
    // canvas.addEventListener("mouseup", (e)=>handleMouseup(e,canvasRef,startPoint,setStartPoint,chooseShapes,setexistingShapes))
    // canvas.addEventListener("mousemove", (e)=>handleMousemove(e,canvasRef,startPoint,setStartPoint,chooseShapes,existingShapes))

    // return () => {
    // canvas.removeEventListener("mousedown", (e)=>handleMousedown(e,canvasRef,startPoint,setStartPoint,chooseShapes))
    // canvas.removeEventListener("mouseup", (e)=>handleMouseup(e,canvasRef,startPoint,setStartPoint,chooseShapes,setexistingShapes))
    // canvas.removeEventListener("mousemove", (e)=>handleMousemove(e,canvasRef,startPoint,setStartPoint,chooseShapes,existingShapes))