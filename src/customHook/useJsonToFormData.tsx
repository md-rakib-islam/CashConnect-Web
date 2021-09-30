function useJsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return [formData];
}

export default useJsonToFormData;

function buildFormData(formData, data, parentKey?: any) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}
