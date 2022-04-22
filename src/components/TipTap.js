import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FormatBoldRounded,
  FormatItalicRounded,
  FormatStrikethroughRounded,
  FormatAlignRightRounded,
  FormatAlignCenterRounded,
  FormatAlignJustifyRounded,
  FormatAlignLeftRounded,
  ImageRounded
} from '@mui/icons-material';
import {
  Button,
  ButtonGroup,
  Stack,
  Paper,
  Card,
  Modal,
  Box,
  formLabelClasses,
  Grid
} from '@mui/material';
import './tiptap.scss';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import MediaList from './MediaList';

function MenuBar({ editor, onClickImage }) {
  if (!editor) {
    return null;
  }
  return (
    <Paper elevation={2}>
      <Box
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          alignContent: 'center',
          // backgroundColor: 'red',
          height: '50px'
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '5px', height: '30px' }}
          size="small"
        >
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            // className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive('bold') ? 'contained' : 'outlined'}
          >
            <FormatBoldRounded fontSize="small" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'contained' : 'outlined'}
          >
            <FormatItalicRounded fontSize="small" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            // className={editor.isActive('strike') ? 'is-active' : ''}
            variant={editor.isActive('strike') ? 'contained' : 'outlined'}
          >
            <FormatStrikethroughRounded fontSize="small" />
          </Button>
        </ButtonGroup>

        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '5px', height: '30px' }}
          size="small"
        >
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            // className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            variant={editor.isActive('heading', { level: 1 }) ? 'contained' : 'outlined'}
          >
            <div>H1</div>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            variant={editor.isActive('heading', { level: 2 }) ? 'contained' : 'outlined'}
          >
            <div>H2</div>
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            variant={editor.isActive('heading', { level: 3 }) ? 'contained' : 'outlined'}
          >
            <div>H3</div>
          </Button>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            // className={editor.isActive('paragraph') ? 'is-active' : ''}
            variant={editor.isActive('paragraph') ? 'contained' : 'outlined'}
          >
            <div>P</div>
          </Button>
        </ButtonGroup>

        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '5px' }}
          size="small"
        >
          <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            // className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive({ textAlign: 'left' }) ? 'contained' : 'outlined'}
          >
            <FormatAlignLeftRounded fontSize="small" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            // className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive({ textAlign: 'center' }) ? 'contained' : 'outlined'}
          >
            <FormatAlignCenterRounded fontSize="small" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            // className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive({ textAlign: 'right' }) ? 'contained' : 'outlined'}
          >
            <FormatAlignRightRounded fontSize="small" />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            // className={editor.isActive('bold') ? 'is-active' : ''}
            variant={editor.isActive({ textAlign: 'justify' }) ? 'contained' : 'outlined'}
          >
            <FormatAlignJustifyRounded fontSize="small" />
          </Button>
        </ButtonGroup>

        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          sx={{ margin: '5px' }}
          size="small"
        >
          <Button onClick={onClickImage}>
            <ImageRounded fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
}

function Tiptap() {
  const [value, setValue] = useState('');
  const [openMedia, setOpenMedia] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Image
    ],
    content: '<p>Hello World!</p>',
    onUpdate: ({ editor }) => {
      console.log('112', editor.getHTML());
      setValue(editor.getHTML());
    },
    autofocus: false
  });

  const onClickImage = () => {
    setOpenMedia(true);
  };

  return (
    <>
      <MenuBar editor={editor} onClickImage={onClickImage} />
      <Card style={{ marginTop: '10px' }}>
        <EditorContent
          style={{ minHeight: '50vh', borderColor: 'blue' }}
          editor={editor}
          onChange={(e) => console.log('valueee', e)}
        />
      </Card>
      <Modal
        open={openMedia}
        onClose={() => setOpenMedia(!openMedia)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <MediaList
            onClick={(item) => {
              setOpenMedia(false);
              editor.chain().focus().setImage({ src: item.img }).run();
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Tiptap;
