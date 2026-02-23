import React, { useRef } from 'react';

const MIN_IMAGES = 3;

/**
 * Multiple image selection with preview thumbnails.
 * Passes selected files to parent via onImagesChange(files).
 * Validates minimum image count.
 */
function ImageUploader({ images = [], onImagesChange, error, disabled }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (typeof onImagesChange === 'function' && newFiles.length > 0)
      onImagesChange([...images, ...newFiles]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index) => {
    const next = images.filter((_, i) => i !== index);
    if (typeof onImagesChange === 'function') onImagesChange(next);
  };

  const isValid = images.length >= MIN_IMAGES;

  return (
    <div className="image-uploader">
      <label className="image-uploader__label">
        Images (minimum {MIN_IMAGES} required)
      </label>
      <div className="image-uploader__preview-wrap">
        {images.map((img, index) => (
          <div key={index} className="image-uploader__thumb">
            <img
              src={img.preview || (img instanceof File ? URL.createObjectURL(img) : img)}
              alt={`Preview ${index + 1}`}
              className="image-uploader__thumb-img"
            />
            {!disabled && (
              <button
                type="button"
                className="image-uploader__thumb-remove"
                onClick={() => removeImage(index)}
                aria-label="Remove image"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {!disabled && (
          <label className="image-uploader__add">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="image-uploader__input"
              aria-label="Add images"
            />
            <span className="image-uploader__add-text">+ Add</span>
          </label>
        )}
      </div>
      {images.length > 0 && images.length < MIN_IMAGES && (
        <p className="image-uploader__hint">
          Add at least {MIN_IMAGES - images.length} more image(s).
        </p>
      )}
      {error && <p className="image-uploader__error">{error}</p>}
    </div>
  );
}

export default ImageUploader;
export { MIN_IMAGES };
