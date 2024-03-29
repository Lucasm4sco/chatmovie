import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "../services/messageService";
import { decryptText } from "../utils/cripto";

const initialState = {
    messageSocket: null,
    lastMessages: [],
    infoMessage: null,
    loading: false,
    error: null
}

export const connectWebSocket = createAsyncThunk(
    'message/connect',
    async () => {
        const webSocket = await messageService.getMessageSocket();
        return webSocket
    }
)

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        setLastMessages: (state, { payload }) => {
            state.lastMessages = payload;
            state.loading = false;
        },
        setMessages: (state, { payload }) => {
            state.infoMessage = payload;
            state.loading = false;
        },
        addMessage: (state, { payload }) => {
            state.infoMessage.messages.unshift(payload)
        },
        updateSentMessage: (state, { payload }) => {
            const membersMessage = JSON.stringify(payload.members);
            const isSameInfoMessage = state.infoMessage
                ? JSON.stringify(state.infoMessage.members) === membersMessage
                : false

            if (isSameInfoMessage && payload.key && !state.infoMessage.key)
                state.infoMessage.key = payload.key

            const decryptedMessage = JSON.parse(decryptText(payload.message, payload.key));
            const indexOfMessage = state.infoMessage.messages.findIndex(
                message => typeof message !== 'string' && message.content === decryptedMessage.content
            )

            if (indexOfMessage !== -1 && isSameInfoMessage) {
                state.infoMessage.messages[indexOfMessage].date = decryptedMessage.date
                state.infoMessage.messages[indexOfMessage].visualized = decryptedMessage.visualized
            }

            if (indexOfMessage === -1 && isSameInfoMessage)
                state.infoMessage.messages.unshift(payload.message)

            const existsMessage = state.lastMessages.findIndex(message => JSON.stringify(message.members) === membersMessage);

            if (existsMessage !== -1)
                state.lastMessages.splice(existsMessage, 1);

            state.lastMessages.unshift({
                key: payload.key,
                messages: [payload.message],
                members: payload.members
            });

        },
        updateReceivedMessage: (state, { payload }) => {
            const membersMessage = JSON.stringify(payload.members);
            const isSameInfoMessage = state.infoMessage
                ? JSON.stringify(state.infoMessage.members) === membersMessage
                : false

            if (isSameInfoMessage && payload.key && !state.infoMessage.key)
                state.infoMessage.key = payload.key

            if (isSameInfoMessage)
                state.infoMessage.messages.unshift(payload.message)

            const existsMessage = state.lastMessages.findIndex(message => JSON.stringify(message.members) === membersMessage);

            if (existsMessage !== -1)
                state.lastMessages.splice(existsMessage, 1);

            state.lastMessages.unshift({
                key: payload.key,
                messages: [payload.message],
                members: payload.members
            });
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        resetMessages: (state) => {
            state.infoMessage = null;
        },
        resetAllMessages: (state) => {
            if (state.messageSocket && state.messageSocket.readyState)
                state.messageSocket.close()

            for (const key in state)
                state[key] = initialState[key]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWebSocket.fulfilled, (state, { payload }) => {
                state.messageSocket = payload;
            })
            .addCase(connectWebSocket.pending, (state) => {
                state.loading = true
            })
    }
})

export const messageActions = messageSlice.actions;
export default messageSlice.reducer;