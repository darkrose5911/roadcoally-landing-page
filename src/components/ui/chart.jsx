"use client";

import React, { useState, useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  tablet: {
    label: 'Tablet',
    color: 'hsl(var(--chart-3))',
  },
};

const sampleData = [
  { month: 'Jan', desktop: 186, mobile: 80, tablet: 45 },
  { month: 'Feb', desktop: 305, mobile: 200, tablet: 78 },
  { month: 'Mar', desktop: 237, mobile: 120, tablet: 89 },
  { month: 'Apr', desktop: 73, mobile: 190, tablet: 102 },
  { month: 'May', desktop: 209, mobile: 130, tablet: 67 },
  { month: 'Jun', desktop: 214, mobile: 140, tablet: 95 },
  { month: 'Jul', desktop: 245, mobile: 160, tablet: 88 },
  { month: 'Aug', desktop: 267, mobile: 180, tablet: 112 },
  { month: 'Sep', desktop: 189, mobile: 145, tablet: 76 },
  { month: 'Oct', desktop: 298, mobile: 210, tablet: 134 },
  { month: 'Nov', desktop: 156, mobile: 95, tablet: 58 },
  { month: 'Dec', desktop: 378, mobile: 250, tablet: 167 },
];

const pieData = [
  { name: 'Desktop', value: 2890, fill: 'hsl(var(--chart-1))' },
  { name: 'Mobile', value: 1890, fill: 'hsl(var(--chart-2))' },
  { name: 'Tablet', value: 1190, fill: 'hsl(var(--chart-3))' },
];

const radialData = [
  { name: 'Desktop', value: 75, fill: 'hsl(var(--chart-1))' },
  { name: 'Mobile', value: 60, fill: 'hsl(var(--chart-2))' },
  { name: 'Tablet', value: 45, fill: 'hsl(var(--chart-3))' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ChartContainer = ({ children, config, className = '' }) => {
  return (
    <div className={`chart-container ${className}`} style={config}>
      {children}
    </div>
  );
};

export const Chart = ({ 
  data = sampleData,
  type = 'area',
  title = 'Chart Title',
  description = 'Chart description',
  showLegend = true,
  showGrid = true,
  height = 350,
  className = ''
}) => {
  const [selectedChart, setSelectedChart] = useState(type);
  const [timeRange, setTimeRange] = useState('12m');

  const filteredData = useMemo(() => {
    if (timeRange === '6m') {
      return data.slice(-6);
    } else if (timeRange === '3m') {
      return data.slice(-3);
    }
    return data;
  }, [data, timeRange]);

  const totalValues = useMemo(() => {
    return filteredData.reduce(
      (acc, curr) => ({
        desktop: acc.desktop + (curr.desktop || 0),
        mobile: acc.mobile + (curr.mobile || 0),
        tablet: acc.tablet + (curr.tablet || 0),
      }),
      { desktop: 0, mobile: 0, tablet: 0 }
    );
  }, [filteredData]);

  const trend = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0];
    const last = filteredData[filteredData.length - 1];
    const firstTotal = (first.desktop || 0) + (first.mobile || 0) + (first.tablet || 0);
    const lastTotal = (last.desktop || 0) + (last.mobile || 0) + (last.tablet || 0);
    return ((lastTotal - firstTotal) / firstTotal) * 100;
  }, [filteredData]);

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (selectedChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey="desktop"
                stroke={chartConfig.desktop.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.desktop.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartConfig.desktop.color, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="mobile"
                stroke={chartConfig.mobile.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.mobile.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartConfig.mobile.color, strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="tablet"
                stroke={chartConfig.tablet.color}
                strokeWidth={2}
                dot={{ fill: chartConfig.tablet.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartConfig.tablet.color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
              <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
              <Bar dataKey="tablet" fill={chartConfig.tablet.color} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radial':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip />
              {showLegend && <Legend />}
            </RadialBarChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey="desktop"
                stackId="1"
                stroke={chartConfig.desktop.color}
                fill={chartConfig.desktop.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stackId="1"
                stroke={chartConfig.mobile.color}
                fill={chartConfig.mobile.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="tablet"
                stackId="1"
                stroke={chartConfig.tablet.color}
                fill={chartConfig.tablet.color}
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  const getChartIcon = (chartType) => {
    switch (chartType) {
      case 'line':
        return <LineChartIcon className="h-4 w-4" />;
      case 'bar':
        return <BarChart3 className="h-4 w-4" />;
      case 'pie':
      case 'radial':
        return <PieChartIcon className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="flex items-center gap-2">
            {getChartIcon(selectedChart)}
            {title}
            <Badge variant="outline" className="ml-auto sm:ml-0">
              {trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              {Math.abs(trend).toFixed(1)}%
            </Badge>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedChart} onValueChange={setSelectedChart}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="pie">Pie</SelectItem>
              <SelectItem value="radial">Radial</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 months</SelectItem>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="12m">12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          {renderChart()}
        </ChartContainer>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {Object.entries(totalValues).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center space-y-1">
              <div className="text-2xl font-bold">{value.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground capitalize">{key}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;