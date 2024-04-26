import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null
    },
    reducers:{
        // multiple actions
        getUser:(state,action)=>{
            state.user = action.payload;
        },
        getOtherusers:(state,action)=>{
            state.otherUsers = action.payload;
        },
        getMyprofile:(state,action)=>{
            state.profile= action.payload
        },
        followingUpdate:(state,action)=>{
            if(state.user.following.includes(action.payload)){
                state.user.following = state.user.following.filter((itemid)=>{
                    return itemid !== action.payload;
                })
            }else{
                state.user.following.push(action.payload);
            }
        }
    }

})

export const {getUser,getOtherusers,getMyprofile,followingUpdate} = userSlice.actions;
export default userSlice.reducer;