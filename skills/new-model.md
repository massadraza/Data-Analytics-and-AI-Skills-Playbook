Scaffold a new model experiment based on $ARGUMENTS (description of what's different about this model).

1. Create a new folder with the next available experiment number, or a descriptive name derived from the argument
2. Copy the structure from the most recent/production model folder as the base template
3. Update the shared pipeline/feature code to reflect any feature changes described in the argument
4. Add a `README.md` in the new folder describing what this experiment tests and how it differs from prior models
5. Leave TODOs where the user needs to make decisions (hyperparameters, feature selection, etc.)

Do not copy data files — reference the existing dataset with a relative path instead.
