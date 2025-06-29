export const drawPreviousShapes = (existingShapes: any, canvasRef: any) => {
    existingShapes.forEach((e: any) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;
        ctx.strokeStyle = 'black'
        if (e.type == "Rectangle") {
            ctx.strokeRect(e.x, e.y, e.width, e.height)
        } else if (e.type == "Circle") {
            ctx.beginPath();
            ctx.ellipse(
                e.x + e.width / 2,
                e.y + e.height / 2,
                Math.abs(e.width) / 2,
                Math.abs(e.height) / 2,
                0,
                0,
                2 * Math.PI
            );
            ctx.stroke();
        } else if (e.type === "Line") {
            ctx.beginPath();
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(e.x + e.width, e.y + e.height);
            ctx.stroke();
        } else if (e.type === "Triangle") {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const midX = e.x + e.width / 2;

            ctx.beginPath();
            ctx.moveTo(midX, e.y);                   // Top
            ctx.lineTo(e.x, e.y + e.height);         // Bottom-left
            ctx.lineTo(e.x + e.width, e.y + e.height); // Bottom-right
            ctx.closePath();
            ctx.stroke();
        } else if (e.type === "Arrow") {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const endX = e.x + e.width;
            const endY = e.y + e.height;

            const headLength = 10;
            const dx = endX - e.x;
            const dy = endY - e.y;
            const angle = Math.atan2(dy, dx);

            ctx.beginPath();

            // Line
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(endX, endY);

            // Arrow head
            ctx.moveTo(endX, endY);
            ctx.lineTo(
                endX - headLength * Math.cos(angle - Math.PI / 6),
                endY - headLength * Math.sin(angle - Math.PI / 6)
            );
            ctx.moveTo(endX, endY);
            ctx.lineTo(
                endX - headLength * Math.cos(angle + Math.PI / 6),
                endY - headLength * Math.sin(angle + Math.PI / 6)
            );

            ctx.stroke();
        }
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
export const drawLine = (
    e: MouseEvent,
    startPoint: { x: number; y: number },
    canvas: HTMLCanvasElement
) => {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
};
export const drawCircle = (e: MouseEvent, startPoint: { x: number; y: number }, endPoint: { x: number; y: number }, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const x = Math.min(startPoint.x, endX);
    const y = Math.min(startPoint.y, endY);
    const width = Math.abs(endX - startPoint.x);
    const height = Math.abs(endY - startPoint.y);

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    ctx.beginPath();

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
};
export const drawTriangle = (
    e: MouseEvent,
    startPoint: { x: number; y: number },
    canvas: HTMLCanvasElement
) => {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const midX = (startPoint.x + endX) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(midX, startPoint.y);           // Top vertex
    ctx.lineTo(startPoint.x, endY);           // Bottom-left vertex
    ctx.lineTo(endX, endY);                   // Bottom-right vertex
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
};
export const drawArrow = (
    e: MouseEvent,
    startPoint: { x: number; y: number },
    canvas: HTMLCanvasElement
) => {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const headLength = 10; // length of the arrow head
    const dx = endX - startPoint.x;
    const dy = endY - startPoint.y;
    const angle = Math.atan2(dy, dx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // Line
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endX, endY);

    // Arrow head
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - headLength * Math.cos(angle - Math.PI / 6),
        endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - headLength * Math.cos(angle + Math.PI / 6),
        endY - headLength * Math.sin(angle + Math.PI / 6)
    );

    ctx.strokeStyle = 'black';
    ctx.stroke();
};
export const handleMousedown = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any, setchooseShapes: any, existingShapes: any, setexistingShapes: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rectangle = canvas.getBoundingClientRect()
    setStartPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
}
export const handleMousemove = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any, setchooseShapes: any, existingShapes: any, setexistingShapes: any, endPoint: any, setendPoint: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!startPoint) return;
    const rectangle = canvas.getBoundingClientRect()
    setendPoint({ x: e.clientX - rectangle.left, y: e.clientY - rectangle.top })
    if (chooseShapes == "Rectangle") {
        drawRect(e, startPoint, canvas)
    }
    if (chooseShapes == "Circle") {
        drawCircle(e, startPoint, endPoint, canvas)
    }
    if (chooseShapes === "Line") {
        drawLine(e, startPoint, canvas);
    }
    if (chooseShapes === "Triangle") {
        drawTriangle(e, startPoint, canvas);
    }
    if (chooseShapes === "Arrow") {
        drawArrow(e, startPoint, canvas);
    }
    drawPreviousShapes(existingShapes, canvasRef)
}
export const handleMouseup = (e: MouseEvent, canvasRef: any, startPoint: any, setStartPoint: any, chooseShapes: any, setchooseShapes: any, existingShapes: any, setexistingShapes: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!startPoint) return;
    if (chooseShapes == "Rectangle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { type: "Rectangle", x: startPoint.x, y: startPoint.y, width, height }])
    }
    if (chooseShapes == "Circle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { type: "Circle", x: startPoint.x, y: startPoint.y, width, height }])
    }
    if (chooseShapes == "Line") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { type: "Line", x: startPoint.x, y: startPoint.y, width, height }])
    }
    if (chooseShapes == "Triangle") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { type: "Triangle", x: startPoint.x, y: startPoint.y, width, height }])
    }
    if (chooseShapes == "Arrow") {
        const rectangle = canvas.getBoundingClientRect()
        const x = e.clientX - rectangle.left
        const y = e.clientY - rectangle.top
        const width = x - startPoint.x
        const height = y - startPoint.y
        setexistingShapes((prev: any) => [...prev, { type: "Arrow", x: startPoint.x, y: startPoint.y, width, height }])
    }

    setStartPoint(null)
}