import React, { createContext, useReducer, useContext } from "react";
import { speechDataReducer } from "../reducers/SpeechDataReducer";

const SpeechDataContext = createContext();
const SpeechDataDispatchContext = createContext();

function SpeechDataProvider({ children }) {

  const [SpeechData, SpeechDataDispatch] = useReducer(speechDataReducer, {
    speechReference: null,
    primaryUtteranceObject: null,
    secondaryUtteranceObject: null,
    primaryVoiceOptions: null,
    secondaryVoiceOptions: null,
    primaryVoiceLang: null,
    secondaryVoiceLang: null,
    primaryVoicePitch: null,
    secondaryVoicePitch: null,
    primaryVoiceRate: null,
    secondaryVoiceRate: null,
    primaryVoiceObject: null,
    secondaryVoiceObject: null,
    primaryVoiceVolume: null,
    secondaryVoiceVolume: null,
    primaryIntro: null,
    secondaryIntro: null,
    modified: false,
  });
  return (
    <SpeechDataContext.Provider value={SpeechData}>
      <SpeechDataDispatchContext.Provider value={SpeechDataDispatch}>
        {children}
      </SpeechDataDispatchContext.Provider>
    </SpeechDataContext.Provider>
  );
}

function useSpeechData() {
  const context = useContext(SpeechDataContext);
  if (context === undefined) {
    throw new Error("useSpeechData must be used within a SpeechDataProvider");
  }
  return context;
}

function useSpeechDataDispatch() {
  const context = useContext(SpeechDataDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSpeechDataDispatch must be used within a SpeechDataProvider"
    );
  }
  return context;
}

export { SpeechDataProvider, useSpeechData, useSpeechDataDispatch };
