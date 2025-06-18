import type { FunctionComponent, NoSerialize, QRL, QwikIntrinsicElements, Signal } from "@builder.io/qwik";

import {
  BaseButton,
  i18nFormatDate,
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  useFloating,
} from "@akeso/ui-components";
import { component$, noSerialize, useId, useSignal, useStyles$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { Editor, mergeAttributes, Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { BoldIcon, ItalicIcon } from "~/components/icons-wysiwyg";

const NodeView = Node.create({
  addAttributes() {
    return {
      title: {
        default: "",
      },
    };
  },
  addNodeView:
    () =>
    ({ node }) => {
      const title = document.createElement("div");
      title.innerHTML = `<strong>${node.attrs.title}</strong>`;
      title.contentEditable = "false";
      title.classList.add("tip-tap-viewer-title");

      const content = document.createElement("div");
      content.setAttribute("style", "margin-top: 0; flex: 1;");
      content.classList.add("tip-tap-viewer-content");

      const dom = document.createElement("div");
      dom.classList.add("tip-tap-viewer");
      dom.append(title, content);

      return { contentDOM: content, dom };
    },
  // atom: true,
  content: "inline*",
  draggable: false,
  group: "block",
  name: "nodeView",
  parseHTML() {
    return [
      {
        tag: "node-view",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["node-view", mergeAttributes(HTMLAttributes), 0];
  },
});

type EditorOutpatientReportProps = {
  surgeryDate: Date | null | undefined;
  surgeryName: null | string | undefined;
};

export const EditorOutpatientReport = component$(({ surgeryDate, surgeryName }: EditorOutpatientReportProps) => {
  useStyles$(`
    .tip-tap-viewer {
      display: flex;
      margin-bottom: 0.25rem;
    }
    .tip-tap-viewer-title {
      margin-right: 0.5rem;
    }
    .tip-tap-viewer-content {
      flex: 1;
    }
    .tip-tap-viewer-content * {
      width: 100%;
    } 
  `);

  const editorRef = useSignal<HTMLDivElement>();
  const editorSig = useSignal<NoSerialize<Editor>>();
  const selectionSig = useSignal<number>(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const editorElement = track(() => editorRef.value);

    if (editorElement) {
      editorSig.value = noSerialize(
        new Editor({
          content: `
            <node-view title="Pacient přichází pro:">
             <p></p>
            </node-view>
            <node-view title="Pacient odeslán kým:">
             <p></p>
            </node-view>
            <node-view title="Datum a název operace vztahující se ke kontrole:">
             <p>${surgeryDate ? [i18nFormatDate(surgeryDate), surgeryName ?? ""].join(" ") : "Diagnóza nepotvrzena"}</p>
            </node-view>
            <node-view title="Subj.:">
             <p></p>
            </node-view>
            <node-view title="Obj.:">
             <p></p>
            </node-view>
            <node-view title="Z vyšetření:">
             <p></p>
            </node-view>
            <node-view title="Diagnostický souhrn:">
             <p></p>
            </node-view>
            <node-view title="Doporučení:">
             <p></p>
            </node-view>
            <p></p>
          `,
          editorProps: {
            attributes: {
              class: "prose dark:prose-invert prose-sm focus:outline-none",
            },
          },
          element: editorElement,
          extensions: [StarterKit, NodeView],
          onSelectionUpdate() {
            selectionSig.value += 1;
          },
        }),
      );
    }
  });

  return (
    <div class="space-y-1">
      <div class="rounded border border-app-border-base shadow">
        <div class="flex gap-2 rounded-t border-b border-app-border-base p-2">
          <div class="flex flex-1 gap-2">
            <EditorToolAction
              attributeName="bold"
              bind:editor={editorSig}
              bind:selection={selectionSig}
              icon={BoldIcon}
              label="Tučně"
              onClick$={() => {
                editorSig.value?.chain().focus().toggleBold().run();
              }}
            />
            <EditorToolAction
              attributeName="italic"
              bind:editor={editorSig}
              bind:selection={selectionSig}
              icon={ItalicIcon}
              label="Kurzívou"
              onClick$={() => {
                editorSig.value?.chain().focus().toggleItalic().run();
              }}
            />
          </div>
          <EditorToolActionStoredText bind:editor={editorSig} />
        </div>
        <div
          class="block min-h-80 w-full rounded-b bg-app-surface-raised px-2 py-4 ring-1 ring-inset ring-transparent focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent-border-base"
          ref={editorRef}
        />
      </div>
    </div>
  );
});

type EditorToolActionProps = {
  attributeName?: string;
  "bind:editor": Signal<NoSerialize<Editor>>;
  "bind:selection": Signal<number>;
  icon: FunctionComponent<QwikIntrinsicElements["svg"]>;
  label: string;
  onClick$: QRL<(event: PointerEvent, element: HTMLButtonElement) => Promise<unknown> | unknown>;
};

const EditorToolAction = component$(
  ({
    attributeName,
    "bind:editor": editorSig,
    "bind:selection": selectionUpdatedSig,
    icon: Icon,
    label,
    onClick$,
  }: EditorToolActionProps) => {
    const isActiveSig = useSignal<boolean>(false);

    useTask$(({ track }) => {
      track(() => selectionUpdatedSig.value);
      if (attributeName && editorSig.value) {
        isActiveSig.value = !!editorSig.value.isActive(attributeName);
      }
    });

    return (
      <BaseButton
        class={[
          "inline-flex h-6 w-6 items-center justify-center rounded p-0 ring-1 ring-inset",
          isActiveSig.value
            ? "bg-accent-base text-accent-text-contrast hover:bg-accent-hover"
            : "bg-app-surface-lowered ring-neutral-border-base hover:bg-app-active-base",
        ]}
        onClick$={async (ev, el) => {
          isActiveSig.value = !isActiveSig.value;
          await onClick$(ev, el);
        }}
        type="button"
      >
        <span class="sr-only">{label}</span>
        <Icon class="h-5 w-5" />
      </BaseButton>
    );
  },
);

type StoredText =
  | { label: string; text: string; type: "text" }
  | { label: string; type: "group" }
  | { type: "separator" };

const testStoredTexts: StoredText[] = [
  { label: "Texty A", type: "group" },
  { label: "Testovací text A1", text: "testovací text A1", type: "text" },
  { label: "Testovací text A2", text: "testovací text A2", type: "text" },
  { type: "separator" },
  { label: "Texty B", type: "group" },
  { label: "Testovací text B1", text: "testovací text B1", type: "text" },
  { label: "Testovací text B2", text: "testovací text B2", type: "text" },
];

type EditorToolActionStoredTextProps = {
  "bind:editor": Signal<NoSerialize<Editor>>;
};

const EditorToolActionStoredText = component$(({ "bind:editor": editorSig }: EditorToolActionStoredTextProps) => {
  const anchorRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();
  const popoverId = useId();

  useFloating(anchorRef, popoverRef, { gutter: 2, placement: "bottom-end" });

  return (
    <>
      <BaseButton
        class={[
          "inline-flex h-6 items-center justify-center rounded bg-app-surface-lowered px-1 py-0 text-xs ring-1 ring-inset ring-neutral-border-base hover:bg-app-active-base",
        ]}
        popoverId={popoverId}
        popovertargetaction="toggle"
        ref={anchorRef}
        type="popover-trigger"
      >
        Vložit text
      </BaseButton>
      <Menu id={popoverId} ref={popoverRef}>
        {testStoredTexts.map((txt, idx) => {
          const key = `stored-text-${idx}`;
          if (txt.type === "text") {
            return (
              <MenuItem
                key={key}
                onClick$={() => {
                  editorSig.value
                    ?.chain()
                    .focus()
                    .insertContent(txt.text, { parseOptions: { preserveWhitespace: true } })
                    .run();
                  popoverRef.value?.hidePopover();
                }}
                type="button"
              >
                {txt.label}
              </MenuItem>
            );
          }

          if (txt.type === "group") {
            return <MenuGroup key={key}>{txt.label}</MenuGroup>;
          }

          return <MenuSeparator key={key} />;
        })}
      </Menu>
    </>
  );
});
