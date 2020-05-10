import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { initReducer } from 'reducers';
import { loggerMiddleware } from 'middlewares/logger';
import { botAnswerMiddleware } from 'middlewares/botAnswer';
import { highlightingChatWithUnreadMessageMiddleware } from 'middlewares/highlightingChatWithUnreadMessage';

export const history = createBrowserHistory();

const persistConfig = {
    key: 'root',
    storage,
};

export const initStore = () => {
    const store = createStore(
        persistReducer(persistConfig, initReducer(history)),
        composeWithDevTools(
            applyMiddleware(
                //loggerMiddleware,
                routerMiddleware(history),
                botAnswerMiddleware,
                highlightingChatWithUnreadMessageMiddleware,
            )
        ),
    );
    const persistor = persistStore(store);
    return { store, persistor };
};
