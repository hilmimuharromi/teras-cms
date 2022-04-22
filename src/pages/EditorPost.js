import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'quill-image-uploader';
import TipTap from '../components/TipTap';

Quill.register('modules/imageUploader', ImageUploader);
function EditorPost() {
  return (
    <div>
      <div>Editor</div>
      <TipTap />
    </div>
  );
}

export default EditorPost;
