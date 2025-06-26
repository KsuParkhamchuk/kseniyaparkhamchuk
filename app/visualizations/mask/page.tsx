'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const targetSequence = ["<BOS>", "The", "quick", "brown", "fox", "<EOS>"];

type TokenBoxProps = {
  token: string;
  type: 'input' | 'allowed' | 'query';
  hasArrow?: boolean;
};

const TokenBox = ({ token, type, hasArrow }: TokenBoxProps) => {
  const classNames = [styles.tokenBox];
  if (type === 'input') classNames.push(styles.inputToken);
  if (type === 'allowed') classNames.push(styles.attentionAllowed);
  if (type === 'query') classNames.push(styles.currentQuery);

  return (
    <div className={classNames.join(' ')}>
      {token}
      {hasArrow && <div className={styles.arrow}></div>}
    </div>
  );
};

const MaskVisualizationPage = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(prev => (prev < targetSequence.length - 1 ? prev + 1 : prev));
  };

  const handleReset = () => {
    setStep(0);
  };

  useEffect(() => {
    handleReset();
  }, []);

  const currentInput = targetSequence.slice(0, step + 1);
  const generatedText = targetSequence.slice(1, step + 1).join(' ');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Decoder Masked Self-Attention</h1>
        <p>Visualizing how a Transformer decoder generates text one token at a time.</p>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.infoBar}>
          <div><span className={styles.infoLabel}>Current Step:</span> <span className={styles.infoValue}>{step}</span></div>
          <div><span className={styles.infoLabel}>Generating for Position:</span> <span className={styles.infoValue}>{step + 1 >= targetSequence.length ? 'Done' : step + 1}</span></div>
          <div><span className={styles.infoLabel}>Current Input Length:</span> <span className={styles.infoValue}>{currentInput.length}</span></div>
        </div>
        <div className={styles.decoderInputSection}>
          <h3 className={styles.sectionTitle}>Decoder Input Sequence:</h3>
          <div className={styles.decoderInputContainer}>
            {currentInput.map((token, index) => <TokenBox key={`${token}-${index}`} token={token} type='input' />)}
          </div>
        </div>
        <div className={styles.controls}>
          <button onClick={handleNext} className={styles.button}>Next Step</button>
          <button onClick={handleReset} className={`${styles.button} ${styles.resetButton}`}>Reset</button>
        </div>
      </div>

      <div className={styles.visualizationGrid}>
        <div className={styles.visualizationSection}>
          <h2 className={styles.sectionHeader}>Token Attention Focus</h2>
          <p className={styles.sectionDescription}>
            This shows what the <strong className={styles.strong}>current token (Query)</strong> can &quot;look at&quot; to predict the next token. It can only see itself and previous tokens.
          </p>
          <div className={styles.attentionVizContainer}>
            {currentInput.map((token, index) => (
              <TokenBox key={`${token}-${index}`} token={token} type={index === step ? 'query' : 'allowed'} hasArrow={index === step} />
            ))}
          </div>
          <div className={styles.legendInfoBox}>
            <p><strong className={styles.strongIndigo}>Indigo Box w/ Arrow:</strong> Current &apos;Query&apos; token.</p>
            <p><strong className={styles.strongEmerald}>Green Boxes:</strong> Tokens the &apos;Query&apos; can attend to.</p>
          </div>
        </div>

        <div className={styles.visualizationSection}>
          <h2 className={styles.sectionHeader}>Attention Mask Matrix</h2>
          <p className={styles.sectionDescription}>
            This is the full &quot;causal mask&quot;. Rows are queries, columns are keys. The <strong className={styles.strong}>highlighted row</strong> matches the query above.
          </p>
          <div className={styles.matrixVizContainer}>
            <table className={styles.matrixTable}>
              <thead>
                <tr>
                  <th className={styles.headerCell}>Q \ K</th>
                  {currentInput.map((token, index) => <th key={index}>{token}</th>)}
                </tr>
              </thead>
              <tbody>
                {currentInput.map((queryToken, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === step ? styles.queryRow : ''}>
                    <th className={styles.headerCell}>{queryToken}</th>
                    {currentInput.map((_, colIndex) => (
                      <td key={colIndex} className={colIndex <= rowIndex ? styles.matrixAllowed : styles.matrixMasked}>
                        {colIndex <= rowIndex ? 1 : 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.generatedSequenceContainer}>
        <span className={styles.generatedSequenceLabel}>Generated Sequence:</span>
        <span className={styles.generatedSequenceText}>{generatedText}</span>
      </div>
    </div>
  );
};

export default MaskVisualizationPage;

