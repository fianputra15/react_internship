import 'react-quill/dist/quill.snow.css';
import './editor.css';

import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import ReactQuill from 'react-quill';
import { Wrapper } from '../../components';

const Editor = () => {
  const [text] = useState('');
  return (
    <Wrapper>
      <Card className="overflow-visible">
        <ReactQuill value={text} placeholder={'Write something'} />
      </Card>
    </Wrapper>
  );
};

export default Editor;
