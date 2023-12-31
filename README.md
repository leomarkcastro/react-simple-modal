# (JSX Modal) React Simple Modals

Modals implemented using HTML native [Dialogs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). This modal doesn't use global state and context to determine if the modal is open or not. Instead, it uses the `open` attribute of the HTML Dialog element.

Through this, you can put the dialog anywhere in your react app and open it from anywhere. You can also use the `onClose` prop to close the dialog from anywhere.

The actual modal card is highly designable via css. I've also provided ways to close the modal via the default escape method and outside click of modal.

## Components

```jsx
interface SimpleModal {
  modalID: string;
  exitOnEscape?: boolean;
  exitOnOutsideClick?: boolean;
  static?: boolean;
  children?: (data: Record<string, any>) => React.ReactNode;
}
```

Contains the dialog component.

- `modalID`: The id of the modal. This is used to open the modal from anywhere in your app. This should be unique.
- `exitOnEscape`: If true, the modal will close when the user presses the escape key.
- `exitOnOutsideClick`: If true, the modal will close when the user clicks outside the modal.
- `static`: The content inside the modal can be changed dynamically by editting the `data-modal-data` attribute or by calling the `openSimpleModal(bool, {props})` function. This uses MutationObserver which could introduce performance issues. If you don't need this feature, set this to true.

```jsx
interface SimpleModalCard extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  hasWhiteBackground?: boolean;
}
```

Normally, simple modal will only provide you the dialog component structure, and you'll be the one to create the necessary transformations to properly position your card inside the modal and backdrop structure. This is a convenience component providing you an already centered component. You can pass either class names or styles here to customize the card.

- `hasWhiteBackground`: If true, the modal card will have a white background.

## Fuctions

```jsx
closeSimpleModal(modalID: string)
```

Closes a modal with the given `modalID`.

```jsx
closeAllSimpleModals();
```

Closes all simple modals.

```jsx
openSimpleModal(modalID: string, modalData?: Record<string, string>)
```

Opens a modal with the given `modalID`. You can also pass a `modalData` object to change the content of the modal. This will only work if the `static` prop is set to false.

## Sample

In this example, I was using tailwind to style the modal card. You can use any css framework or your own css.

```jsx
// index.tsx
import { SimpleModal, SimpleModalCard, showSimpleModal } from 'jsx-modal';

const app = () => {
  return (
    <div>
      <SimpleModal exitOnEscape modalID="myCustomModal">
        {(props) => (
          <SimpleModalCard className="bg-slate-400 p-2 w-screen h-screen rounded-md">
            Hello {props.name}
          </SimpleModalCard>
        )}
      </SimpleModal>

      <button onClick={() => showSimpleModal('myCustomModal', { name: 'Developer' })}>Open Modal</button>
    </div>
  );
};
```

## How To

### - Provide custom design to the backdrop color

You can use the `::backdrop` pseudo element to style the backdrop. You can also use the `hasWhiteBackground` prop of the `SimpleModalCard` component to change the background of the modal card.

```css
/* index.css */
#myCustomModal::backdrop {
  background-color: rgba(255, 0, 0, 0.5);
}
```

### - Bind constantly changing data to the modal

You can continously call the `openSimpleModal` function to change the data of the modal. This will only work if the `static` prop is set to false.

Every time you call the `openSimpleModal` function, the `data-modal-data` attribute of the dialog will be updated. You can use this attribute to change the content of the modal.

However, since we don't bind state variables into the component, you'll have to manually call `openSimpleModal` every time you want to change the data of the modal.

### - Add animation when opening and closing the modal

Personally, I like using [animate.css](https://animate.style) to add basic animations to this modal.

Adding fade in animations could be as simple as the example below:

```jsx
import { SimpleModal, SimpleModalCard, showSimpleModal } from 'jsx-modal';
import 'animate.css';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SimpleModal exitOnEscape modalID="myCustomModal">
        {(props) => (
          <SimpleModalCard>
            <div
              className="bg-slate-400 p-2 w-52 h-52 rounded-md animate__animated animate__fadeIn animate__faster"
              id="displayCard"
            >
              <p>Hello {props.name}</p>
            </div>
          </SimpleModalCard>
        )}
      </SimpleModal>

      <button
        className="p-2 bg-blue-700 text-white"
        onClick={() => showSimpleModal('myCustomModal', { name: 'Developer' })}
      >
        Open Modal
      </button>
    </main>
  );
}
```

You might be confused on why I created a separate child component to hold the actual class style and animate.css classes. You can think of the `SimpleModalCard` as a utility to place stuffs on center of the screen, on some case, you can also use it as an actual card itself. However in this case, `animate.css` will conflict with the transform css property of the `SimpleModalCard` component. So to avoid this, I created a separate component to hold the actual card and animate.css classes.

Then for adding a fade out animation when closing the modal, this one could be a little tricky. We can simulate a fade out animation if users click a close button inside the modal.

```jsx
import { SimpleModal, SimpleModalCard, closeSimpleModal, showSimpleModal } from 'jsx-modal';
import 'animate.css';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SimpleModal modalID="myCustomModal">
        {(props) => (
          <SimpleModalCard>
            <div
              className="bg-slate-400 p-2 w-52 h-52 rounded-md animate__animated animate__fadeIn animate__faster"
              id="displayCard"
            >
              <p>Hello {props.name}</p>
              <button
                onClick={() => {
                  // We swap the animation classes to simulate a fade out animation
                  document.getElementById('displayCard')?.classList.remove('animate__fadeIn');
                  document.getElementById('displayCard')?.classList.add('animate__fadeOut');
                  setTimeout(() => {
                    closeSimpleModal('myCustomModal');
                    // We swap the animation classes to simulate a fade in animation
                    document.getElementById('displayCard')?.classList.remove('animate__fadeOut');
                    document.getElementById('displayCard')?.classList.add('animate__fadeIn');
                  }, 250);
                }}
              >
                Close
              </button>
            </div>
          </SimpleModalCard>
        )}
      </SimpleModal>

      <button
        className="p-2 bg-blue-700 text-white"
        onClick={() => showSimpleModal('myCustomModal', { name: 'Developer' })}
      >
        Open Modal
      </button>
    </main>
  );
}
```

### License

MIT license, Copyright (c) Leo Mark Castro. For more information see `LICENSE`.
