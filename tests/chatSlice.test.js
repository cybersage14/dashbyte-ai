const chatReducer = require('../redux/chatSlice').default;
const { addMessages } = require('../redux/chatSlice');
const { createStore } = require('@reduxjs/toolkit');

test('addMessages correctly updates the state', () => {
  const store = createStore(chatReducer);
  const messages = [{ role: 'user', content: 'Hello' }];

  store.dispatch(addMessages(messages));

  expect(store.getState().messages).toEqual(messages);
});
