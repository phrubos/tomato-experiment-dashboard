import React, { useState, useEffect } from 'react';
import VarietyComparison from './VarietyComparison';

// Inline data

const ripeYieldData = [
  // UG group
  { location: 'M-I', variety: 'UG11227', value: 58.8, category: 'UG' },
  { location: 'M-I', variety: 'UG8492', value: 62.2, category: 'UG' },
  { location: 'M-I', variety: 'UG17219', value: 66.6, category: 'UG' },
  { location: 'M-I', variety: 'UG1578', value: 61.7, category: 'UG' },
  { location: 'M-I', variety: 'UG13577', value: 66.4, category: 'UG' },
  { location: 'M-II', variety: 'UG11227', value: 108.0, category: 'UG' },
  { location: 'M-II', variety: 'UG8492', value: 70.6, category: 'UG' },
  { location: 'M-II', variety: 'UG17219', value: 103.0, category: 'UG' },
  { location: 'M-II', variety: 'UG1578', value: 118.0, category: 'UG' },
  { location: 'M-II', variety: 'UG13577', value: 65.5, category: 'UG' },
  { location: 'Cs-I', variety: 'UG11227', value: 89.7, category: 'UG' },
  { location: 'Cs-I', variety: 'UG8492', value: 96.3, category: 'UG' },
  { location: 'Cs-I', variety: 'UG17219', value: 94.1, category: 'UG' },
  { location: 'Cs-I', variety: 'UG1578', value: 113.0, category: 'UG' },
  { location: 'Cs-I', variety: 'UG13577', value: 102.0, category: 'UG' },
  { location: 'Cs-II', variety: 'UG11227', value: 103.0, category: 'UG' },
  { location: 'Cs-II', variety: 'UG8492', value: 103.0, category: 'UG' },
  { location: 'Cs-II', variety: 'UG17219', value: 128.0, category: 'UG' },
  { location: 'Cs-II', variety: 'UG1578', value: 142.0, category: 'UG' },
  { location: 'Cs-II', variety: 'UG13577', value: 123.0, category: 'UG' },
  { location: 'L-I', variety: 'UG11227', value: 110.0, category: 'UG' },
  { location: 'L-I', variety: 'UG8492', value: 158.0, category: 'UG' },
  { location: 'L-I', variety: 'UG17219', value: 136.0, category: 'UG' },
  { location: 'L-I', variety: 'UG1578', value: 145.0, category: 'UG' },
  { location: 'L-I', variety: 'UG13577', value: 0.0, category: 'UG' },
  { location: 'L-II', variety: 'UG11227', value: 176.0, category: 'UG' },
  { location: 'L-II', variety: 'UG8492', value: 173.0, category: 'UG' },
  { location: 'L-II', variety: 'UG17219', value: 138.0, category: 'UG' },
  { location: 'L-II', variety: 'UG1578', value: 173.0, category: 'UG' },
  { location: 'L-II', variety: 'UG13577', value: 0.0, category: 'UG' },
  
  // N group
  { location: 'M-I', variety: 'N00541', value: 44.1, category: 'N' },
  { location: 'M-I', variety: 'N00530', value: 36.4, category: 'N' },
  { location: 'M-I', variety: 'N00544', value: 76.4, category: 'N' },
  { location: 'M-I', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'M-I', variety: 'N00339', value: 52.9, category: 'N' },
  { location: 'M-I', variety: 'N4510', value: 44.9, category: 'N' },
  { location: 'M-I', variety: 'N00540', value: 52.5, category: 'N' },
  { location: 'M-II', variety: 'N00541', value: 88.1, category: 'N' },
  { location: 'M-II', variety: 'N00530', value: 65.5, category: 'N' },
  { location: 'M-II', variety: 'N00544', value: 102.0, category: 'N' },
  { location: 'M-II', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'M-II', variety: 'N00339', value: 98.5, category: 'N' },
  { location: 'M-II', variety: 'N4510', value: 81.7, category: 'N' },
  { location: 'M-II', variety: 'N00540', value: 63.8, category: 'N' },
  { location: 'Cs-I', variety: 'N00541', value: 62.9, category: 'N' },
  { location: 'Cs-I', variety: 'N00530', value: 95.5, category: 'N' },
  { location: 'Cs-I', variety: 'N00544', value: 111.0, category: 'N' },
  { location: 'Cs-I', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'Cs-I', variety: 'N00339', value: 94.4, category: 'N' },
  { location: 'Cs-I', variety: 'N4510', value: 57.8, category: 'N' },
  { location: 'Cs-I', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00541', value: 116.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00530', value: 103.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00544', value: 155.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00339', value: 148.0, category: 'N' },
  { location: 'Cs-II', variety: 'N4510', value: 111.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'L-I', variety: 'N00541', value: 155.0, category: 'N' },
  { location: 'L-I', variety: 'N00530', value: 171.0, category: 'N' },
  { location: 'L-I', variety: 'N00544', value: 102.0, category: 'N' },
  { location: 'L-I', variety: 'N00539', value: 149.0, category: 'N' },
  { location: 'L-I', variety: 'N00339', value: 133.0, category: 'N' },
  { location: 'L-I', variety: 'N4510', value: 0.0, category: 'N' },
  { location: 'L-I', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'L-II', variety: 'N00541', value: 186.0, category: 'N' },
  { location: 'L-II', variety: 'N00530', value: 141.0, category: 'N' },
  { location: 'L-II', variety: 'N00544', value: 164.0, category: 'N' },
  { location: 'L-II', variety: 'N00539', value: 165.0, category: 'N' },
  { location: 'L-II', variety: 'N00339', value: 162.0, category: 'N' },
  { location: 'L-II', variety: 'N4510', value: 0.0, category: 'N' },
  { location: 'L-II', variety: 'N00540', value: 0.0, category: 'N' },
  
  // H_WALLER group
  { location: 'M-I', variety: 'WALLER', value: 41.7, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2123', value: 52.7, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2239', value: 80.2, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2249', value: 31.1, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H1881', value: 64.6, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2127', value: 73.9, category: 'H_WALLER' },
  { location: 'M-II', variety: 'WALLER', value: 76.7, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2123', value: 64.2, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2239', value: 104.0, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2249', value: 88.8, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H1881', value: 116.0, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2127', value: 115.0, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'WALLER', value: 109.0, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2123', value: 77.5, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2239', value: 108.0, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2249', value: 59.8, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H1881', value: 111.0, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2127', value: 104.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'WALLER', value: 121.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2123', value: 128.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2239', value: 142.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2249', value: 106.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H1881', value: 130.0, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2127', value: 149.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'WALLER', value: 145.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2123', value: 120.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2239', value: 148.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2249', value: 111.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H1881', value: 135.0, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2127', value: 142.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'WALLER', value: 129.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2123', value: 164.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2239', value: 157.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2249', value: 153.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H1881', value: 135.0, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2127', value: 172.0, category: 'H_WALLER' },
];

const spoiledYieldData = [
  // UG group
  { location: 'M-I', variety: 'UG11227', value: 1.75, category: 'UG' },
  { location: 'M-I', variety: 'UG8492', value: 1.05, category: 'UG' },
  { location: 'M-I', variety: 'UG17219', value: 3.97, category: 'UG' },
  { location: 'M-I', variety: 'UG1578', value: 4.08, category: 'UG' },
  { location: 'M-I', variety: 'UG13577', value: 2.92, category: 'UG' },
  { location: 'M-II', variety: 'UG11227', value: 6.65, category: 'UG' },
  { location: 'M-II', variety: 'UG8492', value: 10.30, category: 'UG' },
  { location: 'M-II', variety: 'UG17219', value: 7.23, category: 'UG' },
  { location: 'M-II', variety: 'UG1578', value: 14.80, category: 'UG' },
  { location: 'M-II', variety: 'UG13577', value: 7.70, category: 'UG' },
  { location: 'Cs-I', variety: 'UG11227', value: 1.63, category: 'UG' },
  { location: 'Cs-I', variety: 'UG8492', value: 3.03, category: 'UG' },
  { location: 'Cs-I', variety: 'UG17219', value: 3.27, category: 'UG' },
  { location: 'Cs-I', variety: 'UG1578', value: 3.85, category: 'UG' },
  { location: 'Cs-I', variety: 'UG13577', value: 1.63, category: 'UG' },
  { location: 'Cs-II', variety: 'UG11227', value: 1.98, category: 'UG' },
  { location: 'Cs-II', variety: 'UG8492', value: 4.32, category: 'UG' },
  { location: 'Cs-II', variety: 'UG17219', value: 9.10, category: 'UG' },
  { location: 'Cs-II', variety: 'UG1578', value: 11.20, category: 'UG' },
  { location: 'Cs-II', variety: 'UG13577', value: 5.60, category: 'UG' },
  { location: 'L-I', variety: 'UG11227', value: 2.28, category: 'UG' },
  { location: 'L-I', variety: 'UG8492', value: 2.54, category: 'UG' },
  { location: 'L-I', variety: 'UG17219', value: 1.84, category: 'UG' },
  { location: 'L-I', variety: 'UG1578', value: 2.98, category: 'UG' },
  { location: 'L-I', variety: 'UG13577', value: 0.0, category: 'UG' },
  { location: 'L-II', variety: 'UG11227', value: 1.84, category: 'UG' },
  { location: 'L-II', variety: 'UG8492', value: 6.65, category: 'UG' },
  { location: 'L-II', variety: 'UG17219', value: 18.0, category: 'UG' },
  { location: 'L-II', variety: 'UG1578', value: 10.20, category: 'UG' },
  { location: 'L-II', variety: 'UG13577', value: 0.0, category: 'UG' },
  
  // N group
  { location: 'M-I', variety: 'N00541', value: 2.80, category: 'N' },
  { location: 'M-I', variety: 'N00530', value: 3.62, category: 'N' },
  { location: 'M-I', variety: 'N00544', value: 10.40, category: 'N' },
  { location: 'M-I', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'M-I', variety: 'N00339', value: 4.55, category: 'N' },
  { location: 'M-I', variety: 'N4510', value: 3.15, category: 'N' },
  { location: 'M-I', variety: 'N00540', value: 2.57, category: 'N' },
  { location: 'M-II', variety: 'N00541', value: 2.68, category: 'N' },
  { location: 'M-II', variety: 'N00530', value: 6.07, category: 'N' },
  { location: 'M-II', variety: 'N00544', value: 10.90, category: 'N' },
  { location: 'M-II', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'M-II', variety: 'N00339', value: 5.25, category: 'N' },
  { location: 'M-II', variety: 'N4510', value: 2.57, category: 'N' },
  { location: 'M-II', variety: 'N00540', value: 3.97, category: 'N' },
  { location: 'Cs-I', variety: 'N00541', value: 3.27, category: 'N' },
  { location: 'Cs-I', variety: 'N00530', value: 1.87, category: 'N' },
  { location: 'Cs-I', variety: 'N00544', value: 2.22, category: 'N' },
  { location: 'Cs-I', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'Cs-I', variety: 'N00339', value: 1.87, category: 'N' },
  { location: 'Cs-I', variety: 'N4510', value: 1.28, category: 'N' },
  { location: 'Cs-I', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00541', value: 3.50, category: 'N' },
  { location: 'Cs-II', variety: 'N00530', value: 2.92, category: 'N' },
  { location: 'Cs-II', variety: 'N00544', value: 1.98, category: 'N' },
  { location: 'Cs-II', variety: 'N00539', value: 0.0, category: 'N' },
  { location: 'Cs-II', variety: 'N00339', value: 6.07, category: 'N' },
  { location: 'Cs-II', variety: 'N4510', value: 2.33, category: 'N' },
  { location: 'Cs-II', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'L-I', variety: 'N00541', value: 3.50, category: 'N' },
  { location: 'L-I', variety: 'N00530', value: 3.33, category: 'N' },
  { location: 'L-I', variety: 'N00544', value: 2.19, category: 'N' },
  { location: 'L-I', variety: 'N00539', value: 3.41, category: 'N' },
  { location: 'L-I', variety: 'N00339', value: 1.49, category: 'N' },
  { location: 'L-I', variety: 'N4510', value: 0.0, category: 'N' },
  { location: 'L-I', variety: 'N00540', value: 0.0, category: 'N' },
  { location: 'L-II', variety: 'N00541', value: 9.71, category: 'N' },
  { location: 'L-II', variety: 'N00530', value: 7.70, category: 'N' },
  { location: 'L-II', variety: 'N00544', value: 3.41, category: 'N' },
  { location: 'L-II', variety: 'N00539', value: 20.70, category: 'N' },
  { location: 'L-II', variety: 'N00339', value: 2.36, category: 'N' },
  { location: 'L-II', variety: 'N4510', value: 0.0, category: 'N' },
  { location: 'L-II', variety: 'N00540', value: 0.0, category: 'N' },
  
  // H_WALLER group
  { location: 'M-I', variety: 'WALLER', value: 0.70, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2123', value: 2.33, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2239', value: 3.27, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2249', value: 2.68, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H1881', value: 3.38, category: 'H_WALLER' },
  { location: 'M-I', variety: 'H2127', value: 4.90, category: 'H_WALLER' },
  { location: 'M-II', variety: 'WALLER', value: 3.27, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2123', value: 2.80, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2239', value: 8.75, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2249', value: 1.40, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H1881', value: 9.45, category: 'H_WALLER' },
  { location: 'M-II', variety: 'H2127', value: 7.82, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'WALLER', value: 1.28, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2123', value: 2.57, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2239', value: 3.27, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2249', value: 3.27, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H1881', value: 2.22, category: 'H_WALLER' },
  { location: 'Cs-I', variety: 'H2127', value: 1.63, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'WALLER', value: 1.98, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2123', value: 2.80, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2239', value: 2.33, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2249', value: 2.68, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H1881', value: 1.75, category: 'H_WALLER' },
  { location: 'Cs-II', variety: 'H2127', value: 3.85, category: 'H_WALLER' },
  { location: 'L-I', variety: 'WALLER', value: 3.24, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2123', value: 1.93, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2239', value: 2.45, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2249', value: 3.68, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H1881', value: 4.73, category: 'H_WALLER' },
  { location: 'L-I', variety: 'H2127', value: 2.10, category: 'H_WALLER' },
  { location: 'L-II', variety: 'WALLER', value: 10.20, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2123', value: 3.68, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2239', value: 16.80, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2249', value: 11.60, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H1881', value: 12.70, category: 'H_WALLER' },
  { location: 'L-II', variety: 'H2127', value: 7.44, category: 'H_WALLER' }
];

const chartColors = {
  UG: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
  N: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#065f46', '#047857'],
  H_WALLER: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7', '#d97706']
};

interface ChartData {
  location: string;
  variety: string;
  value: number;
  category: 'UG' | 'N' | 'H_WALLER';
}

const CleanDashboard: React.FC = () => {
  const [selectedVariety, setSelectedVariety] = useState<string | null>(null);
  const [hoveredVariety, setHoveredVariety] = useState<string | null>(null);
  const [selectedDataType, setSelectedDataType] = useState<'ripe' | 'spoiled'>('ripe');
  const [fullscreenChart, setFullscreenChart] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState<'4soros' | '50toves'>('4soros');
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isLaptop = screenSize.width >= 1024 && screenSize.width < 1440;
  const isDesktop = screenSize.width >= 1440;

  const generateYAxisTicks = (maxValue: number) => {
    // Create 5-6 evenly spaced ticks
    let step;
    if (maxValue <= 20) {
      step = 5;
    } else if (maxValue <= 50) {
      step = 10;
    } else if (maxValue <= 100) {
      step = 20;
    } else if (maxValue <= 200) {
      step = 40;
    } else {
      step = Math.ceil(maxValue / 5 / 10) * 10;
    }
    
    const ticks = [];
    const maxTick = Math.ceil(maxValue / step) * step;
    for (let i = 0; i <= maxTick; i += step) {
      ticks.push(i);
    }
    return ticks;
  };

  const renderChart = (data: ChartData[], title: string, category: 'UG' | 'N' | 'H_WALLER', chartId: string, dataType: 'ripe' | 'spoiled') => {
    const filteredData = data.filter(item => item.category === category);
    // Filter out varieties that have all zero values
    const allVarieties = [...new Set(filteredData.map(item => item.variety))];
    const varieties = allVarieties.filter(variety => {
      const varietyData = filteredData.filter(item => item.variety === variety);
      return varietyData.some(item => item.value > 0);
    });
    const maxValue = Math.max(...filteredData.map(item => item.value));
    const colors = chartColors[category];
    const yAxisTicks = generateYAxisTicks(maxValue);
    const chartMaxValue = Math.max(...yAxisTicks);

    const isFullscreen = fullscreenChart === chartId;

    if (isFullscreen) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#1a1a1a',
          zIndex: 999999,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <button
            onClick={() => setFullscreenChart(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              zIndex: 9999999
            }}
          >
            ✕ Bezárás
          </button>
          
          <h3 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '30px', color: 'white' }}>{title}</h3>
          
          {/* Fullscreen sidebar for variety info */}
          {selectedVariety && (
            <div style={{
              position: 'absolute',
              left: '40px',
              top: '120px',
              width: '350px',
              background: 'rgba(45, 55, 72, 0.9)',
              borderRadius: '15px',
              padding: '25px',
              color: 'white',
              zIndex: 10000000
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ 
                  margin: 0, 
                  color: '#fff', 
                  fontSize: '16px', 
                  textAlign: 'center'
                }}>
                  📊 Adatok Áttekintése
                </h3>
                <button
                  onClick={() => setSelectedVariety(null)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <h4 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '18px',
                textAlign: 'center'
              }}>
                🔍 {selectedVariety}
              </h4>
              
              <button
                onClick={() => setShowComparison(true)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📊 Részletes Összehasonlítás
              </button>
              
              {selectedDataType === 'ripe' && (
                <div>
                  <strong style={{ fontSize: '16px' }}>🍅 Érett bogyó (t/ha):</strong>
                  <div style={{ marginTop: '8px' }}>
                    {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => {
                      const getLocationName = (prefix: string) => {
                        if (prefix === 'M') return 'Mezőberény';
                        if (prefix === 'Cs') return 'Csabacsűd';
                        if (prefix === 'L') return 'Lakitelek';
                        return prefix;
                      };
                      
                      return (
                        <div key={pairIndex} style={{ 
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px'
                        }}>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            marginBottom: '4px',
                            opacity: 0.8,
                            textAlign: 'center'
                          }}>
                            {getLocationName(locationPair[0].split('-')[0])}
                          </div>
                          {locationPair.map(location => {
                            const item = getVarietyInfo(selectedVariety).ripe.find(d => d.location === location);
                            return (
                              <div key={location} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                padding: '2px 0',
                                fontSize: '15px'
                              }}>
                                <span>{location}:</span>
                                <span style={{ fontWeight: 'bold' }}>{item ? item.value.toFixed(1) : "0.0"}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {selectedDataType === 'spoiled' && (
                <div>
                  <strong style={{ fontSize: '16px' }}>📉 Romló bogyó (t/ha):</strong>
                  <div style={{ marginTop: '8px' }}>
                    {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => {
                      const getLocationName = (prefix: string) => {
                        if (prefix === 'M') return 'Mezőberény';
                        if (prefix === 'Cs') return 'Csabacsűd';
                        if (prefix === 'L') return 'Lakitelek';
                        return prefix;
                      };
                      
                      return (
                        <div key={pairIndex} style={{ 
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px'
                        }}>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            marginBottom: '4px',
                            opacity: 0.8,
                            textAlign: 'center'
                          }}>
                            {getLocationName(locationPair[0].split('-')[0])}
                          </div>
                          {locationPair.map(location => {
                            const item = getVarietyInfo(selectedVariety).spoiled.find(d => d.location === location);
                            return (
                              <div key={location} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                padding: '2px 0',
                                fontSize: '15px'
                              }}>
                                <span>{location}:</span>
                                <span style={{ fontWeight: 'bold' }}>{item ? item.value.toFixed(1) : "0.0"}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Fullscreen chart with Y-axis */}
          <div style={{ 
            display: 'flex', 
            height: isMobile ? '50vh' : isTablet ? '60vh' : '65vh', 
            padding: isMobile ? '10px' : '15px',
            background: '#2a2a2a',
            borderRadius: '10px',
            flex: 1,
            width: selectedVariety ? 'calc(100% - 410px)' : '100%',
            marginLeft: selectedVariety ? '380px' : '0px',
            transition: 'margin-left 0.3s ease, width 0.3s ease',
            overflow: 'hidden',
            maxHeight: '600px'
          }}>
            {/* Y-axis */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: isMobile ? '30px' : '40px',
              height: '100%',
              paddingRight: isMobile ? '2px' : '4px',
              paddingTop: isMobile ? '10px' : '15px',
              paddingBottom: isMobile ? '30px' : '45px'
            }}>
              {yAxisTicks.slice().reverse().map((tick, index) => (
                <div key={index} style={{ 
                  color: 'white', 
                  fontSize: isMobile ? '10px' : '12px', 
                  fontWeight: 'bold',
                  position: 'relative'
                }}>
                  {tick}
                  <div style={{
                    position: 'absolute',
                    right: isMobile ? '-4px' : '-6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: isMobile ? '3px' : '4px',
                    height: '1px',
                    background: 'rgba(255,255,255,0.3)'
                  }} />
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'end', 
              flex: 1,
              height: '100%',
              paddingBottom: isMobile ? '25px' : '35px',
              paddingLeft: isMobile ? '8px' : '12px',
              paddingRight: isMobile ? '8px' : '12px',
              gap: selectedVariety ? (isMobile ? '1px' : '2px') : (isMobile ? '3px' : '4px')
            }}>
              {/* Group locations in pairs with proper spacing */}
              {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => (
                <div key={pairIndex} style={{ 
                  display: 'flex', 
                  gap: selectedVariety ? '8px' : '10px', 
                  flex: 1, 
                  justifyContent: 'center', 
                  alignItems: 'end'
                }}>
                  {locationPair.map((location) => (
                    <div key={location} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'end', gap: selectedVariety ? '1px' : '2px', height: isMobile ? '300px' : isTablet ? '350px' : '400px', alignSelf: 'end' }}>
                    {varieties.map((variety, index) => {
                      const item = filteredData.find(d => d.variety === variety && d.location === location);
                      const value = item ? item.value : 0;
                      // Calculate height in pixels for fullscreen - match Y-axis container
                      // Fullscreen container uses vh units, so calculate based on actual container
                      const fullscreenContainerPadding = isMobile ? 10 : 15;
                      const yAxisPaddingTop = isMobile ? 10 : 15;
                      const yAxisPaddingBottom = isMobile ? 30 : 45;
                      // Available height is the Y-axis area minus its paddings
                      const availableHeight = (isMobile ? window.innerHeight * 0.5 : isTablet ? window.innerHeight * 0.6 : window.innerHeight * 0.65) 
                        - (fullscreenContainerPadding * 2) - yAxisPaddingTop - yAxisPaddingBottom;
                      const heightPx = (value / chartMaxValue) * availableHeight;
                      const isHovered = hoveredVariety === variety;
                      const isSelected = selectedVariety === variety;
                      const opacity = hoveredVariety && !isHovered ? 0.3 : 1;
                      
                      return (
                        <div
                          key={variety}
                          style={{
                            width: selectedVariety ? '15px' : '30px',
                            height: `${heightPx}px`,
                            backgroundColor: colors[index % colors.length],
                            borderRadius: '4px 4px 0 0',
                            minHeight: value > 0 ? '4px' : '0px',
                            opacity: opacity,
                            transition: 'opacity 0.2s ease, width 0.3s ease',
                            cursor: 'pointer',
                            border: isSelected ? '3px solid #ffffff' : isHovered ? '2px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.3)',
                            boxSizing: 'border-box',
                            alignSelf: 'end'
                          }}
                          title={`${variety}: ${value.toFixed(1)} t/ha`}
                          onMouseEnter={() => setHoveredVariety(variety)}
                          onMouseLeave={() => setHoveredVariety(null)}
                          onClick={() => {
                            if (selectedVariety === variety) {
                              setSelectedVariety(null);
                              setSelectedDataType(null);
                            } else {
                              setSelectedVariety(variety);
                              setSelectedDataType(dataType);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                      <span style={{ fontSize: isMobile ? '14px' : '16px', marginTop: isMobile ? '8px' : '12px', fontWeight: 'bold', color: 'white' }}>{location}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Fullscreen legend with dynamic sizing */}
          <div style={{ 
            display: 'flex', 
            flexWrap: varieties.length > 8 ? 'wrap' : 'nowrap', 
            justifyContent: 'center', 
            gap: varieties.length > 6 ? '4px' : '8px',
            padding: isMobile ? '10px' : '15px',
            marginLeft: selectedVariety ? '380px' : '0px',
            transition: 'margin-left 0.3s ease',
            overflow: 'hidden',
            maxHeight: '80px'
          }}>
            {varieties.map((variety, index) => {
              const isHovered = hoveredVariety === variety;
              const isSelected = selectedVariety === variety;
              const opacity = hoveredVariety && !isHovered ? 0.3 : 1;
              
              // Dynamic font size for fullscreen legend - more compact
              const getFullscreenFontSize = () => {
                if (isMobile) return varieties.length <= 4 ? '12px' : '10px';
                if (varieties.length <= 4) return '14px';
                if (varieties.length <= 6) return '12px';
                if (varieties.length <= 8) return '11px';
                return '10px';
              };
              
              const getFullscreenPadding = () => {
                if (isMobile) return '3px 6px';
                if (varieties.length <= 4) return '6px 10px';
                if (varieties.length <= 6) return '4px 8px';
                return '3px 6px';
              };
              
              return (
                <div 
                  key={variety} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: varieties.length > 6 ? '6px' : '8px',
                    opacity: opacity,
                    transition: 'opacity 0.2s ease',
                    cursor: 'pointer',
                    padding: getFullscreenPadding(),
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.25)' : isHovered ? 'rgba(59, 130, 246, 0.15)' : 'rgba(45, 55, 72, 0.5)',
                    border: isSelected ? '2px solid rgba(59, 130, 246, 0.5)' : '2px solid transparent',
                    flexShrink: 0,
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={() => setHoveredVariety(variety)}
                  onMouseLeave={() => setHoveredVariety(null)}
                  onClick={() => {
                    if (selectedVariety === variety) {
                      setSelectedVariety(null);
                      setSelectedDataType(null);
                    } else {
                      setSelectedVariety(variety);
                      setSelectedDataType(dataType);
                    }
                  }}
                >
                  <div 
                    style={{ 
                      width: varieties.length > 6 ? '10px' : '12px', 
                      height: varieties.length > 6 ? '10px' : '12px', 
                      backgroundColor: colors[index % colors.length],
                      borderRadius: '2px'
                    }}
                  />
                  <span style={{ fontSize: getFullscreenFontSize(), color: 'white', fontWeight: isSelected ? '600' : '400' }}>
                    {variety}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div style={{
        background: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '12px',
        padding: isMobile ? '8px' : '12px',
        margin: '0',
        height: isMobile ? '400px' : isTablet ? '500px' : '600px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        minWidth: '0',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{title}</h3>
          <button
            onClick={() => setFullscreenChart(chartId)}
            style={{
              background: 'linear-gradient(45deg, #4299e1, #667eea)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            ⛶
          </button>
        </div>
        
        {/* Chart with Y-axis */}
        <div style={{ 
          display: 'flex', 
          height: 'calc(100% - 80px)', 
          padding: isMobile ? '8px' : '10px',
          background: '#2a2a2a',
          borderRadius: '8px',
          flex: 1,
          overflow: 'hidden',
          minHeight: isMobile ? '280px' : '350px'
        }}>
          {/* Y-axis */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '25px',
            height: '100%',
            paddingRight: '2px',
            paddingTop: '10px',
            paddingBottom: '30px'
          }}>
            {yAxisTicks.slice().reverse().map((tick, index) => (
              <div key={index} style={{ 
                color: 'white', 
                fontSize: '8px', 
                fontWeight: 'bold',
                position: 'relative'
              }}>
                {tick}
                <div style={{
                  position: 'absolute',
                  right: '-3px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '2px',
                  height: '1px',
                  background: 'rgba(255,255,255,0.3)'
                }} />
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'end', 
            flex: 1,
            height: '100%',
            paddingBottom: '20px',
            paddingTop: '10px',
            paddingLeft: isMobile ? '6px' : '10px',
            paddingRight: isMobile ? '6px' : '10px',
            gap: selectedVariety ? (isMobile ? '0.5px' : '1px') : (isMobile ? '1px' : '2px'),
            minWidth: '0'
          }}>
            {/* Group locations in pairs with proper spacing */}
            {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => (
              <div key={pairIndex} style={{ 
                display: 'flex', 
                gap: selectedVariety ? '5px' : '6px', 
                flex: 1, 
                justifyContent: 'center', 
                transition: 'gap 0.3s ease'
              }}>
                {locationPair.map((location) => (
                  <div key={location} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'end', gap: selectedVariety ? '0.5px' : '1px', height: 'calc(100% - 25px)' }}>
                  {varieties.map((variety, index) => {
                    const item = filteredData.find(d => d.variety === variety && d.location === location);
                    const value = item ? item.value : 0;
                    // Calculate height in pixels based on chart area - dynamic height calculation
                    const availableHeight = isMobile ? 250 : isTablet ? 320 : 400;
                    const heightPx = (value / chartMaxValue) * availableHeight;
                    const isHovered = hoveredVariety === variety;
                    const isSelected = selectedVariety === variety;
                    const opacity = hoveredVariety && !isHovered ? 0.3 : 1;
                    
                    return (
                      <div
                        key={variety}
                        style={{
                          width: selectedVariety ? '8px' : '12px',
                          height: `${heightPx}px`,
                          backgroundColor: colors[index % colors.length],
                          borderRadius: '2px 2px 0 0',
                          minHeight: value > 0 ? '3px' : '0px',
                          opacity: opacity,
                          transition: 'opacity 0.2s ease, width 0.3s ease',
                          cursor: 'pointer',
                          border: isSelected ? '2px solid #ffffff' : isHovered ? '1px solid rgba(255,255,255,0.8)' : 'none',
                          boxSizing: 'border-box'
                        }}
                        title={`${variety}: ${value.toFixed(1)} t/ha`}
                        onMouseEnter={() => setHoveredVariety(variety)}
                        onMouseLeave={() => setHoveredVariety(null)}
                        onClick={() => {
                          if (selectedVariety === variety) {
                            setSelectedVariety(null);
                            setSelectedDataType(null);
                          } else {
                            setSelectedVariety(variety);
                            setSelectedDataType(dataType);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                    <span style={{ fontSize: '11px', marginTop: '5px', fontWeight: 'bold', color: 'white' }}>{location}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend with dynamic font size based on variety count */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'nowrap', 
          justifyContent: 'center', 
          gap: varieties.length > 6 ? '3px' : '6px',
          padding: '8px',
          minHeight: '50px',
          overflow: 'hidden'
        }}>
          {varieties.map((variety, index) => {
            const isHovered = hoveredVariety === variety;
            const isSelected = selectedVariety === variety;
            const opacity = hoveredVariety && !isHovered ? 0.3 : 1;
            
            // Dynamic font size based on variety count
            const getFontSize = () => {
              if (varieties.length <= 4) return '12px';
              if (varieties.length <= 6) return '11px';
              if (varieties.length <= 8) return '10px';
              return '9px';
            };
            
            const getPadding = () => {
              if (varieties.length <= 4) return '4px 8px';
              if (varieties.length <= 6) return '3px 6px';
              return '2px 4px';
            };
            
            return (
              <div 
                key={variety} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: varieties.length > 6 ? '4px' : '6px',
                  opacity: opacity,
                  transition: 'opacity 0.2s ease',
                  cursor: 'pointer',
                  padding: getPadding(),
                  borderRadius: '6px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : isHovered ? 'rgba(59, 130, 246, 0.1)' : 'rgba(45, 55, 72, 0.5)',
                  border: isSelected ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                  fontSize: getFontSize(),
                  minWidth: 'fit-content',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={() => setHoveredVariety(variety)}
                onMouseLeave={() => setHoveredVariety(null)}
                onClick={() => {
                  if (selectedVariety === variety) {
                    setSelectedVariety(null);
                    setSelectedDataType(null);
                  } else {
                    setSelectedVariety(variety);
                    setSelectedDataType(dataType);
                  }
                }}
              >
                <div 
                  style={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: colors[index % colors.length],
                    borderRadius: '1px',
                    flexShrink: 0
                  }}
                />
                <span style={{ 
                  color: '#e2e8f0', 
                  fontWeight: isSelected ? '600' : '400'
                }}>
                  {variety}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getVarietyInfo = (variety: string) => {
    const ripeData = ripeYieldData.filter(d => d.variety === variety);
    const spoiledData = spoiledYieldData.filter(d => d.variety === variety);
    
    return { ripe: ripeData, spoiled: spoiledData };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {fullscreenChart && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999998
          }}
          onClick={() => setFullscreenChart(null)}
        />
      )}
      
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '20px' : '30px' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : isLaptop ? '2.4rem' : '2.8rem', 
            margin: '0 0 10px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontWeight: 'bold',
            lineHeight: isMobile ? '1.3' : '1.2'
          }}>
            🍅 Ipari paradicsom fajtakísérletek, 2025
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '1.2rem', 
            margin: 0,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            
          </p>
          <p style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: isMobile ? '0.85rem' : '1rem', 
            margin: '10px 0 0 0',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            padding: isMobile ? '0 10px' : '0'
          }}>
            💡 {isMobile ? 'Kattints egy oszlopra' : 'Kattints egy oszlopra a részletes adatokért'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center', 
          alignItems: isMobile ? 'stretch' : 'center',
          marginBottom: isMobile ? '20px' : '30px',
          gap: '10px',
          padding: isMobile ? '0 20px' : '0'
        }}>
          <button
            onClick={() => {
              setActiveTab('4soros');
              setSelectedVariety(null);
            }}
            style={{
              background: activeTab === '4soros' 
                ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)' 
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: activeTab === '4soros' ? '2px solid #60a5fa' : '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: isMobile ? '10px 16px' : '12px 24px',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
              boxShadow: activeTab === '4soros' 
                ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
                : '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== '4soros') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== '4soros') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            📊 2025 Lakitelek 4 soros
          </button>
          
          <button
            onClick={() => {
              setActiveTab('50toves');
              setSelectedVariety(null);
            }}
            style={{
              background: activeTab === '50toves' 
                ? 'linear-gradient(45deg, #3b82f6, #8b5cf6)' 
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: activeTab === '50toves' ? '2px solid #60a5fa' : '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: isMobile ? '10px 16px' : '12px 24px',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
              boxShadow: activeTab === '50toves' 
                ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
                : '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== '50toves') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== '50toves') {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            🌱 2025 Lakitelek 50 töves
          </button>
        </div>

        {/* 4 soros tab content */}
        {activeTab === '4soros' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: selectedVariety 
              ? (isMobile ? '1fr' : isTablet ? '250px 1fr' : '300px 1fr')
              : '1fr',
            gap: isMobile ? '10px' : '15px',
            alignItems: 'start',
            transition: 'grid-template-columns 0.3s ease'
          }}>
            
            {selectedVariety && (
            <div style={{
              background: 'rgba(45, 55, 72, 0.9)',
              borderRadius: '12px',
              padding: isMobile ? '12px' : '15px',
              position: isMobile ? 'relative' : 'sticky',
              top: isMobile ? 'auto' : '20px',
              color: 'white',
              order: isMobile ? 2 : 1
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ 
                  margin: 0, 
                  color: '#fff', 
                  fontSize: '16px', 
                  textAlign: 'center'
                }}>
                  📊 Adatok Áttekintése
                </h3>
                <button
                  onClick={() => setSelectedVariety(null)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <h4 style={{ 
                margin: '0 0 15px 0', 
                fontSize: '18px',
                textAlign: 'center'
              }}>
                🔍 {selectedVariety}
              </h4>
              
              <button
                onClick={() => setShowComparison(true)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📊 Részletes Összehasonlítás
              </button>
              
              {selectedDataType === 'ripe' && (
                <div>
                  <strong style={{ fontSize: '16px' }}>🍅 Érett bogyó (t/ha):</strong>
                  <div style={{ marginTop: '8px' }}>
                    {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => {
                      const getLocationName = (prefix: string) => {
                        if (prefix === 'M') return 'Mezőberény';
                        if (prefix === 'Cs') return 'Csabacsűd';
                        if (prefix === 'L') return 'Lakitelek';
                        return prefix;
                      };
                      
                      return (
                        <div key={pairIndex} style={{ 
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px'
                        }}>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            marginBottom: '4px',
                            opacity: 0.8,
                            textAlign: 'center'
                          }}>
                            {getLocationName(locationPair[0].split('-')[0])}
                          </div>
                          {locationPair.map(location => {
                            const item = getVarietyInfo(selectedVariety).ripe.find(d => d.location === location);
                            return (
                              <div key={location} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                padding: '2px 0',
                                fontSize: '15px'
                              }}>
                                <span>{location}:</span>
                                <span style={{ fontWeight: 'bold' }}>{item ? item.value.toFixed(1) : "0.0"}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {selectedDataType === 'spoiled' && (
                <div>
                  <strong style={{ fontSize: '16px' }}>📉 Romló bogyó (t/ha):</strong>
                  <div style={{ marginTop: '8px' }}>
                    {[['M-I', 'M-II'], ['Cs-I', 'Cs-II'], ['L-I', 'L-II']].map((locationPair, pairIndex) => {
                      const getLocationName = (prefix: string) => {
                        if (prefix === 'M') return 'Mezőberény';
                        if (prefix === 'Cs') return 'Csabacsűd';
                        if (prefix === 'L') return 'Lakitelek';
                        return prefix;
                      };
                      
                      return (
                        <div key={pairIndex} style={{ 
                          marginBottom: '10px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '8px'
                        }}>
                          <div style={{ 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            marginBottom: '4px',
                            opacity: 0.8,
                            textAlign: 'center'
                          }}>
                            {getLocationName(locationPair[0].split('-')[0])}
                          </div>
                          {locationPair.map(location => {
                            const item = getVarietyInfo(selectedVariety).spoiled.find(d => d.location === location);
                            return (
                              <div key={location} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                padding: '2px 0',
                                fontSize: '15px'
                              }}>
                                <span>{location}:</span>
                                <span style={{ fontWeight: 'bold' }}>{item ? item.value.toFixed(1) : "0.0"}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ 
            overflow: 'hidden', 
            order: isMobile ? 1 : 2,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '10px' : '15px'
          }}>
            {/* Érett bogyó konténer */}
            <div style={{
              background: 'rgba(30, 30, 30, 0.95)',
              borderRadius: '15px',
              padding: isMobile ? '15px' : '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '15px', fontSize: isMobile ? '18px' : '24px' }}>
                📊 Érett bogyó mennyisége (t/ha)
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr',
                gap: isMobile ? '6px' : '8px'
              }}>
                {renderChart(ripeYieldData, 'UG sorozat', 'UG', 'ug-ripe', 'ripe')}
                {renderChart(ripeYieldData, 'N sorozat', 'N', 'n-ripe', 'ripe')}
                {renderChart(ripeYieldData, 'H + WALLER', 'H_WALLER', 'h-ripe', 'ripe')}
              </div>
            </div>

            {/* Romló bogyó konténer */}
            <div style={{
              background: 'rgba(30, 30, 30, 0.95)',
              borderRadius: '15px',
              padding: isMobile ? '15px' : '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '15px', fontSize: isMobile ? '18px' : '24px' }}>
                📉 Romló bogyó mennyisége (t/ha)
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr',
                gap: isMobile ? '6px' : '8px'
              }}>
                {renderChart(spoiledYieldData, 'UG sorozat', 'UG', 'ug-spoiled', 'spoiled')}
                {renderChart(spoiledYieldData, 'N sorozat', 'N', 'n-spoiled', 'spoiled')}
                {renderChart(spoiledYieldData, 'H + WALLER', 'H_WALLER', 'h-spoiled', 'spoiled')}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* 50 töves tab content */}
        {activeTab === '50toves' && (
          <div style={{ 
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            margin: '20px 0'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌱</div>
            <h2 style={{ 
              color: 'white', 
              fontSize: '2rem', 
              marginBottom: '15px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              2025 Lakitelek 50 töves
            </h2>
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '1.2rem',
              marginBottom: '30px'
            }}>
              Ez a kísérlet még folyamatban van...
            </p>
            <div style={{
              background: 'linear-gradient(45deg, #10b981, #059669)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '15px',
              display: 'inline-block',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}>
              📅 Adatok hamarosan elérhetők lesznek
            </div>
          </div>
        )}

        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          color: 'rgba(255,255,255,0.7)',
          fontSize: '14px'
        }}>
          <p>
            Paradicsom fajtakísérlet adatbázis - 2025 © Minden jog fenntartva
          </p>
        </div>
      </div>
      
      {showComparison && selectedVariety && (
        <VarietyComparison
          selectedVariety={selectedVariety}
          ripeYieldData={ripeYieldData}
          spoiledYieldData={spoiledYieldData}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default CleanDashboard;