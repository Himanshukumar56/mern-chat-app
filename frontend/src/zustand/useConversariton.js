import {create} from 'zustand';

const useConversariton = create(set) => ({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation) => set({selectedConversation}),
    messages : [],
    setMessages : (messages) => set({messages}),
})

export default useConversariton

