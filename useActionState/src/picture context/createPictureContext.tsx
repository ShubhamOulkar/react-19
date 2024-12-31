import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useRef,
} from "react";
import UploadImageIcon from "../assets/images/icon-upload.svg";
import { Errors, PictureContext } from "../type/formType";

const pictureContext = createContext({} as PictureContext);

export const PictureProvider = ({ children }: PropsWithChildren) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [formErr, setFormErr] = useState<Errors>(undefined);
  const [userData, setUserData] = useState({
    picture: UploadImageIcon,
    fullName: "",
    email: "",
    githubName: "",
  });
  const resetPicture = () => {
    setUserData((prevData) => ({ ...prevData, picture: UploadImageIcon }));
  };
  return (
    <pictureContext.Provider
      value={{
        userData,
        setUserData,
        resetPicture,
        formErr,
        setFormErr,
        inputFileRef,
        previewRef,
      }}
    >
      {children}
    </pictureContext.Provider>
  );
};

export const usePictureContext = () => {
  const context = useContext(pictureContext);
  return context;
};
