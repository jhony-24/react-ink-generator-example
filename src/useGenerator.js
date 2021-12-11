import { useReducer } from "react";
import { STEPS } from "./constants";
import { ACTIONS, reducer } from "./core/reducer";
import { state as initialState } from "./core/state";
import { copyTemplateToCurrentDirectory } from "./utils";

export default function useGenerator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDirectory = (payload) => {
    dispatch({
      type: ACTIONS.SET_NAME_DIRECTORY,
      payload,
    });
  };

  const setStep = (payload) => {
    dispatch({
      type: ACTIONS.SET_STEP,
      payload,
    });
  };

  const setTemplates = (payload) => {
    dispatch({
      type: ACTIONS.SET_TEMPLATES,
      payload,
    });
  };

  const onSelectTemplate = async ({value}) => {
    try {
        setStep(STEPS.LOADING);
        await copyTemplateToCurrentDirectory({
          from: value,
          to: state.directory,
        });
        setStep(STEPS.END);
        process.exit();
      } catch (error) {
        console.log(error.message);
      }
  }

  const onCompleteTypingDirectory = () => {
    setStep(STEPS.SELECT);
  }

  return {
    onSelectTemplate,
    onCompleteTypingDirectory,
    state,
    setTemplates,
    setDirectory,
    setStep,
    dispatch
  };
}
