import React from 'react';
import { useField } from 'formik';
import Image from 'ui/elements/Image';
import TextInput from 'ui/elements/TextInput';
import { css } from 'linaria';
import { useDebounce } from 'use-debounce';
import { tabletLandscapeUp, desktopUp } from 'ui/theme';

const styles = {
  root: css`
    position: relative;

    ${tabletLandscapeUp()} {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }
    ${desktopUp()} {
      width: 25%;
    }
  `,
  field: css`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem;
  `,
};

const ImageField = () => {
  const [ input ] = useField('image');
  const [ preview ] = useDebounce(input.value, 500);

  return (
    <div className={styles.root}>
      <Image src={preview}/>
      <div className={styles.field}>
        <TextInput {...input}/>
      </div>
    </div>
  );
};

export default ImageField;
