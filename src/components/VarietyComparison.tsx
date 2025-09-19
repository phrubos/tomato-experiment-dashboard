import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Line, Area, AreaChart, Cell } from 'recharts';

interface VarietyComparisonProps {
  selectedVariety: string;
  ripeYieldData: Array<{
    location: string;
    variety: string;
    value: number;
    category: string;
  }>;
  spoiledYieldData: Array<{
    location: string;
    variety: string;
    value: number;
    category: string;
  }>;
  onClose: () => void;
}

const VarietyComparison: React.FC<VarietyComparisonProps> = ({
  selectedVariety,
  ripeYieldData,
  spoiledYieldData,
  onClose
}) => {
  const comparisonData = useMemo(() => {
    // Get category of selected variety
    const selectedData = ripeYieldData.find(d => d.variety === selectedVariety);
    if (!selectedData) return null;
    
    const category = selectedData.category;
    
    // Get all varieties in the same category
    const categoryVarieties = [...new Set(
      ripeYieldData
        .filter(d => d.category === category)
        .map(d => d.variety)
    )];
    
    // Calculate averages for each variety
    const varietyAverages = categoryVarieties.map(variety => {
      const ripeValues = ripeYieldData
        .filter(d => d.variety === variety)
        .map(d => d.value);
      const spoiledValues = spoiledYieldData
        .filter(d => d.variety === variety)
        .map(d => d.value);
      
      const avgRipe = ripeValues.reduce((a, b) => a + b, 0) / ripeValues.length;
      const avgSpoiled = spoiledValues.reduce((a, b) => a + b, 0) / spoiledValues.length;
      const maxRipe = Math.max(...ripeValues);
      const minRipe = Math.min(...ripeValues.filter(v => v > 0));
      
      return {
        variety,
        avgRipe: parseFloat(avgRipe.toFixed(1)),
        avgSpoiled: parseFloat(avgSpoiled.toFixed(2)),
        maxRipe: parseFloat(maxRipe.toFixed(1)),
        minRipe: parseFloat(minRipe.toFixed(1)),
        isSelected: variety === selectedVariety
      };
    }).sort((a, b) => b.avgRipe - a.avgRipe);
    
    // Location performance data
    const locations = ['M-I', 'M-II', 'Cs-I', 'Cs-II', 'L-I', 'L-II'];
    const locationData = locations.map(location => {
      const ripeValue = ripeYieldData.find(
        d => d.variety === selectedVariety && d.location === location
      )?.value || 0;
      const spoiledValue = spoiledYieldData.find(
        d => d.variety === selectedVariety && d.location === location
      )?.value || 0;
      
      // Calculate category average for this location
      const categoryRipeAvg = ripeYieldData
        .filter(d => d.category === category && d.location === location)
        .reduce((sum, d) => sum + d.value, 0) / categoryVarieties.length;
      
      return {
        location,
        ripe: parseFloat(ripeValue.toFixed(1)),
        spoiled: parseFloat(spoiledValue.toFixed(2)),
        categoryAvg: parseFloat(categoryRipeAvg.toFixed(1))
      };
    });
    
    // Radar chart data for multi-dimensional comparison
    const radarData = locations.map(location => {
      const ripeValue = ripeYieldData.find(
        d => d.variety === selectedVariety && d.location === location
      )?.value || 0;
      
      // Get max value for this location across all varieties in category
      const maxForLocation = Math.max(
        ...ripeYieldData
          .filter(d => d.category === category && d.location === location)
          .map(d => d.value)
      );
      
      return {
        location: location,
        value: ripeValue,
        fullMark: maxForLocation
      };
    });
    
    return {
      varietyAverages,
      locationData,
      radarData,
      category,
      selectedRank: varietyAverages.findIndex(v => v.variety === selectedVariety) + 1,
      totalVarieties: varietyAverages.length
    };
  }, [selectedVariety, ripeYieldData, spoiledYieldData]);

  if (!comparisonData) return null;

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'UG': return '#3b82f6';
      case 'N': return '#10b981';
      case 'H_WALLER': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const categoryColor = getCategoryColor(comparisonData.category);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '1400px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h2 style={{
              color: 'white',
              fontSize: '28px',
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                background: categoryColor,
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '20px'
              }}>
                {selectedVariety}
              </span>
              <span style={{ opacity: 0.8 }}>Részletes Összehasonlítás</span>
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0,
              fontSize: '16px'
            }}>
              Rangsor: <strong style={{ color: categoryColor }}>
                {comparisonData.selectedRank}. helyezett
              </strong> a(z) {comparisonData.totalVarieties} {comparisonData.category} fajtából
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕ Bezárás
          </button>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Average Yield Comparison */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '18px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 Átlagos Termés Összehasonlítás ({comparisonData.category} csoport)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData.varietyAverages}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="variety" 
                  stroke="white"
                  tick={{ fill: 'white', fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="white" tick={{ fill: 'white' }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const entry = comparisonData.varietyAverages.find(item => item.variety === data.variety);
                      const color = entry?.isSelected ? '#ef4444' : categoryColor;
                      
                      return (
                        <div style={{
                          background: 'rgba(30, 41, 59, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: 'white'
                        }}>
                          <p style={{ margin: '0 0 4px 0', color: 'white' }}>{label}</p>
                          <p style={{ 
                            margin: 0, 
                            color: color,
                            fontWeight: 'bold'
                          }}>
                            <span style={{ color: color }}>Átlag érett (t/ha): </span>
                            <span style={{ color: color }}>{payload[0].value}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="avgRipe" 
                  name="Átlag érett (t/ha)"
                  radius={[8, 8, 0, 0]}
                >
                  {comparisonData.varietyAverages.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isSelected ? '#ef4444' : categoryColor}
                      stroke={entry.isSelected ? '#dc2626' : 'transparent'}
                      strokeWidth={entry.isSelected ? 3 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Location Performance Radar */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '15px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '18px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎯 Helyszínenkénti Teljesítmény
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={comparisonData.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis 
                  dataKey="location" 
                  stroke="white"
                  tick={{ fill: 'white', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'white', fontSize: 10 }}
                  domain={[0, 'dataMax']}
                />
                <Radar 
                  name={selectedVariety}
                  dataKey="value" 
                  stroke={categoryColor}
                  fill={categoryColor}
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'white' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Details */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '15px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '18px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📈 Helyszínek Szerinti Részletes Adatok
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={comparisonData.locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="location" 
                stroke="white"
                tick={{ fill: 'white' }}
              />
              <YAxis stroke="white" tick={{ fill: 'white' }} />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(30, 41, 59, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'white' }}
              />
              <Area 
                type="monotone"
                dataKey="categoryAvg" 
                stroke="rgba(255,255,255,0.3)"
                fill="rgba(255,255,255,0.1)"
                name="Kategória átlag (t/ha)"
                strokeWidth={1}
              />
              <Line 
                type="monotone"
                dataKey="ripe" 
                stroke={categoryColor}
                strokeWidth={3}
                name={`${selectedVariety} érett (t/ha)`}
                dot={{ fill: categoryColor, r: 6 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone"
                dataKey="spoiled" 
                stroke="#ef4444"
                strokeWidth={2}
                name="Romló (t/ha)"
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px'
        }}>
          {[
            {
              label: 'Átlagos érett termés',
              value: comparisonData.varietyAverages.find(v => v.isSelected)?.avgRipe || 0,
              unit: 't/ha',
              icon: '🍅',
              color: categoryColor
            },
            {
              label: 'Maximum termés',
              value: comparisonData.varietyAverages.find(v => v.isSelected)?.maxRipe || 0,
              unit: 't/ha',
              icon: '📈',
              color: '#10b981'
            },
            {
              label: 'Minimum termés',
              value: comparisonData.varietyAverages.find(v => v.isSelected)?.minRipe || 0,
              unit: 't/ha',
              icon: '📉',
              color: '#f59e0b'
            },
            {
              label: 'Átlagos romló',
              value: comparisonData.varietyAverages.find(v => v.isSelected)?.avgSpoiled || 0,
              unit: 't/ha',
              icon: '⚠️',
              color: '#ef4444'
            }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '12px',
                padding: '15px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                marginBottom: '4px'
              }}>
                {stat.label}
              </div>
              <div style={{
                color: stat.color,
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                {stat.value} <span style={{ fontSize: '14px', opacity: 0.8 }}>{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VarietyComparison;
