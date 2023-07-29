import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';
import { SidebarDataProvider } from './store/SidebarDataContext';

const root = document.querySelector('#root');

ReactDOM.createRoot(root).render(
    <div style={{ width: '80vw', height: '90vh', backgroundColor: '#dddcdc' }}>
      <ReactFlowProvider>
      <SidebarDataProvider>
        <App />
      </SidebarDataProvider>
      </ReactFlowProvider>
    </div>
);
