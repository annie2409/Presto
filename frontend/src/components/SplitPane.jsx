import { Allotment } from 'allotment';
import React, { useState } from 'react';
import { Pane } from 'split-pane-react';
import SplitPane from 'split-pane-react/esm/SplitPane';
// import { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { PresentationControls } from './PresentationControls';
// import 'allotment/dist/style.css';

export const SplitPanal = ({ children, ...props }) => {
  const [sizes, setSizes] = useState([150, '30%', 'auto']);
  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ height: '100vh', width: '100wh' }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={250} maxSize="37%">
          {/* <div style={{ background: '#ddd' }}>pane1</div> */}
          <PresentationControls />
        </Pane>
        <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
      </SplitPane>
    </div>
  );
};
