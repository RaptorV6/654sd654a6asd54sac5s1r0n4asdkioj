import type { ClassList, FunctionComponent, NoSerialize, QRL, QwikIntrinsicElements, Signal } from "@builder.io/qwik";

import { BaseButton, Menu, MenuGroup, MenuItem, MenuSeparator, useFloating } from "@akeso/ui-components";
import { component$, noSerialize, useId, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import { BoldIcon, ItalicIcon } from "~/components/icons-wysiwyg";

type EditorOutpatientReportProps = {
  class?: ClassList;
  content?: string;
  onUpdate$: QRL<(html: string) => void>;
  scrollToEndOnContentChange?: boolean;
  scrollToEndOnMount?: boolean;
  storedText?: EditorStoredText[] | null | undefined;
  variant?: "cardBody" | "standalone";
};

export const EditorOutpatientReport = component$<EditorOutpatientReportProps>(
  ({
    class: rootClass,
    content,
    onUpdate$,
    scrollToEndOnContentChange,
    scrollToEndOnMount,
    storedText,
    variant = "standalone",
  }) => {
    const editorContainerRef = useSignal<HTMLDivElement>();
    const editorSig = useSignal<NoSerialize<Editor>>();
    const selectionSig = useSignal<number>(0);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      const editorElement = track(() => editorContainerRef.value);

      if (editorElement && !editorSig.value) {
        editorSig.value = noSerialize(
          new Editor({
            content: content || "",
            editorProps: {
              attributes: {
                class: "prose dark:prose-invert prose-sm focus:outline-none prose-p:m-0 overflow-y-auto",
              },
            },
            element: editorElement,
            extensions: [StarterKit /*, NodeView */],
            onSelectionUpdate() {
              selectionSig.value += 1;
            },
            onUpdate: ({ editor }) => {
              const updatedText = editor.getHTML();

              onUpdate$(updatedText);
            },
          }),
        );

        if (scrollToEndOnMount) {
          editorElement.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
        }
      }
    });

    useTask$(({ track }) => {
      track(() => content);
      if (editorSig.value) {
        const nextContent = content || "";
        const prevContent = editorSig.value.getHTML();
        const isDiff = nextContent !== prevContent;

        if (isDiff) {
          editorSig.value.commands.setContent(content || "");

          if (scrollToEndOnContentChange && editorContainerRef.value) {
            editorContainerRef.value.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
          }
        }
      }
    });

    return (
      <div
        class={[
          "flex flex-col overflow-y-hidden",
          variant === "standalone" && "rounded border border-app-border-base shadow",
          rootClass,
        ]}
      >
        <div class={["flex gap-2 border-b border-app-border-base p-2", variant === "standalone" && "rounded-t"]}>
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
          {storedText && storedText.length > 0 && (
            <EditorToolActionStoredText bind:editor={editorSig} bind:selection={selectionSig} storedText={storedText} />
          )}
        </div>
        <div
          class={[
            "min-h-96 w-full flex-1 overflow-y-auto bg-app-surface-raised p-2",
            // to identify focus uncomment next line
            // "ring-1 ring-inset ring-transparent focus-within:ring-2 focus-within:ring-inset focus-within:ring-accent-border-base",
            variant === "standalone" && "rounded-b",
          ]}
        >
          <div ref={editorContainerRef} />
        </div>
      </div>
    );
  },
);

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

export type EditorStoredText =
  | { label: string; text: string; type: "text" }
  | { label: string; type: "group" }
  | { type: "separator" };

// const testStoredTexts: StoredText[] = [
//   { label: "Texty A", type: "group" },
//   { label: "Testovací text A1", text: "<strong>testovací text A1</strong>", type: "text" },
//   { label: "Testovací text A2", text: "testovací text A2", type: "text" },
//   { type: "separator" },
//   { label: "Texty B", type: "group" },
//   { label: "Testovací text B1", text: "testovací text B1", type: "text" },
//   { label: "Testovací text B2", text: "testovací text B2", type: "text" },
// ];

type EditorToolActionStoredTextProps = {
  "bind:editor": Signal<NoSerialize<Editor>>;
  "bind:selection": Signal<number>;
  storedText: EditorStoredText[];
};

const EditorToolActionStoredText = component$(
  ({ "bind:editor": editorSig, "bind:selection": selectionSig, storedText }: EditorToolActionStoredTextProps) => {
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
          {storedText.map((txt, idx) => {
            const key = `stored-text-${idx}`;
            if (txt.type === "text") {
              return (
                <MenuItem
                  key={key}
                  onClick$={() => {
                    if (editorSig.value) {
                      const cursorAnchor = editorSig.value.state.selection.anchor;
                      const insertPosition: "end" | number = selectionSig.value === 0 ? "end" : cursorAnchor;

                      editorSig.value
                        .chain()
                        .focus(insertPosition)
                        .insertContent(txt.text, { parseOptions: { preserveWhitespace: true } })
                        .run();
                    }

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
  },
);
