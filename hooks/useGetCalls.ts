import { useState } from "react"

export const useGetCalls = () => {
    // Stubbed out Stream API since we are using pure WebRTC
    return {
        endedCalls: [],
        upcomingCalls: [],
        callrecordings: [],
        isLoading: false,
    }
}