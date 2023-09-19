import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SimpleModal } from './SimpleModal-Dialog';
import { closeAllSimpleModals, openSimpleModal } from './SimpleModal-Fx';
import { SimpleModalCard } from './SimpleModal-Card';

export default {
  title: 'Simple Modal',
  component: SimpleModal,
} as ComponentMeta<typeof SimpleModal>;

const Modals = () => {
  return (
    <>
      <SimpleModal modalID="fullscreen-modal">
        {(data) => (
          <SimpleModalCard
            style={{
              width: '100vw',
              height: '100vh',
              backgroundColor: 'white',
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
          </SimpleModalCard>
        )}
      </SimpleModal>
      <SimpleModal modalID="mini-modal" static>
        {(data) => (
          <SimpleModalCard
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'white',
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
          </SimpleModalCard>
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
