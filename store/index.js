import immerPlugin from '@rematch/immer';

import { init } from '@rematch/core';
import * as models from './models';

const immer = immerPlugin();

const store = init({
  models,
  plugins: [immer]
});

export default store;
