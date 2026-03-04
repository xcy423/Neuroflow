import React from 'react';
import { 
  Footprints, 
  Heart, 
  Droplet, 
  Brain, 
  Moon, 
  Smile,
  Activity,
  Wind
} from 'lucide-react';

interface WidgetData {
  id: string;
  type: 'steps' | 'hrv' | 'hydration' | 'stress' | 'sleep' | 'mood' | 'meditation' | 'bloodOxygen' | 'calories';
  title: string;
  value: number;
  target?: number;
  unit: string;
  timestamp?: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  trend?: number[]; // For line graphs
  barData?: number[]; // For bar charts
  size?: 'large' | 'small';
}

interface HealthWidgetsProps {
  widgets: WidgetData[];
  onWidgetClick?: (widgetId: string) => void;
}

const getWidgetIcon = (type: string) => {
  switch (type) {
    case 'steps':
      return Footprints;
    case 'hrv':
      return Heart;
    case 'hydration':
      return Droplet;
    case 'stress':
      return Brain;
    case 'sleep':
      return Moon;
    case 'mood':
      return Smile;
    case 'meditation':
      return Activity;
    case 'bloodOxygen':
      return Wind;
    case 'calories':
      return Activity;
    default:
      return Activity;
  }
};

const CaloriesBarWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const Icon = getWidgetIcon(widget.type);
  const percentage = widget.target ? (widget.value / widget.target) * 100 : 0;
  
  // Generate bar data for the week
  const barData = widget.barData || [65, 45, 80, 70, 55, 90, 75];

  return (
    <div
      onClick={onClick}
      className="rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
      style={{ backgroundColor: widget.backgroundColor }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="mb-3">
        <h3 
          className="text-sm opacity-70 mb-1 font-heading"
          style={{ color: widget.textColor }}
        >
          {widget.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span 
            className="text-4xl font-heading"
            style={{ color: widget.textColor }}
          >
            {widget.value}
          </span>
          <span 
            className="text-base opacity-70"
            style={{ color: widget.textColor }}
          >
            {widget.unit}
          </span>
        </div>
      </div>

      {/* Vertical Bar Chart */}
      <div className="flex gap-1 items-end h-20 mb-2">
        {barData.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end">
            <div
              className="w-full rounded-t transition-all"
              style={{
                backgroundColor: widget.accentColor,
                height: `${value}%`,
                opacity: 0.8,
              }}
            />
          </div>
        ))}
      </div>

      {widget.timestamp && (
        <p 
          className="text-xs opacity-60"
          style={{ color: widget.textColor }}
        >
          {widget.timestamp}
        </p>
      )}
    </div>
  );
};

const CircularProgressWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const percentage = widget.target ? (widget.value / widget.target) * 100 : 0;
  const Icon = getWidgetIcon(widget.type);
  const isLarge = widget.size === 'large';

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
        isLarge ? 'col-span-2' : ''
      }`}
      style={{ backgroundColor: widget.backgroundColor }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {isLarge && (
          <div className="text-right">
            <p className="text-xs opacity-60" style={{ color: widget.textColor }}>
              Goal
            </p>
            <p className="font-heading" style={{ color: widget.textColor }}>
              {widget.target?.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className={`flex items-center ${isLarge ? 'justify-between' : 'flex-col items-start'}`}>
        <div className={isLarge ? '' : 'mb-4 w-full'}>
          <h3 
            className="text-sm opacity-70 mb-1 font-heading"
            style={{ color: widget.textColor }}
          >
            {widget.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span 
              className={`${isLarge ? 'text-5xl' : 'text-4xl'} font-heading`}
              style={{ color: widget.textColor }}
            >
              {widget.value.toLocaleString()}
            </span>
            <span 
              className="text-base opacity-70"
              style={{ color: widget.textColor }}
            >
              {widget.unit}
            </span>
          </div>
          {widget.timestamp && (
            <p 
              className="text-xs mt-1 opacity-60"
              style={{ color: widget.textColor }}
            >
              {widget.timestamp}
            </p>
          )}
        </div>

        {/* Circular Progress Ring */}
        <div className="relative">
          <svg 
            width={isLarge ? "100" : "70"} 
            height={isLarge ? "100" : "70"} 
            className="transform -rotate-90"
          >
            <circle
              cx={isLarge ? "50" : "35"}
              cy={isLarge ? "50" : "35"}
              r={isLarge ? "42" : "28"}
              stroke={widget.textColor}
              strokeWidth={isLarge ? "10" : "6"}
              fill="none"
              opacity="0.2"
            />
            <circle
              cx={isLarge ? "50" : "35"}
              cy={isLarge ? "50" : "35"}
              r={isLarge ? "42" : "28"}
              stroke={widget.accentColor}
              strokeWidth={isLarge ? "10" : "6"}
              fill="none"
              strokeDasharray={`${2 * Math.PI * (isLarge ? 42 : 28)}`}
              strokeDashoffset={`${2 * Math.PI * (isLarge ? 42 : 28) * (1 - percentage / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <div 
            className={`absolute top-0 left-0 flex items-center justify-center ${
              isLarge ? 'w-[100px] h-[100px]' : 'w-[70px] h-[70px]'
            }`}
          >
            <span 
              className={`${isLarge ? 'text-xl' : 'text-base'} font-heading`}
              style={{ color: widget.textColor }}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LineGraphWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const Icon = getWidgetIcon(widget.type);
  const trend = widget.trend || [];
  const isLarge = widget.size === 'large';
  
  // Calculate SVG path for line graph
  const width = isLarge ? 320 : 150;
  const height = 70;
  const padding = 10;
  const max = Math.max(...trend, widget.value);
  const min = Math.min(...trend, widget.value);
  const range = max - min || 1;
  
  const points = trend.map((val, i) => {
    const x = padding + (i / (trend.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((val - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
        isLarge ? 'col-span-2' : ''
      }`}
      style={{ backgroundColor: widget.backgroundColor }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="mb-3">
        <h3 
          className="text-sm opacity-70 mb-1 font-heading"
          style={{ color: widget.textColor }}
        >
          {widget.title}
        </h3>
        <div className="flex items-baseline gap-2 mb-3">
          <span 
            className="text-4xl font-heading"
            style={{ color: widget.textColor }}
          >
            {widget.value}
          </span>
          <span 
            className="text-base opacity-70"
            style={{ color: widget.textColor }}
          >
            {widget.unit}
          </span>
        </div>
      </div>

      {/* Line Graph */}
      <div className="mb-2">
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Area fill */}
          <path
            d={`M ${points.split(' ')[0]} L ${points} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
            fill={widget.accentColor}
            opacity="0.15"
          />
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={widget.accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots */}
          {trend.map((val, i) => {
            const x = padding + (i / (trend.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((val - min) / range) * (height - 2 * padding);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={widget.accentColor}
                opacity={i === trend.length - 1 ? "1" : "0.5"}
              />
            );
          })}
        </svg>
      </div>

      {widget.timestamp && (
        <p 
          className="text-xs opacity-60"
          style={{ color: widget.textColor }}
        >
          {widget.timestamp}
        </p>
      )}
    </div>
  );
};

const MoodWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const Icon = getWidgetIcon(widget.type);
  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊'];
  const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Great'];
  const moodIndex = Math.min(Math.floor(widget.value / 2), 4);

  return (
    <div
      onClick={onClick}
      className="rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm relative overflow-hidden"
      style={{ backgroundColor: widget.backgroundColor }}
    >
      {/* Pulsing indicator to show it's interactive */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full animate-pulse opacity-70" />
      
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="mb-3">
        <h3 
          className="text-sm opacity-70 mb-1 font-heading"
          style={{ color: widget.textColor }}
        >
          {widget.title}
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center py-3">
        <div className="text-5xl mb-2">{moodEmojis[moodIndex]}</div>
        <p 
          className="text-lg font-heading mb-1"
          style={{ color: widget.textColor }}
        >
          {moodLabels[moodIndex]}
        </p>
        <p 
          className="text-xs opacity-60"
          style={{ color: widget.textColor }}
        >
          Tap to update
        </p>
      </div>

      {widget.timestamp && (
        <p 
          className="text-xs text-center opacity-60 mt-2"
          style={{ color: widget.textColor }}
        >
          Last logged: {widget.timestamp}
        </p>
      )}
    </div>
  );
};

const SleepWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const Icon = getWidgetIcon(widget.type);
  const hours = Math.floor(widget.value);
  const minutes = Math.round((widget.value - hours) * 60);
  const isLarge = widget.size === 'large';
  
  // Sleep cycle data for visualization
  const sleepCycles = [25, 45, 60, 55, 50, 40, 30, 20, 35, 50, 45, 30];

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
        isLarge ? 'col-span-2' : ''
      }`}
      style={{ backgroundColor: widget.backgroundColor }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="mb-3">
        <h3 
          className="text-sm opacity-70 mb-1 font-heading"
          style={{ color: widget.textColor }}
        >
          {widget.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span 
            className="text-5xl font-heading"
            style={{ color: widget.textColor }}
          >
            {hours}
          </span>
          <span 
            className="text-2xl opacity-70"
            style={{ color: widget.textColor }}
          >
            h
          </span>
          <span 
            className="text-4xl font-heading"
            style={{ color: widget.textColor }}
          >
            {minutes}
          </span>
          <span 
            className="text-2xl opacity-70"
            style={{ color: widget.textColor }}
          >
            m
          </span>
        </div>
      </div>

      {/* Sleep quality bars */}
      <div className="flex gap-1.5 mb-3 items-end h-16">
        {sleepCycles.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t transition-all"
            style={{
              backgroundColor: widget.accentColor,
              height: `${height}px`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {widget.timestamp && (
        <p 
          className="text-xs opacity-60"
          style={{ color: widget.textColor }}
        >
          {widget.timestamp}
        </p>
      )}
    </div>
  );
};

const HydrationWidget: React.FC<{
  widget: WidgetData;
  onClick?: () => void;
}> = ({ widget, onClick }: { widget: WidgetData; onClick?: () => void }) => {
  const Icon = getWidgetIcon(widget.type);
  const percentage = widget.target ? (widget.value / widget.target) * 100 : 0;

  return (
    <div
      onClick={onClick}
      className="rounded-3xl p-5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
      style={{ backgroundColor: widget.backgroundColor }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: widget.accentColor,
            opacity: 0.9
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="mb-3">
        <h3 
          className="text-sm opacity-70 mb-1 font-heading"
          style={{ color: widget.textColor }}
        >
          {widget.title}
        </h3>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span 
              className="text-4xl font-heading"
              style={{ color: widget.textColor }}
            >
              {widget.value}
            </span>
            <span 
              className="text-lg opacity-60"
              style={{ color: widget.textColor }}
            >
              /{widget.target}
            </span>
          </div>
          <p 
            className="text-xs opacity-70"
            style={{ color: widget.textColor }}
          >
            {widget.unit}
          </p>
        </div>

        {/* Water glass visualization */}
        <div className="relative">
          <svg width="50" height="70" viewBox="0 0 50 70">
            {/* Glass outline */}
            <path
              d="M 12 0 L 8 70 L 42 70 L 38 0 Z"
              fill="none"
              stroke={widget.textColor}
              strokeWidth="2"
              opacity="0.3"
            />
            {/* Water fill */}
            <path
              d={`M 12 ${70 - (percentage * 0.7)} L ${8 + (4 * percentage / 100)} 70 L ${42 - (4 * percentage / 100)} 70 L 38 ${70 - (percentage * 0.7)} Z`}
              fill={widget.accentColor}
              opacity="0.7"
            />
            {/* Water surface wave */}
            <path
              d={`M 12 ${70 - (percentage * 0.7)} Q 25 ${70 - (percentage * 0.7) - 2} 38 ${70 - (percentage * 0.7)}`}
              fill="none"
              stroke={widget.accentColor}
              strokeWidth="2"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>

      {widget.timestamp && (
        <p 
          className="text-xs mt-2 opacity-60"
          style={{ color: widget.textColor }}
        >
          {widget.timestamp}
        </p>
      )}
    </div>
  );
};

export const HealthWidgets: React.FC<HealthWidgetsProps> = ({ 
  widgets, 
  onWidgetClick 
}) => {
  const renderWidget = (widget: WidgetData) => {
    const handleClick = () => onWidgetClick?.(widget.id);

    switch (widget.type) {
      case 'hrv':
        return <LineGraphWidget key={widget.id} widget={widget} onClick={handleClick} />;
      case 'mood':
        return <MoodWidget key={widget.id} widget={widget} onClick={handleClick} />;
      case 'sleep':
        return <SleepWidget key={widget.id} widget={widget} onClick={handleClick} />;
      case 'hydration':
        return <HydrationWidget key={widget.id} widget={widget} onClick={handleClick} />;
      case 'calories':
        return <CaloriesBarWidget key={widget.id} widget={widget} onClick={handleClick} />;
      default:
        return <CircularProgressWidget key={widget.id} widget={widget} onClick={handleClick} />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {widgets.map((widget) => renderWidget(widget))}
    </div>
  );
};
