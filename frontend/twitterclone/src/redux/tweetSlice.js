import {createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        tweets:null,
        refresh:false,
        isActive:true     
    },
    reducers:{
        // multiple actions
        getAllTweets:(state,action)=>{
            state.tweets = action.payload;
        },
        getrefresh:(state)=>{
            state.refresh = !state.refresh
        },
        getisActive:(state,action)=>{
            state.isActive = action.payload
        }    
    }

})

export const {getAllTweets,getrefresh,getisActive} = tweetSlice.actions;
export default tweetSlice.reducer;