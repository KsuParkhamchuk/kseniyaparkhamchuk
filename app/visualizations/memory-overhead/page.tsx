'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

const models = [
  { name: '7B', params: 7e9, layers: 32, hiddenSize: 4096, heads: 32 },
  { name: '13B', params: 13e9, layers: 40, hiddenSize: 5120, heads: 40 },
  { name: '30B', params: 30e9, layers: 60, hiddenSize: 6656, heads: 52 },
  { name: '65B', params: 65e9, layers: 80, hiddenSize: 8192, heads: 64 },
  { name: '175B', params: 175e9, layers: 96, hiddenSize: 12288, heads: 96 }
];

const ModelMemoryComparison = () => {
  const [sequenceLength, setSequenceLength] = useState(4096);
  const [batchSize, setBatchSize] = useState(32);

  const calculateMemory = (model: {name: string, params: number, layers: number, hiddenSize: number, heads: number}, seqLen: number, batch: number) => {
    const modelWeights = (model.params * 2) / (1024 ** 3); // GB
    const kvCachePerLayer = 2 * batch * seqLen * model.hiddenSize * 2;
    const totalKvCache = (kvCachePerLayer * model.layers) / (1024 ** 3); // GB
    const totalWithCache = modelWeights + totalKvCache;
    const cacheOverhead = (totalKvCache / modelWeights) * 100;

    return {
      name: model.name,
      parameters: `${model.params / 1e9}B`,
      modelWeights: modelWeights,
      kvCacheSize: totalKvCache,
      totalWithCache: totalWithCache,
      cacheOverhead: cacheOverhead,
    };
  };

  const data = models.map(model => calculateMemory(model, sequenceLength, batchSize));
  const maxMemory = Math.max(...data.map(d => d.totalWithCache), 250); 
  const yAxisMax = Math.ceil(maxMemory / 250) * 250;

  const chartWidth = 800;
  const chartHeight = 400;
  const yAxisAreaWidth = 50;
  const xAxisAreaHeight = 50;
  const plotAreaWidth = chartWidth - yAxisAreaWidth;
  const plotAreaHeight = chartHeight - xAxisAreaHeight;
  const groupWidth = plotAreaWidth / data.length;
  const barWidth = 48;
  const barSpacing = 8;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Model Memory Usage: Impact of KV Cache</h1>

      <div className={styles.controls}>
        <div className={styles.sliderContainer}>
          <label>Sequence Length: {sequenceLength.toLocaleString()} tokens</label>
          <input
            type="range" min="512" max="8192" step="1" value={sequenceLength}
            onChange={(e) => setSequenceLength(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}><span>512</span><span>4K</span><span>8K</span></div>
        </div>
        <div className={styles.sliderContainer}>
          <label>Batch Size: {batchSize}</label>
          <input
            type="range" min="1" max="32" step="1" value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className={`${styles.slider} ${styles.sliderGreen}`}
          />
          <div className={styles.sliderLabels}><span>1</span><span>16</span><span>32</span></div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} aria-labelledby="chart-title" role="img">
          <g className={styles.gridY}>
            {[...Array(5)].map((_, i) => {
              const y = plotAreaHeight - i * (plotAreaHeight / 4);
              return (
                <g key={i}>
                  <line x1={yAxisAreaWidth} x2={chartWidth} y1={y} y2={y} stroke="#e0e0e0" strokeDasharray="3 3"/>
                  <text x={yAxisAreaWidth - 8} y={y + 4} textAnchor="end" className={styles.axisLabel}>
                    {i * (yAxisMax / 4)}
                  </text>
                </g>
              );
            })}
          </g>
          <text x={15} y={plotAreaHeight / 2} transform={`rotate(-90, 15, ${plotAreaHeight/2})`} textAnchor="middle" className={styles.axisTitle}>Memory (GB)</text>

          {data.map((d, index) => {
            const groupX = yAxisAreaWidth + index * groupWidth;
            const modelBarHeight = (d.modelWeights / yAxisMax) * plotAreaHeight;
            const totalBarHeight = (d.totalWithCache / yAxisMax) * plotAreaHeight;
            
            return (
              <g key={d.name}>
                <rect
                  x={groupX + (groupWidth / 2) - barWidth - (barSpacing / 2)}
                  y={plotAreaHeight - modelBarHeight}
                  width={barWidth}
                  height={modelBarHeight}
                  className={styles.barBlue}
                />
                <rect
                  x={groupX + (groupWidth / 2) + (barSpacing / 2)}
                  y={plotAreaHeight - totalBarHeight}
                  width={barWidth}
                  height={totalBarHeight}
                  className={styles.barRed}
                />
                <text x={groupX + groupWidth / 2} y={plotAreaHeight + 20} textAnchor="middle" className={styles.axisLabel}>
                  {d.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className={styles.chartLegend}>
          <span><span className={`${styles.legendColorBox} ${styles.legendBlue}`}></span>Model Weights Only</span>
          <span><span className={`${styles.legendColorBox} ${styles.legendRed}`}></span>Model + KV Cache</span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Model</th><th>Parameters</th><th>Model Weights (GB)</th><th>KV Cache (GB)</th><th>Total (GB)</th><th>Cache Overhead</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.name}>
                <td>{d.name}</td><td>{d.parameters}</td><td>{d.modelWeights.toFixed(1)}</td>
                <td className={styles.highlightCell}>{d.kvCacheSize.toFixed(1)}</td>
                <td>{d.totalWithCache.toFixed(1)}</td>
                <td><span className={styles.overheadBadge}>+{d.cacheOverhead.toFixed(0)}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Key Insights --- */}
      <div className={styles.insights}>
        <h3>Key Insights:</h3>
        <ul>
          <li>KV cache grows linearly with sequence length and batch size</li>
          <li>For long sequences, KV cache can exceed model weight memory</li>
          <li>Larger models have proportionally smaller KV cache overhead</li>
          <li>Memory requirements scale quadratically with attention heads</li>
        </ul>
      </div>
    </div>
  );
};

export default ModelMemoryComparison;