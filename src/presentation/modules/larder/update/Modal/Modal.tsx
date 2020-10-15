import React, { Suspense } from 'react';
import { Modal, CircularProgress, useTheme } from '@material-ui/core';
import { enhance } from 'presentation/hocs';
import Form from 'presentation/modules/larder/update/Form';

const Loader = () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress/>
  </div>
);

interface Props {
  onClose: () => any,
}

const UpdateModal = ({ onClose }: Props) => (
  <Modal open>
    <div
      style={{
        position: 'relative',
        maxWidth: '50%',
        minHeight: '50%',
        height: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: useTheme().palette.background.paper,
        padding: 20,
      }}
    >
      <Suspense fallback={<Loader/>}>
        <Form onClose={onClose}/>
      </Suspense>
    </div>
  </Modal>
);

export default enhance('UpdateModal')(UpdateModal);
