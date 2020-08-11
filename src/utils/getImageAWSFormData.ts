export const getImageAWSFormData = (imageFields: any, file: File) => {
  const form = new FormData();

  form.append('X-Amz-Credential', imageFields['X-Amz-Credential']);
  form.append('X-Amz-Algorithm', imageFields['X-Amz-Algorithm']);
  form.append('Policy', imageFields.Policy);
  form.append('X-Amz-Signature', imageFields['X-Amz-Signature']);
  form.append('X-Amz-Date', imageFields['X-Amz-Date']);
  form.append('Content-Type', imageFields['Content-Type']);
  form.append('key', imageFields.key);
  form.append('acl', imageFields.acl);
  form.append('file', file);

  return form;
};
