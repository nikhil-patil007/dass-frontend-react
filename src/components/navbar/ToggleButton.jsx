import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '@/assets/styles/nav.css';

const ToggleButton = () => {
  const buttonRef = useRef(null);
  const dotsRef = useRef([]);
  const textRef = useRef(null);
  const altTextRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const allDots = dotsRef.current.slice(0, 9);
    const leftMiddle = dotsRef.current[3];  // dot 4 (index 3)
    const rightMiddle = dotsRef.current[5]; // dot 6 (index 5)
    
    // For 3x3 grid positions
    const gridPositions = [
      { x: 0, y: 0 },     // 0: top-left
      { x: 8, y: 0 },     // 1: top-center
      { x: 16, y: 0 },    // 2: top-right
      { x: 0, y: 8 },     // 3: middle-left
      { x: 8, y: 8 },     // 4: center
      { x: 16, y: 8 },    // 5: middle-right
      { x: 0, y: 16 },    // 6: bottom-left
      { x: 8, y: 16 },    // 7: bottom-center
      { x: 16, y: 16 },   // 8: bottom-right
    ];
    
    // Initial hexagon state - hide left and right middle dots
    gsap.set([leftMiddle, rightMiddle], { scale: 0, opacity: 0 });
    
    const tl = gsap.timeline({ paused: true });

    // On hover: move all dots to 3x3 grid positions and show hidden dots
    allDots.forEach((dot, i) => {
      if (dot) {
        tl.to(dot, {
          left: gridPositions[i].x + 'px',
          top: gridPositions[i].y + 'px',
          duration: 0.4,
          ease: 'power2.out'
        }, 0);
      }
    });
    
    // Show the left and right middle dots
    tl.to([leftMiddle, rightMiddle], {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0);
    
    // Set initial transforms for centered text
    gsap.set(textRef.current, { 
      xPercent: -50, 
      yPercent: -50,
      y: 0
    });
    
    gsap.set(altTextRef.current, { 
      xPercent: -50, 
      yPercent: -50,
      y: 30,
      opacity: 0
    });
    
    tl.to(textRef.current, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '<').to(altTextRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '<');

    button.addEventListener('mouseenter', () => tl.play());
    button.addEventListener('mouseleave', () => tl.reverse());

    return () => {
      button.removeEventListener('mouseenter', () => tl.play());
      button.removeEventListener('mouseleave', () => tl.reverse());
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="toggle-button-wrapper"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: 'transparent',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        color: '#222',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      <div 
        className="toggle-dots-container"
        style={{ 
          position: 'relative',
          width: '40px',
          height: '40px',
          background: '#f5f5f0',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div style={{ 
          position: 'relative',
          width: '20px',
          height: '26px',
        }}>
        {/* Hexagon shape (7 dots) + 2 extra for grid */}
        
        {/* Top single dot */}
        <span
          ref={el => dotsRef.current[0] = el}
          style={{
            position: 'absolute',
            left: '8px',
            top: '0px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        
        {/* Upper middle row - 2 dots */}
        <span
          ref={el => dotsRef.current[1] = el}
          style={{
            position: 'absolute',
            left: '2px',
            top: '6px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        <span
          ref={el => dotsRef.current[2] = el}
          style={{
            position: 'absolute',
            left: '14px',
            top: '6px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        
        {/* Center row - 3 dots (left, center, right) */}
        <span
          ref={el => dotsRef.current[3] = el}
          style={{
            position: 'absolute',
            left: '0px',
            top: '11px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        <span
          ref={el => dotsRef.current[4] = el}
          style={{
            position: 'absolute',
            left: '8px',
            top: '11px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        <span
          ref={el => dotsRef.current[5] = el}
          style={{
            position: 'absolute',
            left: '16px',
            top: '11px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        
        {/* Lower middle row - 2 dots */}
        <span
          ref={el => dotsRef.current[6] = el}
          style={{
            position: 'absolute',
            left: '2px',
            top: '16px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        <span
          ref={el => dotsRef.current[7] = el}
          style={{
            position: 'absolute',
            left: '14px',
            top: '16px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        
        {/* Bottom single dot */}
        <span
          ref={el => dotsRef.current[8] = el}
          style={{
            position: 'absolute',
            left: '8px',
            top: '22px',
            width: '4px',
            height: '4px',
            background: '#222',
            borderRadius: '50%',
          }}
        />
        </div>
      </div>
      <div 
        className="toggle-text-container-box"
        style={{ 
          position: 'relative',
          height: '40px',
          minWidth: '140px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '16px',
          paddingRight: '16px',
          background: '#f5f5f0',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
        }}>
        <span 
          ref={textRef} 
          style={{ 
            position: 'absolute', 
            top: '50%',
            left: '50%',
            whiteSpace: 'nowrap',
          }}
        >
          experience view
        </span>
        <span 
          ref={altTextRef} 
          style={{ 
            position: 'absolute', 
            top: '50%',
            left: '50%',
            opacity: 0,
            whiteSpace: 'nowrap',
          }}
        >
          grid view
        </span>
      </div>
    </button>
  );
};

export default ToggleButton;