import React from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { getTranslate } from 'utils';
import { FileDataType } from 'types/file';

// Components
import Spinner from 'components/common/Spinner';
import useFileUploader, { FileType } from 'components/hooks/useFileUploader';
import WithTranslate from 'components/hoc/WithTranslate';

import { ReactComponent as CrossIcon } from 'assets/img/icons/cross-icon.svg';
import styles from './ImagesFileInput.module.sass';

type ChildrenProps = {
  open: () => void;
  addFile: (file: Partial<FileType>) => void;
  isDisabled: boolean;
};

type Props = {
  onLoadFiles: (ids: any[]) => void;
  initFiles?: FileDataType[];
  additionalFiles?: FileDataType[];
  disabled?: boolean;
  readOnly?: boolean;
  usePasteEvent?: boolean;
  localePhrases: any,
  children?: (props: ChildrenProps) => void;
  rawStyle?: boolean,
  filesOut?: FileDataType[];
  dropElement?: HTMLDivElement | null;
};

const ImagesFileInput = ({
  onLoadFiles,
  initFiles = [],
  additionalFiles = [],
  disabled,
  readOnly,
  rawStyle,
  children,
  localePhrases,
  filesOut = [],
  usePasteEvent = false,
  dropElement,
}: Props) => {
  const isDisabled = disabled || readOnly;

  const t = (code: string, placeholders?: any) => getTranslate(localePhrases, code, placeholders);

  const onFailedLoadFile = React.useCallback(
    (fileName: string) => {
      toast.error(t('common.failed_load_file', { fileName }));
    },
    [null],
  );

  const {
    files,
    isLoading,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
    open,
    addFile,
  } = useFileUploader({
    dropElement,
    usePasteEvent,
    onFailedLoadFile,
    initFiles,
    additionalFiles,
    disabled: isDisabled,
    multiple: true,
    accept: '.jpg, .jpeg, .png',
  });

  const loadedFiles = React.useMemo(
    () => files.filter((file) => file.isLoaded),
    [files],
  );

  React.useEffect(() => {
    onLoadFiles(loadedFiles);
  }, [loadedFiles]);

  const handleOpenFile = React.useCallback(
    (url: string) => (): void => {
      if (!url) {
        return;
      }

      window.open(url);
    },
    [loadedFiles],
  );

  const fieldfiles = loadedFiles.filter((file) => filesOut.find((filee) => filee.id === file.id));
  const rootProps = loadedFiles.length || isLoading || isDisabled
    ? {}
    : getRootProps();

  return (
    <div className={styles.container}>
      <div
        {...rootProps}
        className={classNames({
          [styles.inputFileContainerDragndrop]: !rawStyle,
          [styles.inputFileContainerDragndrop_drag_over]: isDragActive,
          [styles.inputFileContainerDragndrop_has_files]: !!fieldfiles.length && !rawStyle,
          [styles.inputFileContainerDragndrop_is_disabled]: isDisabled,
        })}
      >
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner width={30} height={30} color="#0FC1A1" />
          </div>
        )}

        {!isLoading && !fieldfiles.length && <span>{t('common.choose_file')}</span>}

        {!!fieldfiles.length && (
          <div className={styles.returnFilesList}>
            {fieldfiles.map((fileData, index) => (
              <div
                key={fileData.id}
                className={styles.fileToUpload}
                style={{ backgroundImage: `url(${fileData.url})` }}
              >
                {!isDisabled && (
                  <span
                    role="presentation"
                    className={styles.fileRemoveIconWrap}
                    onClick={removeFile(fileData)}
                  >
                    <CrossIcon className={styles.fileRemoveIcon} />
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <input {...getInputProps()} />
      </div>
      {children({ isDisabled, open, addFile })}
    </div>
  );
};

export default WithTranslate(ImagesFileInput);
