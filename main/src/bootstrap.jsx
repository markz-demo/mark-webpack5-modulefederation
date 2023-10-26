import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from "./router";

const root = document.createElement('div');
document.body.append(root);
createRoot(root).render(<Router />);
