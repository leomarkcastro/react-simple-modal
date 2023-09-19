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

export function openSimpleModal(modalID: string, modalData?: Record<string, string>) {
  const modalElement = document.querySelector(`#${modalID}`) as HTMLDialogElement;

  if (modalElement) {
    if (modalData) {
      modalElement.dataset.modalData = JSON.stringify(modalData);
    }
    modalElement?.showModal();
  }
}
