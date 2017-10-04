import {baseKeymap, setBlockType} from "prosemirror-commands";
import {undo, redo, history} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";
import {icons, menuBar, MenuItem} from "prosemirror-menu";
import {DOMParser, Schema} from "prosemirror-model";
import {EditorState} from "prosemirror-state";
import {findWrapping} from "prosemirror-transform";
import {EditorView} from "prosemirror-view";

const schema = new Schema({
  nodes: {
    text: {},
    paragraph: {
      content: "text*",
      toDOM() { return ["p", {'class': 'text'}, 0] },
      parseDOM: [{tag: "p.text"}],
    },
    requirement: {
      content: "text*",
      toDOM() { return ["p", {'class': 'req'}, 0] },
      parseDOM: [{tag: "p.req"}],
    },
    doc: {
      content: "(paragraph | requirement)*",
    },
  }
});

function logState({ doc }) {
  const json = JSON.stringify(doc.toJSON(), null, 2);
  document.querySelector('#state').innerHTML = json;
  return true;
}

function toggleReq(state, dispatch) {
  const { $anchor } = state.selection;
  let nodeType = schema.nodes.requirement;
  if ($anchor.parent.type === schema.nodes.requirement) {
    nodeType = schema.nodes.paragraph;
  }
  if (dispatch) {
    const where = $anchor.before($anchor.depth);
    dispatch(state.tr
             .clearIncompatible(where, nodeType)
             .setNodeMarkup(where, nodeType)
             .scrollIntoView());
  }
  return true
}

const state = EditorState.create({
  doc: DOMParser.fromSchema(schema).parse(document.querySelector('#content')),
  schema,
  plugins: [
    menuBar({
      content: [[
        new MenuItem({
          title: "Toggle Requirement",
          icon: { text: 'Req' },
          enable: () => true,
          run: toggleReq,
        }),
        new MenuItem({
          title: "Write State",
          icon: { text: "->" },
          run: logState,
        }),
      ]],
    }),
    history(),
    keymap({"Mod-z": undo, "Mod-y": redo }),
    keymap(baseKeymap),
    keymap({"Mod-b": toggleReq }),
  ],
});
new EditorView(document.querySelector('#editor'), { state });
