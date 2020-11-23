import React from 'react';
import { useField, useFormikContext } from 'formik';
import Image from 'ui/elements/Image';
import TextInput from 'ui/elements/TextInput';
import { css } from 'linaria';

const styles = {
  root: css`
    position: relative;
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
  const { values: { image } } = useFormikContext<{ image: string }>();
  const [ input ] = useField('image');

  return (
    <div className={styles.root}>
      <Image src={image}/>
      <div className={styles.field}>
        <TextInput {...input}/>
      </div>
    </div>
  );
};

export default ImageField;
