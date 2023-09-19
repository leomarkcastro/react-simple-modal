import React, { useEffect, useRef } from 'react';

export interface SimpleModalProps {
  modalID: string;
  exitOnEscape?: boolean;
  exitOnOutsideClick?: boolean;
  static?: boolean;
  children?: (data: Record<string, any>) => React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [modalData, setModalData] = React.useState({});

  useEffect(() => {
    if (!props.exitOnEscape) {
      dialogRef.current?.addEventListener('cancel', (event) => {
        event.preventDefault();
      });
    }
    if (props.exitOnOutsideClick) {
      dialogRef.current?.addEventListener('click', (event) => {
        if (event.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      });
    }
    if (!props.static && dialogRef.current) {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes') {
            if (mutation.attributeName === 'data-modal-data') {
              setModalData(JSON.parse(dialogRef.current?.dataset.modalData || '{}') as Record<string, any>);
            }
          }
        });
      });

      observer.observe(dialogRef.current, {
        attributes: true, // configure it to listen to attribute changes
      });
    }
  }, [dialogRef, props]);

  return (
    <dialog
      style={{
        margin: '0',
        padding: '0',
        border: 'none',
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
      id={props.modalID}
      ref={dialogRef}
    >
      {props.children && props.children({ ...modalData })}
    </dialog>
  );
};

export { SimpleModal };
