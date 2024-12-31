import { usePictureContext } from "../../picture context/createPictureContext";
import {
  stopEvent,
  handleClick,
  handleDrop,
  handleFileChange,
} from "./dragAndDropHandlers";
import { Error } from "./Error";
import { Errors } from "../../type/formType";
import UploadImageIcon from "../../assets/images/icon-upload.svg";

export default function DragAndDrop({ name }: { name: string }) {
  const { resetPicture, formErr, setFormErr, inputFileRef, previewRef } =
    usePictureContext();

  return (
    <>
      <label htmlFor="imageFile">Upload Avatar</label>
      <div
        className="dnd-target"
        onDragOver={stopEvent}
        onDrop={(e) =>
          handleDrop(e, inputFileRef, resetPicture, setFormErr, previewRef)
        }
        onClick={(e) => handleClick(e, inputFileRef)}
        tabIndex={0}
      >
        <img
          className="preview-picture"
          alt="preview"
          src={UploadImageIcon}
          ref={previewRef}
        />
        Drag and drop or click to upload
        <input
          id="imageFile"
          name={name}
          hidden
          type="file"
          accept="image/png, image/jpeg"
          ref={inputFileRef}
          onChange={(e) =>
            handleFileChange(
              e,
              inputFileRef,
              resetPicture,
              setFormErr,
              previewRef
            )
          }
        />
      </div>
      <Error formErr={formErr?.["picture" as keyof Errors]?.[0]} />
    </>
  );
}
