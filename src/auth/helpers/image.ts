import { diskStorage } from "multer";
import {v4 as uuidv4} from "uuid";

const fs = require("fs");
const FileType = require("file-type");
import path = require("path");
import { from, Observable, of, switchMap } from "rxjs";

type ValidFileExtension = "png" | "jpeg" | "jpg";
type ValidMimeType = "image/png" | "image/jpeg";

const validFileExtensions: ValidFileExtension[] = ["png", "jpeg", "jpg"];
const validMimeTypes: ValidMimeType[] = ["image/png", "image/jpeg"];

export const saveImageToStorage = {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const fileExtension: string = path.extname(file.originalname);
        const fileName: string = uuidv4() + fileExtension;
        cb(null, fileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes: ValidMimeType[] = validMimeTypes;
      allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
    },
  };

  export const isFileExtensionSafe = (
    fullFilePath: string,
  ): Observable<boolean> => {
    return from(FileType.fromFile(fullFilePath)).pipe(
      switchMap(
        (fileExtensionAndMimeType: {
          ext: ValidFileExtension;
          mime: ValidMimeType;
        }) => {
          if (!fileExtensionAndMimeType) return of(false);
  
          const isFileTypeLegit = validFileExtensions.includes(
            fileExtensionAndMimeType.ext,
          );
          const isMimeTypeLegit = validMimeTypes.includes(
            fileExtensionAndMimeType.mime,
          );
          const isFileLegit = isFileTypeLegit && isMimeTypeLegit;
          return of(isFileLegit);
        },
      ),
    );
  };

  export const removeFile = (fullFilePath: string): void => {
    try {
      fs.unlinkSync(fullFilePath);
    } catch (err) {
      console.error(err);
    }
  };
