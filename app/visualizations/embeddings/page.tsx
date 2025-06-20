'use client';

import React, { useEffect, useRef } from 'react';
import styles from './page.module.css';

const EmbeddingsVisualizationPage: React.FC = () => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentStepRefs = stepRefs.current.filter(el => el !== null) as HTMLDivElement[];
    const currentArrowRefs = arrowRefs.current.filter(el => el !== null) as HTMLDivElement[];
    const allElements = [...currentStepRefs, ...currentArrowRefs];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.visible);
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    allElements.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      allElements.forEach((el) => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  const addStepRef = (el: HTMLDivElement | null) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };
  const addArrowRef = (el: HTMLDivElement | null) => {
    if (el && !arrowRefs.current.includes(el)) {
      arrowRefs.current.push(el);
    }
  };


  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>How Transformer Embeddings Work</h1>
            <p>A step-by-step visual explanation.</p>
          </div>

          <div className={styles.stepsWrapper}>
            <div id="step-1" ref={addStepRef} className={`${styles.stepContainer} ${styles.stepCard}`}>
              <h2 className={styles.stepTitle}>Step 1: Start with Input Text</h2>
              <p className={styles.stepText}>Everything begins with a simple string of text, like a question or a sentence.</p>
              <div className={styles.inputTextBox}>
                <p>&quot;What is the best book?&quot;</p>
              </div>
            </div>

            <div id="arrow-1" ref={addArrowRef} className={styles.arrow}>↓</div>

            <div id="step-2" ref={addStepRef} className={`${styles.stepContainer} ${styles.stepCard}`}>
              <h2 className={styles.stepTitle}>Step 2: Tokenization</h2>
              <p className={styles.stepText}>The text is broken down into smaller pieces called &quot;tokens&quot;. These can be words or sub-words.</p>
              <div className={styles.tokenContainer}>
                <div className={`${styles.token} ${styles.tokenBlue}`}>&quot;What&quot;</div>
                <div className={`${styles.token} ${styles.tokenGreen}`}>&quot;is&quot;</div>
                <div className={`${styles.token} ${styles.tokenYellow}`}>&quot;the&quot;</div>
                <div className={`${styles.token} ${styles.tokenPurple}`}>&quot;best&quot;</div>
                <div className={`${styles.token} ${styles.tokenPink}`}>&quot;book&quot;</div>
                <div className={`${styles.token} ${styles.tokenRed}`}>&quot;?&quot;</div>
              </div>
            </div>

            <div id="arrow-2" ref={addArrowRef} className={styles.arrow}>↓</div>

            <div id="step-3" ref={addStepRef} className={`${styles.stepContainer} ${styles.stepCard}`}>
              <h2 className={styles.stepTitle}>Step 3: Assign Numerical IDs</h2>
              <p className={styles.stepText}>Each token is mapped to a unique integer from a predefined vocabulary.</p>
              <div className={styles.tokenContainer}>
                <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenBlue}`}>&quot;What&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberBlue}`}>4827</div>
                </div>
                 <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenGreen}`}>&quot;is&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberGreen}`}>382</div>
                </div>
                 <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenYellow}`}>&quot;the&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberYellow}`}>290</div>
                </div>
                 <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenPurple}`}>&quot;best&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberPurple}`}>1636</div>
                </div>
                 <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenPink}`}>&quot;book&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberPink}`}>30988</div>
                </div>
                <div className={styles.idMapping}>
                  <div className={`${styles.token} ${styles.tokenRed}`}>&quot;?&quot;</div>
                  <div className={styles.arrowSymbol}>→</div>
                  <div className={`${styles.idNumber} ${styles.idNumberRed}`}>30</div>
                </div>
              </div>
            </div>

            <div id="arrow-3" ref={addArrowRef} className={styles.arrow}>↓</div>

            <div id="step-4" ref={addStepRef} className={`${styles.stepContainer} ${styles.stepCard}`}>
                 <h2 className={styles.stepTitle}>Step 4: Create Token & Positional Embeddings</h2>
                <p className={styles.stepText}>Each token ID is converted into a vector (a list of numbers), called a <span className={`${styles.highlight} ${styles.highlightIndigo}`}>Token Embedding</span>. This vector captures the token&apos;s meaning. Separately, a <span className={`${styles.highlight} ${styles.highlightTeal}`}>Positional Embedding</span> is created for each position (0, 1, 2, ...) to give the model a sense of word order.</p>

                <div className={styles.embeddingContainer}>
                    <div className={styles.embeddingBox}>
                        <h3 className={`${styles.embeddingTitle} ${styles.embeddingTitleIndigo}`}>Token Embeddings</h3>
                        <div className={`${styles.embeddingContent} ${styles.embeddingContentIndigo}`}>
                            <div><span className={styles.label}>4827</span> (&quot;What&quot;) → <span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.8</span><span className={styles.embeddingVector}>-0.2</span>...</div>
                             <div><span className={styles.label}>382</span> (&quot;is&quot;) → <span className={styles.embeddingVector}>0.3</span><span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.9</span>...</div>
                        </div>
                    </div>

                    <div className={styles.embeddingBox}>
                        <h3 className={`${styles.embeddingTitle} ${styles.embeddingTitleTeal}`}>Positional Embeddings</h3>
                        <div className={`${styles.embeddingContent} ${styles.embeddingContentTeal}`}>
                           <div><span className={styles.label}>Pos 0</span> → <span className={styles.embeddingVector}>0.5</span><span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.2</span>...</div>
                           <div><span className={styles.label}>Pos 1</span> → <span className={styles.embeddingVector}>0.6</span><span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.3</span>...</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="arrow-4" ref={addArrowRef} className={styles.arrow}>↓</div>

            <div id="step-5" ref={addStepRef} className={`${styles.stepContainer} ${styles.stepCard} ${styles.stepCardLarge}`}>
                <h2 className={styles.stepTitle} style={{ textAlign: 'center' }}>Step 5: Combine to Create Final Embeddings</h2>
                <p className={styles.stepText} style={{ textAlign: 'center' }}>Finally, the Token Embedding and the Positional Embedding are added together for each token to produce the final embedding that is fed into the Transformer model.</p>

                <div className={styles.finalEmbeddingWrapper}>
                    <div className={styles.embeddingComboItem}>
                        <div className={`${styles.label} ${styles.labelIndigo}`}>Token Emb (&quot;What&quot;)</div>
                        <div className={`${styles.embeddingComboBox} ${styles.embeddingComboBoxIndigo}`}>
                           <span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.8</span><span className={styles.embeddingVector}>-0.2</span>
                        </div>
                    </div>

                    <div className={styles.plusSign}>+</div>

                     <div className={styles.embeddingComboItem}>
                        <div className={`${styles.label} ${styles.labelTeal}`}>Position Emb (Pos 0)</div>
                        <div className={`${styles.embeddingComboBox} ${styles.embeddingComboBoxTeal}`}>
                           <span className={styles.embeddingVector}>0.5</span><span className={styles.embeddingVector}>0.1</span><span className={styles.embeddingVector}>0.2</span>
                        </div>
                    </div>

                    <div className={styles.plusSign}>=</div>

                    <div className={styles.embeddingComboItem}>
                        <div className={`${styles.label} ${styles.labelGray}`} style={{ fontWeight: 700 }}>Final Embedding</div>
                         <div className={`${styles.embeddingComboBox} ${styles.embeddingComboBoxGray}`}>
                           <span className={styles.embeddingVector}>0.6</span><span className={styles.embeddingVector}>0.9</span><span className={styles.embeddingVector}>0.0</span>
                        </div>
                    </div>
                </div>

                <div className={styles.finalExplanation}>
                    <p>This final vector, which contains information about both the <span className={styles.highlight}>meaning</span> and <span className={styles.highlight}>position</span> of the token, is ready for the Transformer&apos;s attention mechanism.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmbeddingsVisualizationPage;

