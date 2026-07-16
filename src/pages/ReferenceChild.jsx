import { useParams } from "react-router-dom";
import { REFERENCE } from "@/data/reference";
import { motion } from "motion/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, CheckCheck } from 'lucide-react';
import styles from "./ReferenceChild.module.scss"
import { useState, useEffect } from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

export default function ReferenceChild() {
  const { slug } = useParams();  
  
  const childPage = REFERENCE.find(
    item => item.slug === slug
  );

  const subChildPage = REFERENCE
  .flatMap((item) => item.submenu || []) // || [] => array don't submenu
  .filter((e) => e.slug === slug);

  const hasPage = childPage || subChildPage[0] || null;  
  
  const [copiedIndex, setCopiedIndex] = useState([]);

  const handleCopyCode = async (code, index) => { 
    await navigator.clipboard.writeText(code);
    setCopiedIndex((prev) => {      
      if (prev.includes(index)) {
        return prev;
      }
      
      return [...prev, index]
    });
    
    setTimeout(() => {
      setCopiedIndex((prev) => prev.filter((item) => item !== index));
    }, 2000);
  }

  useEffect(() => {
    console.log(copiedIndex, 'last');
  }, [copiedIndex]);  
  
  return (    
    hasPage ? (
      <div>
        <h2 className="clr-primary">{hasPage.title}</h2>
        <p>{hasPage.description}</p>
        { hasPage?.sections.map((section, index) => (
          <motion.section
            initial={{ opacity: 0, x: 5}}
            animate={{ opacity: 1, x: 0}}
            className="mt-3"
            key={index}
          >
            {section.title && (
              <h3>{section.title}</h3>
            )}
            {section.subtitle && (
              <h4>{section.subtitle}</h4>
            )}            
            <div>
              {section.description}
              {section?.code && (
                <div className={styles.codeFrame}>
                  <button type="button" onClick={() => {handleCopyCode(section.code, (index))}} className={`${styles.btn_copy} cursor-pointer`}>
                    { copiedIndex.includes(index) ? <CheckCheck size={15} /> : <Copy size={15} />}
                  </button>                  
                  <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    className={styles.code_pre}
                  >
                    {section.code}
                  </SyntaxHighlighter>
                </div>                
              )}
            </div>
          </motion.section>
        ))}
      </div>
    ) : (
      <p>Page not Found!</p>
    )
  )
}