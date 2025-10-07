import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

interface SlideData {
  slideNumber: number;
  content: string;
  explanation: string;
  audioUrl: string;
}

interface QuestionResponse {
  question: string;
  answer: string;
}

export const useLectureSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideData | null>(null);
  const [questionResponse, setQuestionResponse] = useState<QuestionResponse | null>(null);
  const [isLectureEnded, setIsLectureEnded] = useState(false);

  useEffect(() => {
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('Connected to lecture server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from lecture server');
      setIsConnected(false);
    });

    newSocket.on('lecture:slide', (data: SlideData) => {
      console.log('Received new slide:', data);
      setCurrentSlide(data);
      setQuestionResponse(null);
    });

    newSocket.on('lecture:question', (data: QuestionResponse) => {
      console.log('Received question response:', data);
      setQuestionResponse(data);
    });

    newSocket.on('lecture:end', () => {
      console.log('Lecture ended');
      setIsLectureEnded(true);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const requestNextSlide = () => {
    if (socket) {
      socket.emit('lecture:next');
    }
  };

  const askQuestion = (question: string) => {
    if (socket) {
      socket.emit('lecture:ask', { question });
    }
  };

  return {
    socket,
    isConnected,
    currentSlide,
    questionResponse,
    isLectureEnded,
    requestNextSlide,
    askQuestion,
  };
};
