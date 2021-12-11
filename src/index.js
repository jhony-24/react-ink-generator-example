import React, { useEffect, useMemo } from "react";
import { render, Box, Text } from "ink";
import Select from "ink-select-input";
import Loading from "ink-spinner";
import { getTemplateGenerator } from "./utils";
import { STEPS } from "./constants";
import Input from "ink-text-input";
import useGenerator from "./useGenerator";

const App = () => {
  const {
    state,
    setTemplates,
    setDirectory,
    onCompleteTypingDirectory,
    onSelectTemplate,
  } = useGenerator();

  const selectTemplates = useMemo(
    () =>
      state.templates.map((template) => {
        return {
          label: template.name,
          value: template.path,
        };
      }),
    [state.templates]
  );

  useEffect(() => {
    getTemplateGenerator().then(setTemplates);
  }, []);

  return (
    <Box>
      {state.step === STEPS.NAME && (
        <Box>
          <Text color="cyanBright">Name directory:</Text>
          <Input
            value={state.directory}
            onChange={setDirectory}
            onSubmit={onCompleteTypingDirectory}
          />
        </Box>
      )}
      {state.step === STEPS.SELECT && (
        <Box flexDirection="column">
          <Box marginTop={1}>
            <Text color="cyanBright">Select a template</Text>
          </Box>
          <Select  items={selectTemplates} onSelect={onSelectTemplate} />
        </Box>
      )}
      {state.step === STEPS.LOADING && (
        <Box>
          <Text color="yellowBright">
            <Loading type="dots" />
            <Loading type="dots" />
            <Loading type="dots" />
          </Text>
          <Text color="yellow">Creando proyecto...</Text>
        </Box>
      )}
      {state.step === STEPS.END && (
        <Box paddingY={2}>
          <Text color="rgb(50,220,230)">
          ====================== ✨ Proyecto creado!!! ✨ ======================
          </Text>
        </Box>
      )}
    </Box>
  );
};

render(<App />);
