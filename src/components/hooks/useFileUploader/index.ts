import React from 'react';
import uuid from 'react-uuid';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';

import { FileDataType } from 'types/file';

import { uploadFileAWS, validateFile } from './utils';

export type FileType = {
  id: string;
  image_id: string;
  url: string;
  isLoaded?: boolean;
  isFailed?: boolean;
};

type Options = {
  disabled?: boolean;
  usePasteEvent?: boolean;
  initFiles?: FileDataType[];
  additionalFiles?: FileDataType[];
  onFailedLoadFile?: (fileName: string) => void;
  dropElement?: any;
  beforeUpload?: (data: File) => Promise<File>;
} & DropzoneOptions;

export default ({
  initFiles,
  additionalFiles,
  onFailedLoadFile,
  disabled,
  accept,
  usePasteEvent,
  dropElement,
  multiple,
  beforeUpload,
  ...options
}: Options) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<FileType[]>([]);

  React.useEffect(() => {
    if (!dropElement) {
      return;
    }

    if (disabled) {
      dropElement.removeEventListener('drop', handleDrop);

      return;
    }

    dropElement.addEventListener('drop', handleDrop);

    return () => {
      dropElement.removeEventListener('drop', handleDrop);
    };
    // eslint-disable-next-line
  }, [files, disabled, dropElement]);

  React.useEffect(() => {
    if (!usePasteEvent || disabled) {
      window.removeEventListener('paste', handlePaste, false);

      return;
    }

    window.addEventListener('paste', handlePaste, false);

    return () => {
      window.removeEventListener('paste', handlePaste, false);
    };
    // eslint-disable-next-line
  }, [usePasteEvent, disabled]);

  React.useEffect(() => {
    if (!initFiles) {
      return;
    }

    const filesToAdd = files.length
      ? initFiles.filter((file) =>
          files.every((item) => item.image_id !== file.image_id)
        )
      : initFiles;
    const initData = filesToAdd.map((item) => ({
      id: item.id,
      image_id: item.image_id,
      url: item.url,
      isLoaded: true,
      isFailed: false,
    }));

    if (initData.length) {
      setFiles(files.concat(...initData));
    }
    // eslint-disable-next-line
  }, [initFiles]);

  React.useEffect(() => {
    if (!additionalFiles) {
      return;
    }

    const filesToAdd = files.length
      ? additionalFiles.filter((file) =>
          files.every((item) => item.image_id !== file.image_id)
        )
      : additionalFiles;
    const initData = filesToAdd.map((item) => ({
      id: item.id,
      image_id: item.image_id,
      url: item.url,
      isLoaded: true,
      isFailed: false,
    }));

    if (initData.length) {
      setFiles(files.concat(...initData));
    }
    // eslint-disable-next-line
  }, [additionalFiles]);

  const handlePaste = async (e: ClipboardEvent) => {
    const { items } = e.clipboardData;
    const addFiles = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') === -1) {
        continue; // eslint-disable-line
      }

      const file = items[i].getAsFile();

      if (file) {
        addFiles.push(file);
      }
    }

    if (addFiles.length) {
      handleDropFiles(addFiles, [], {});

      e.preventDefault();
    }
  };

  const uploadFile = React.useCallback(
    async (file: File): Promise<void> => {
      let processedFile;

      if (beforeUpload) {
        try {
          processedFile = await beforeUpload(file);
        } catch {
          return;
        }
      }

      try {
        const resourceData = await uploadFileAWS(processedFile || file);

        setFiles((state) => {
          // const loadedFile = processedFile || file;

          return multiple
            ? [
                ...state,
                {
                  id: uuid(),
                  image_id: resourceData.image_id,
                  url: resourceData.url,
                  isLoaded: true,
                  isFailed: false,
                },
              ]
            : [
                {
                  id: uuid(),
                  image_id: resourceData.image_id,
                  url: resourceData.url,
                  isLoaded: true,
                  isFailed: false,
                },
              ];
        });
      } catch (error) {
        if (onFailedLoadFile) {
          onFailedLoadFile(file.name);
        }

        setFiles((state) =>
          multiple
            ? [
                ...state,
                {
                  id: uuid(),
                  image_id: null,
                  url: null,
                  isLoaded: false,
                  isFailed: true,
                },
              ]
            : [
                {
                  id: uuid(),
                  image_id: null,
                  url: null,
                  isLoaded: false,
                  isFailed: true,
                },
              ]
        );
      }
    },
    // eslint-disable-next-line
    [files]
  );

  const handleDropFiles = React.useCallback(
    async (
      droppedFiles: File[], // eslint-disable-line
      rejectedFiles: FileRejection[] = [], // eslint-disable-line
      e: any = {} // eslint-disable-line
    ) => {
      setIsLoading(true);

      await Promise.all(droppedFiles.map((file) => uploadFile(file)));

      setIsLoading(false);
    },
    // eslint-disable-next-line
    [files]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    ...options,
    multiple,
    accept,
    disabled,
    onDrop: handleDropFiles,
  });

  const handleRemoveFile = React.useCallback(
    (fileData: FileType) => (
      e: React.MouseEvent<HTMLSpanElement | HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      console.log(files);

      const filteredFiles = files.filter((data) => data.id !== fileData.id);

      console.log(filteredFiles);

      setFiles(filteredFiles);
    },
    [files]
  );

  const handleAddFile = React.useCallback(
    (file: Partial<FileType>) => {
      setFiles(
        files.concat({
          ...file,
          isLoaded: true,
          isFailed: false,
        } as FileType)
      );
    },
    [files]
  );

  const handleDrop = (e) => {
    e.preventDefault();

    const { files: droppedFiles } = e.dataTransfer;
    const filesArray = Array.from(droppedFiles).filter((item: File) =>
      validateFile(item, accept)
    );

    if (filesArray.length) {
      handleDropFiles(filesArray as File[]);
    }
  };

  const handleReset = React.useCallback(() => {
    if (files.length) {
      setFiles([]);

      return;
    }

    if (!initFiles || !initFiles.length) {
      return;
    }

    const initData = initFiles.map((item) => ({
      id: item.id,
      image_id: item.image_id,
      url: item.url,
      isLoaded: true,
      isFailed: false,
    }));

    setFiles(initData);
  }, [initFiles, files]);

  return {
    files,
    isLoading,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    reset: handleReset,
    addFile: handleAddFile,
    removeFile: handleRemoveFile,
  };
};
