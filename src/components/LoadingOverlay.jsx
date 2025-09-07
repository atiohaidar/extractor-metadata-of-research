import React, { useState, useEffect } from 'react';
import { LOADING_STEPS } from '../utils/constants';

const LoadingOverlay = ({ isVisible, progress = 0 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setProgressWidth(0);
      return;
    }

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < LOADING_STEPS.length - 1) {
          const newStep = prev + 1;
          setProgressWidth((newStep + 1) * 20);
          return newStep;
        } else {
          setProgressWidth(90);
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, [isVisible]);

  useEffect(() => {
    if (progress === 100) {
      setProgressWidth(100);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center" style={{
      background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.88))',
      backdropFilter: 'blur(5px)'
    }}>
      <div className="loading-content text-center p-8 bg-white rounded-2xl max-w-md">
        <div className="loading-spinner w-16 h-16 mx-auto mb-5 rounded-full"></div>
        <div className="text-green-600 font-semibold mb-2">Kita coba ekstrak metadata-nya...</div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full my-4 overflow-hidden">
          <div 
            className="progress-bar h-full rounded-full transition-all duration-300 ease-in-out relative" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500">
          {currentStep < LOADING_STEPS.length 
            ? LOADING_STEPS[currentStep] 
            : 'Almost done...'
          }
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
