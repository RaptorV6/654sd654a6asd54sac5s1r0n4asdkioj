import type { QwikIntrinsicElements } from "@builder.io/qwik";

import { component$ } from "@builder.io/qwik";

export const AddOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" fill="currentColor"></path>
    </svg>
  );
});

export const CheckOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m10 15.17l9.193-9.191l1.414 1.414l-10.606 10.606l-6.364-6.364l1.414-1.414l4.95 4.95Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const CheckboxBlankIcon = component$<QwikIntrinsicElements["svg"]>((props) => {
  return (
    <svg {...props} height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z"
        fill="currentColor"
      />
    </svg>
  );
});

export const CheckboxCheckedIcon = component$<QwikIntrinsicElements["svg"]>((props) => {
  return (
    <svg {...props} height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5zm-9 12l-4-4l1.41-1.42L10 14.17l6.59-6.59L18 9"
        fill="currentColor"
      />
    </svg>
  );
});

export const CloseOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m12 10.587l4.95-4.95l1.415 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.95 4.95l-1.413-1.415l4.95-4.95l-4.95-4.95L7.05 5.638l4.95 4.95Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const CopyOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7ZM5.002 8L5 20h10V8H5.002ZM9 6h8v10h2V4H9v2Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const DeleteIcon = component$<QwikIntrinsicElements["svg"]>((props) => (
  <svg height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
      fill="currentColor"
    />
  </svg>
));

export const EditIcon = component$<QwikIntrinsicElements["svg"]>((props) => (
  <svg height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
      fill="currentColor"
    />
  </svg>
));

export const EyeIcon = component$<QwikIntrinsicElements["svg"]>((props) => (
  <svg fill="currentColor" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1-144 144zm0-240a95.3 95.3 0 0 0-25.3 3.8 47.9 47.9 0 0 1-66.9 66.9A95.8 95.8 0 1 0 288 160z" />
  </svg>
));

export const ExpandUpDownOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.207 9.043L12 2.836L5.793 9.043l1.414 1.414L12 5.664l4.793 4.793l1.414-1.414ZM5.793 14.957L12 21.165l6.207-6.208l-1.414-1.414L12 18.336l-4.793-4.793l-1.414 1.414Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const HomeOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1ZM6 19h12V9.158l-6-5.455l-6 5.455V19Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const LockFilledIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const LogoutBoxROutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5Zm13-6v-3h-7v-2h7V8l5 4l-5 4Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const MoreVerticalOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3Zm0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18Zm0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5s1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
});

export const SortAscIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="2em" viewBox="0 0 24 24" width="2em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 5v14m7-7l-7 7l-7-7"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
    </svg>
  );
});

export const SortDescIcon = (props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg height="2em" viewBox="0 0 24 24" width="2em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m5 12l7-7l7 7m-7 7V5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
    </svg>
  );
};

export const WarningOutlineIcon = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});
