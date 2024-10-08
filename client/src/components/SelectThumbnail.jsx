import { PhotoIcon } from "@heroicons/react/24/outline";
import { forwardRef, useState } from "react";

const SelectThumbnail = forwardRef(({}, ref) => {
  const [imageFile, setImageFile] = useState(null);

  function handleImage(e) {
    const img = ref.current.files[0];
    const imgUrl = URL.createObjectURL(img);
    setImageFile(imgUrl);
  }

  return (
    <div>
      <span>Thumbnail:</span>

      <img
        src={imageFile}
        className={`h-40 w-72  ${imageFile ? "" : "hidden"}`}
      ></img>

      <label
        htmlFor='thumbnail'
        className={`cursor-pointer ${imageFile ? "hidden" : ""}`}
      >
        <input
          ref={ref}
          type='file'
          name=''
          id='thumbnail'
          accept='image/*'
          onChange={handleImage}
          className='hidden'
        />
        <div className='bg-white border border-gray-200 h-40 w-72 rounded-sm grid place-content-center'>
          <PhotoIcon className='size-6' />
        </div>
      </label>
    </div>
  );
});

export default SelectThumbnail;
