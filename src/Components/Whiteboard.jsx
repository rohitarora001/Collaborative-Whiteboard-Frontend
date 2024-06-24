// src/components/Whiteboard.js

import React, { useRef, useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../Context/SocketContext';

const Whiteboard = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const canvasRef = useRef(null);
    const offScreenCanvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState(null);
    const [offScreenContext, setOffScreenContext] = useState(null);
    const [color, setColor] = useState('#000000');
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [shape, setShape] = useState('freehand'); // Default to freehand drawing

    useEffect(() => {
        const getDrawing = async () => {
            try {
                const response = await axiosInstance.get(`/get-room/${searchParams.get('id')}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching drawing:', error);
                navigate('/'); // Navigate back to home if error fetching drawing
            }
        };

        const initializeCanvas = async () => {
            const res = await getDrawing();
            const canvas = canvasRef.current;
            const offScreenCanvas = offScreenCanvasRef.current;
            
            if (!canvas || !offScreenCanvas) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';

            offScreenCanvas.width = window.innerWidth;
            offScreenCanvas.height = window.innerHeight;
            const offCtx = offScreenCanvas.getContext('2d');
            offCtx.lineWidth = 5;
            offCtx.lineCap = 'round';

            const image = new Image();
            image.onload = () => {
                if (ctx && offCtx) {
                    ctx.drawImage(image, 0, 0); // Draw image on visible canvas
                    offCtx.drawImage(image, 0, 0); // Draw image on off-screen canvas
                } else {
                    console.error('Canvas contexts are not properly initialized.');
                }
            };

            image.onerror = () => {
                console.error('Failed to load image.');
            };

            image.src = res.data;

            setContext(ctx);
            setOffScreenContext(offCtx);
        };

        initializeCanvas();

        const handleResize = () => {
            if (!offScreenContext || !context) return;

            const imageData = offScreenContext.getImageData(0, 0, offScreenCanvasRef.current.width, offScreenCanvasRef.current.height);
            offScreenCanvasRef.current.width = window.innerWidth;
            offScreenCanvasRef.current.height = window.innerHeight;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            offScreenContext.putImageData(imageData, 0, 0);
            context.putImageData(imageData, 0, 0);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchParams, navigate, offScreenContext, context]);

    const startDrawing = (e) => {
        if (!context || !offScreenContext) return;

        setIsDrawing(true);
        context.strokeStyle = color;
        context.fillStyle = color;
        offScreenContext.strokeStyle = color;
        offScreenContext.fillStyle = color;
        setStartX(e.nativeEvent.offsetX);
        setStartY(e.nativeEvent.offsetY);
        if (shape === 'freehand') {
            context.beginPath();
            context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            offScreenContext.beginPath();
            offScreenContext.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
    };

    const draw = (e) => {
        if (!isDrawing || !context || !offScreenContext) return;

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        if (shape === 'freehand') {
            context.lineTo(x, y);
            context.stroke();
            offScreenContext.lineTo(x, y);
            offScreenContext.stroke();
        } else {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.drawImage(offScreenCanvasRef.current, 0, 0);

            const width = x - startX;
            const height = y - startY;

            if (shape === 'rectangle') {
                context.strokeRect(startX, startY, width, height);
            } else if (shape === 'circle') {
                const radius = Math.sqrt(width * width + height * height);
                context.beginPath();
                context.arc(startX, startY, radius, 0, Math.PI * 2);
                context.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (shape !== 'freehand' && offScreenContext && context) {
            offScreenContext.drawImage(canvasRef.current, 0, 0);
        }
    };

    const clearCanvas = () => {
        if (context && offScreenContext) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            offScreenContext.clearRect(0, 0, offScreenCanvasRef.current.width, offScreenCanvasRef.current.height);
        }
    };

    const saveDrawing = async () => {
        if (!socket || !offScreenCanvasRef.current) {
            console.error('Socket or off-screen canvas is not available.');
            return;
        }

        try {
            const imageData = offScreenCanvasRef.current.toDataURL(); // Convert canvas to base64 data URL
            socket.emit('drawing', { roomId: searchParams.get('id'), drawing: imageData });
            console.log(imageData);
        } catch (error) {
            console.error('Error saving drawing:', error);
        }
    };

    useEffect(() => {
        if (socket) {
            // Listen for messages from the server
            socket.emit('register', { roomId: searchParams.get('id'), personName: '' });
            socket.on('drawing', (data) => {
                if (!offScreenContext || !context) {
                    console.error('Canvas contexts are not properly initialized.');
                    return;
                }

                // Log the data received
                console.log('Received drawing data:', data);

                const image = new Image();
                image.onload = () => {
                    offScreenContext.clearRect(0, 0, offScreenCanvasRef.current.width, offScreenCanvasRef.current.height);
                    offScreenContext.drawImage(image, 0, 0);
                    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    context.drawImage(offScreenCanvasRef.current, 0, 0);
                };

                image.onerror = () => {
                    console.error('Failed to load image.');
                };

                // Ensure the data URL is properly formatted
                if (data && data.startsWith('data:image/')) {
                    image.src = data;
                } else {
                    console.error('Invalid image data received.');
                }
            });
        }

        return () => {
            if (socket) {
                socket.off('drawing');
            }
        };
    }, [socket, searchParams, context, offScreenContext]);

    useEffect(() => {
        if (!isDrawing) saveDrawing();
    }, [isDrawing]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                className="w-screen h-screen border border-black cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
            <canvas ref={offScreenCanvasRef} className="hidden" />
            <div className="fixed top-4 left-4 flex gap-4 bg-white bg-opacity-80 p-4 rounded-lg">
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="border rounded"
                />
                <button onClick={clearCanvas} className="px-4 py-2 bg-green-500 text-white rounded">Clear</button>
                <select
                    onChange={(e) => setShape(e.target.value)}
                    value={shape}
                    className="border rounded px-2 py-1"
                >
                    <option value="freehand">Freehand</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                </select>
            </div>
        </div>
    );
};

export default Whiteboard;
