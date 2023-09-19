import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SimpleModal } from './SimpleModal-Component';
import { closeAllSimpleModals, getMetadataFromSimpleModal, openSimpleModal, useForceUpdate } from './SimpleModal-Fx';

export default {
  title: 'Simple Modal',
  component: SimpleModal,
} as ComponentMeta<typeof SimpleModal>;

const Modals = () => {
  return (
    <>
      <SimpleModal modalID="fullscreen-modal">
        {(data) => (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: 'lightgray',
              padding: '1rem',
              width: '100vw',
              height: '100vh',
            }}
          >
            <button
              onClick={() => {
                closeAllSimpleModals();
              }}
            >
              Close Modal
            </button>
            <button>Non Exit Button</button>
            <p>Props: {data.props}</p>
          </div>
        )}
      </SimpleModal>
      <SimpleModal modalID="mini-modal">
        {(data) => (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              backgroundColor: 'white',
              padding: '1rem',
              width: '50vw',
              height: '50vh',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              onClick={() => {
                closeAllSimpleModals();
              }}
            >
              Close Modal
            </button>
            <button>Non Exit Button</button>
            <p>Props: {data.props}</p>
          </div>
        )}
      </SimpleModal>
    </>
  );
};

const ModalTriggers = () => {
  const [openedXTimes, setOpenedXTimes] = React.useState(0);
  return (
    <>
      <button
        onClick={() => {
          setOpenedXTimes(openedXTimes + 1);
          openSimpleModal('fullscreen-modal', {
            props: openedXTimes.toString(),
          });
        }}
      >
        Fullscreen Modal
      </button>
      <button
        onClick={() => {
          openSimpleModal('mini-modal', {
            props: `${Math.random().toString(36).substring(2, 15)}`,
          });
        }}
      >
        Mini Modal
      </button>
    </>
  );
};

const Template: ComponentStory<typeof SimpleModal> = (args) => {
  return (
    <>
      <Modals />
      <ModalTriggers />
      <p>Reload Page on change of exit options</p>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
