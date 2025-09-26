import { Dispatch, SetStateAction } from 'react';

type RemoveFileParams = {
  currentIndex?: number;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
  files: File[];
};

export const removeFile = ({
  setFiles,
  setIsEmpty,
  currentIndex,
  files,
}: RemoveFileParams) => {
  console.log(currentIndex);
  if (currentIndex || currentIndex === 0) {
    console.log(currentIndex);
    setFiles((prev) => prev.filter((_, index) => index !== currentIndex));
    if (files.length === 0) {
      setIsEmpty(true);
    }
  } else {
    setIsEmpty(true);
  }
};
