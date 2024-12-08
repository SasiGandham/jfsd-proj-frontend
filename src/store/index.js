import { configureStore } from '@reduxjs/toolkit';
import  {signUpReducer} from './SignUpSlice.js'
import { loginReducer } from './LoginSlice.js'
import  postsReducer from './postsSlice.js' 

const store = configureStore({
    reducer: {
        login: loginReducer,
        signUp: signUpReducer,
        posts: postsReducer,
    }
})

export default store;