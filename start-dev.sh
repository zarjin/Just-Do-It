#!/bin/bash

echo "Starting Just Do It Chat Application..."
echo ""

echo "Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Function to cleanup processes
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for processes
wait
