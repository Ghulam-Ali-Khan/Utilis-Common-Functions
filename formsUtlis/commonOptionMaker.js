// Return options array for forms select fields like array of objects with label and value you just have to pass key of label and value and array it also supports nested key

// Ghulam Ali Helpers


// It is a common options maker we can make any option array from it by pasing value key and label key to it

export const getValueByPath = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

export const getCommonOptionsMaker = (optionsArray, valueKey = 'id', labelKey = 'name') =>
  optionsArray
    ? optionsArray?.map(item => ({
      value: getValueByPath(item, valueKey),
      label: getValueByPath(item, labelKey),
      }))
    : [];