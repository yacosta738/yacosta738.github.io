{
  function postProcessDiff (header, file_modes, patch, binary) {
    let status
    if (file_modes.old_mode && !file_modes.new_mode) {
      return {
        newPath: null,
        oldPath: header.file_name,
        newMode: null,
        oldMode: file_modes.old_mode,
        hunks: patch ? patch.hunks : [],
        status: 'deleted',
        binary: !!binary
      }
    } else if (!file_modes.old_mode && file_modes.new_mode) {
      return {
        oldPath: null,
        newPath: header.file_name,
        oldMode: null,
        newMode: file_modes.new_mode,
        hunks: patch ? patch.hunks : [],
        status: 'added',
        binary: !!binary
      }
    } else if (file_modes.old_mode && file_modes.new_mode) {
      return {
        newPath: header.file_name,
        oldPath: header.file_name,
        oldMode: file_modes.old_mode,
        newMode: file_modes.new_mode,
        hunks: patch ? patch.hunks : [],
        status: 'modified',
        binary: !!binary
      }
    } else {
      throw new Error('file modes missing')
    }
  }

  function postProcessMergeConflictDiff (filePath, patch, binary) {
    patch = patch || {}
    patch.filePath = filePath
    patch.status = 'unmerged'
    patch.binary = !!binary
    return patch
  }

  function postProcessSimilarityDiff (rename_or_copy, similarity_index, old_file, new_file, file_modes, patch) {
    const diff = {
      oldPath: old_file,
      newPath: new_file,
      hunks: patch ? patch.hunks : [],
      status: rename_or_copy === 'copy' ? 'copied' : 'renamed',
      similarity: similarity_index,
    }
    if (file_modes) {
      diff.oldMode = file_modes.old_mode
      diff.newMode = file_modes.new_mode
    }
    return diff
  }
}

diffs
  = diffs:diff* { return diffs }

diff
  = binary_merge_conflict_diff
  / rename_or_copy_diff
  / merge_conflict_diff
  / unmerged_path
  / binary_diff
  / regular_diff

binary_diff
  = header:diff_header_line file_modes:file_mode_section? patch_header? binary_declaration { return postProcessDiff(header, file_modes, undefined, true) }

binary_declaration
  = 'Binary files ' TEXT NL

regular_diff
  = header:diff_header_line file_modes:file_mode_section? patch:patch? { return postProcessDiff(header, file_modes, patch) }

binary_merge_conflict_diff
  = path:merge_conflict_header_line index_line binary_declaration { return postProcessMergeConflictDiff(path, undefined, true) }

rename_or_copy_diff
  = rename_or_copy_diff_header_line modes:changed_file_modes? similarity:similarity_index copy_from:rename_copy_from copy_to:rename_copy_to
    index_modes:index_line? patch:(binary_declaration / patch)?
  {
    return postProcessSimilarityDiff(copy_from.operation, similarity, copy_from.file, copy_to.file, modes || index_modes, patch)
  }

merge_conflict_diff
  = path:merge_conflict_header_line index_line patch:patch? { return postProcessMergeConflictDiff(path, patch) }

merge_conflict_header_line
  = 'diff --cc ' path:TEXT NL { return path }

unmerged_path
  = '* Unmerged path ' path:TEXT NL { return postProcessMergeConflictDiff(path) }

patch
  = header:patch_header hunks:hunk* { return {hunks} }

patch_header
  = '--- ' old_file_name:TEXT NL '+++ ' new_file_name:TEXT NL { return {old_file_name, new_file_name} }

hunk
  = header:hunk_header lines:hunk_line+ {
    return Object.assign({}, header, {
      lines: lines
    })
  }

hunk_header
  = merge_conflict_hunk_header
  / regular_hunk_header

merge_conflict_hunk_header
  = '@@@ -' our_range:hunk_range ' -' base_range:hunk_range ' +' their_range:hunk_range ' @@@' context:TEXT? NL {
    return {
      ourStartLine: our_range.start,
      ourLineCount: our_range.count,
      theirStartLine: their_range.start,
      theirLineCount: their_range.count,
      baseStartLine: base_range.start,
      baseLineCount: base_range.count,
      heading: context ? context.trim() : '',
    }
  }

regular_hunk_header
  = '@@ -' old_range:hunk_range ' +' new_range:hunk_range ' @@' context:TEXT? NL {
    return {
      oldStartLine: old_range.start,
      oldLineCount: old_range.count,
      newStartLine: new_range.start,
      newLineCount: new_range.count,
      heading: context ? context.trim() : '',
    }
  }

hunk_range
  = start:NUMBER ',' count:NUMBER { return {start, count} }
  / start:NUMBER                  { return {start, count: 1} }

hunk_line
  = chars:(('+' / '-' / ' ' / '\\') TEXT?) NL { return chars.join('') }

diff_header_line
  = 'diff ' options:TEXT_NO_SPACES ' ' file_name:file_name_str NL { return {file_name} }

rename_or_copy_diff_header_line
  = 'diff ' options:TEXT_NO_SPACES ' ' files_unused:TEXT NL

file_name_str
  = str:TEXT { return str.substr(str.length/2 + 1) }

similarity_index
  = 'similarity index ' idx:NUMBER '%' NL { return idx }

file_mode_section
  = explicit_file_modes:(new_or_deleted_file_mode / changed_file_modes)? index_file_modes:index_line? { return explicit_file_modes || index_file_modes }

new_or_deleted_file_mode
  = type:('new'/'deleted') ' file mode ' file_mode:TEXT NL {
    if (type === 'new') return {old_mode: null, new_mode: file_mode}
    else return {old_mode: file_mode, new_mode: null}
  }

changed_file_modes
  = 'old mode ' old_mode:TEXT NL 'new mode ' new_mode:TEXT NL { return {old_mode, new_mode} }

rename_copy_from
  = operation:('rename' / 'copy') ' from ' file:TEXT NL { return {operation, file} }

rename_copy_to
  = operation:('rename' / 'copy') ' to ' file:TEXT NL { return {operation, file} }

index_line
  = 'index ' TEXT_NO_SPACES ' ' file_mode:TEXT NL { return {old_mode: file_mode, new_mode: file_mode} }
  / 'index ' TEXT_NO_SPACES NL



S   = [ \t]
NL  = ("\n" / "\r\n") / EOF
NLS = NL / S
EOF = !.
TEXT = chars:[^\r\n]+ { return chars.join('') }
TEXT_NO_SPACES = chars:[^ \t\r\n]+ { return chars.join('') }
NUMBER = chars:[0-9]+ { return parseInt(chars.join(''), 10) }
