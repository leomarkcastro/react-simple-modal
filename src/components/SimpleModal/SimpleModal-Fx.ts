import { useState } from 'react';
import { flushSync } from 'react-dom';

export function closeSimpleModal(modalID: string) {
  const modalElement = document.querySelector(`#${modalID}`) as HTMLDialogElement;

  modalElement?.close();
}

export function closeAllSimpleModals() {
  const modalElements = document.querySelectorAll('dialog');

  modalElements.forEach((modalElement) => {
    modalElement.close();
  });
}

export function getMetadataFromSimpleModal(modalID: string): Record<string, any> | null {
  const modalElement = document.querySelector(`#${modalID}`) as HTMLDialogElement;

  const rawData = modalElement?.dataset?.modalData;

  if (rawData) {
    return JSON.parse(rawData) as Record<string, any>;
  }

  return null;
}

export function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((v) => v + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

export function openSimpleModal(modalID: string, modalData?: Record<string, string>) {
  const modalElement = document.querySelector(`#${modalID}`) as HTMLDialogElement;

  if (modalElement) {
    if (modalData) {
      modalElement.dataset.modalData = JSON.stringify(modalData);
    }
    modalElement?.showModal();
  }
}
