// src/components/LineChartComponent.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';

// Utility function to format data for the chart
const formatData = (salesData) => {
  // Create a map to accumulate sales data by date
  const salesMap = salesData.reduce((acc, curr) => {
    const date = moment(curr.orderDate).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = { date, total: 0, count: 0 };
    }
    acc[date].total += curr.total;
    acc[date].count += 1;
    return acc;
  }, {});

  // Convert the map to an array and calculate average sales
  return Object.values(salesMap).map(item => ({
    date: item.date,
    total: item.total,
    avg: item.total / item.count
  }));
};

// Assume this is passed from the parent component
const salesData = [
  { orderDate: '2024-01-01', total: 1500 },
  { orderDate: '2024-01-01', total: 1100 },
  { orderDate: '2024-01-02', total: 1200 },
  { orderDate: '2024-01-02', total: 1000 },
  { orderDate: '2024-01-03', total: 1800 },
  { orderDate: '2024-01-03', total: 1600 },
  { orderDate: '2024-01-04', total: 1600 },
  { orderDate: '2024-01-05', total: 1400 },
  { orderDate: '2024-01-05', total: 2100 },
  { orderDate: '2024-01-06', total: 1700 },
  { orderDate: '2024-01-07', total: 1100 },
  { orderDate: '2024-01-08', total: 1900 },
  { orderDate: '2024-01-09', total: 1300 },
  { orderDate: '2024-01-10', total: 1250 },
  { orderDate: '2024-01-11', total: 1550 },
  { orderDate: '2024-01-11', total: 1650 },
  { orderDate: '2024-01-12', total: 1450 },
  { orderDate: '2024-01-13', total: 1750 }
];

const formattedData = formatData(salesData);

const LineChartComponent = () => (
  <Paper style={{ padding: 20, height: '800px', width: "93%" }}>
    <Typography variant="h6" component="h2" gutterBottom>
      Sales Overview
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Sales Amount', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Sales" />
        <Line type="monotone" dataKey="avg" stroke="#82ca9d" name="Average Sales" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default LineChartComponent;
