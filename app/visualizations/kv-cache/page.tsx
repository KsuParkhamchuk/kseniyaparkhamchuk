'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

interface KVCacheItem {
  key: string;
  value: string;
  id: number;
}

const KVCacheVisualizationPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('Large language models are powerful');
  const [tokens, setTokens] = useState<string[]>([]);
  const [currentTokenIndex, setCurrentTokenIndex] = useState<number>(-1);
  const [kvCache, setKvCache] = useState<KVCacheItem[]>([]);
  const [explanation, setExplanation] = useState<string>('Click "Start / Next Step" to begin processing the sequence.');
  const [attentionStatus, setAttentionStatus] = useState<string>('The current query attends to its own K/V pairs and all pairs from the cache.');
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const tokenizeInput = (text: string): string[] => {
    return text.trim().split(/\s+/).filter(Boolean);
  };

  const resetVisualization = () => {
    setTokens([]);
    setCurrentTokenIndex(-1);
    setKvCache([]);
    setExplanation('Click "Start / Next Step" to begin processing the sequence.');
    setAttentionStatus('The current query attends to its own K/V pairs and all pairs from the cache.');
    setIsFinished(false);
    setIsStarted(false);
  };

  const handleNextStep = () => {
    let currentTokens = tokens;
    if (!isStarted) {
      currentTokens = tokenizeInput(inputValue);
      if (currentTokens.length === 0) {
        setExplanation('Please enter a sequence to process.');
        return;
      }
      setTokens(currentTokens);
      setCurrentTokenIndex(0);
      setIsStarted(true);
      setIsFinished(false);
      setKvCache([]);
      setExplanation(`Processing token 0 ("${currentTokens[0]}"). New K/V pair (K0, V0) generated.`);
      return;
    }

    const nextIndex = currentTokenIndex + 1;

    if (nextIndex < currentTokens.length) {
      const newCacheItem: KVCacheItem = {
        key: `K${currentTokenIndex}`,
        value: `V${currentTokenIndex}`,
        id: currentTokenIndex,
      };
      setKvCache(prevCache => [...prevCache, newCacheItem]);
      setCurrentTokenIndex(nextIndex);
      setExplanation(`Processing token ${nextIndex} ("${currentTokens[nextIndex]}"). New K/V pair (K${nextIndex}, V${nextIndex}) generated. K/V pairs from cache are reused.`);
    } else {
      if (currentTokenIndex >= 0 && currentTokenIndex < currentTokens.length) {
         const newCacheItem: KVCacheItem = {
            key: `K${currentTokenIndex}`,
            value: `V${currentTokenIndex}`,
            id: currentTokenIndex,
          };
        setKvCache(prevCache => [...prevCache, newCacheItem]);
      }
      setCurrentTokenIndex(nextIndex);
      setIsFinished(true);
      setExplanation('All tokens processed. Final KV cache shown. Note how K/V pairs for earlier tokens were reused.');
    }
  };
  
  const renderTokens = () => {
    if (!isStarted) return <span className={styles.placeholderText}>Tokens will appear here.</span>;
    return tokens.map((token, index) => (
      <div 
        key={`token-${index}`}
        className={`${index === currentTokenIndex ? styles.tokenCurrent : styles.tokenDefault} ${styles.fadeIn}`}
      >
        {token}
      </div>
    ));
  };

  const renderKVProcessing = () => {
    if (!isStarted || isFinished || currentTokenIndex >= tokens.length) {
        if (isFinished) return <span className={styles.placeholderText}>Finished.</span>;
        return <span className={styles.placeholderText}>Waiting for input...</span>;
    }
    return (
      <>
        <div className={`${styles.kPair} ${styles.highlightProcess} ${styles.fadeIn}`}>K{currentTokenIndex}</div>
        <div className={`${styles.vPair} ${styles.highlightProcess} ${styles.fadeIn}`}>V{currentTokenIndex}</div>
      </>
    );
  };

  const renderAttentionInputs = () => {
    if (!isStarted || isFinished || currentTokenIndex >= tokens.length) return null;
    
    const elements = [];
    elements.push(<div key={`q-${currentTokenIndex}`} className={`${styles.qPair} ${styles.highlightProcess} ${styles.fadeIn}`}>Q{currentTokenIndex}</div>);

    kvCache.forEach(item => {
      elements.push(<div key={`k-cache-${item.id}`} className={`${styles.kPair} ${styles.highlightReuse} ${styles.fadeIn}`}>{item.key}</div>);
      elements.push(<div key={`v-cache-${item.id}`} className={`${styles.vPair} ${styles.highlightReuse} ${styles.fadeIn}`}>{item.value}</div>);
    });

    elements.push(<div key={`k-proc-${currentTokenIndex}`} className={`${styles.kPair} ${styles.highlightProcess} ${styles.fadeIn}`}>K{currentTokenIndex}</div>);
    elements.push(<div key={`v-proc-${currentTokenIndex}`} className={`${styles.vPair} ${styles.highlightProcess} ${styles.fadeIn}`}>V{currentTokenIndex}</div>);
    
    return elements;
  };

  const renderCacheContent = () => {
    if (kvCache.length === 0) return <span className={styles.placeholderText}>Cache is empty.</span>;
    return kvCache.map(item => (
      <React.Fragment key={`cache-item-${item.id}`}>
        <div className={`${styles.kPair} ${styles.highlightReuse} ${styles.fadeIn}`}>{item.key}</div>
        <div className={`${styles.vPair} ${styles.highlightReuse} ${styles.fadeIn}`}>{item.value}</div>
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if (isStarted && !isFinished && currentTokenIndex < tokens.length) {
        setAttentionStatus(`Calculating attention for token ${currentTokenIndex} ("${tokens[currentTokenIndex]}").`);
    } else if (isFinished) {
        setAttentionStatus('Finished processing.');
    } else {
        setAttentionStatus('The current query attends to its own K/V pairs and all pairs from the cache.');
    }
  }, [currentTokenIndex, tokens, isStarted, isFinished, kvCache]);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <h1 className={styles.headerTitle}>KV Cache Explained</h1>
        <p className={styles.headerSubtitle}>Visualizing how transformers avoid recomputing past key/value pairs.</p>
      </header>

      <div className={`${styles.containerBox} ${styles.inputSectionContainer}`}>
        <div className={styles.inputGroup}>
          <label htmlFor="input-sequence" className={styles.inputLabel}>Input Sequence:</label>
          <input 
            type="text" 
            id="input-sequence" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            disabled={isStarted && !isFinished}
            className={styles.inputField}
          />
          <p className={styles.inputDescription}>Enter a short sequence (words separated by spaces).</p>
        </div>
        <div className={styles.buttonContainer}>
          <button 
            onClick={handleNextStep} 
            disabled={isFinished}
            className={`${styles.controlButton} bg-indigo-500 hover:bg-indigo-600 text-white`}
          >
            {isStarted ? (isFinished ? 'Finished' : 'Next Step') : 'Start Processing'}
          </button>
          <button 
            onClick={resetVisualization} 
            className={`${styles.controlButton} bg-gray-500 hover:bg-gray-600 text-white`}
          >
            Reset
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.gridColumn}>
          <div className={styles.containerBox}>
            <h2 className={styles.sectionTitle}>1. Input Tokens</h2>
            <div className={`${styles.contentArea} ${styles.justifyCenter}`}>{renderTokens()}</div>
          </div>
          <div className={styles.containerBox}>
            <h2 className={styles.sectionTitle}>2. K/V Vector Generation (Current Token)</h2>
            <div className={`${styles.contentArea} ${styles.justifyCenter}`}>{renderKVProcessing()}</div>
          </div>
          <div className={styles.containerBox}>
            <h2 className={styles.sectionTitle}>4. KV Cache (Stored Past K/V Pairs)</h2>
            <p className={styles.descriptionText}>Stores K/V pairs from past tokens to be reused.</p>
            <div className={styles.kvCacheContentArea}>{renderCacheContent()}</div>
          </div>
        </div>

        <div className={styles.gridColumn}>
          <div className={styles.containerBox}>
            <h2 className={styles.sectionTitle}>3. Attention Calculation (Using Cache)</h2>
            <p className={styles.attentionStatusText}>{attentionStatus}</p>
            <div className={styles.attentionCalcContentArea}>{renderAttentionInputs()}</div>
          </div>
          <div className={styles.containerBox}>
            <h2 className={styles.sectionTitle}>Explanation</h2>
            <div className={styles.explanationDefault}>
              {explanation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KVCacheVisualizationPage;
