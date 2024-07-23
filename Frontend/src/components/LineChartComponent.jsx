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

const LineChartComponent = ({ data }) => (
  <Paper style={{ padding: 20, height: '400px', width: '93%' }}>
    <Typography variant="h6" component="h2" gutterBottom>
      Sales Overview
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Sales Amount', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Due" />
        <Line type="monotone" dataKey="sub" stroke="#82ca9d" name="Sub Total" />
        <Line type="monotone" dataKey="tax" stroke="#82ca9d" name="Taxes" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default LineChartComponent;
