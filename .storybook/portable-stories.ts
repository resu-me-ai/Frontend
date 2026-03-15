/**
 * Portable Stories Setup
 *
 * This file enables composeStories() to work correctly by applying
 * project-level decorators and parameters from preview.tsx.
 *
 * Import this file once in test setup or story composition helpers.
 *
 * @see https://storybook.js.org/docs/api/portable-stories/portable-stories-react#setprojectannotations
 */
import { setProjectAnnotations } from '@storybook/react-vite';
import * as previewAnnotations from './preview';

// Apply project-level annotations (decorators, parameters, globalTypes)
setProjectAnnotations([previewAnnotations]);
