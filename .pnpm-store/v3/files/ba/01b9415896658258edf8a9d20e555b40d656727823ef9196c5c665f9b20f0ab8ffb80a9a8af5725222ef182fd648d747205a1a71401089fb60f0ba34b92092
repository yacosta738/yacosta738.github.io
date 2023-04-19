
function isBackward (selection: Selection): boolean {
  var startNode: Node = selection.anchorNode;
  var startOffset: number = selection.anchorOffset;
  var endNode: Node = selection.focusNode;
  var endOffset: number = selection.focusOffset;

  var position: number = startNode.compareDocumentPosition(endNode);

  return !(position === 4 /* Node.DOCUMENT_POSITION_FOLLOWING */ ||
     (position === 0 && startOffset < endOffset));
}

export = isBackward;
