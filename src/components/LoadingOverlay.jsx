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
    <div className="loading-overlay active">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <div className="loading-text">Kita coba ekstrak metadata-nya...</div>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="loading-steps">
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
