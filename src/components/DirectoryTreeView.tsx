import { DiPhp } from "react-icons/di"
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa"
import TreeView, { flattenTree } from "react-accessible-treeview"
import "./styles.css"

export default function DirectoryTreeView({ folder }) {

  const data = flattenTree(folder)

  return (
    <div className="pt-2 pb-6">
      <div className="directory">
        <TreeView
          data={data}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}

              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  )
}

const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  )

const FileIcon = ({ filename }: { filename: string }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1)
  switch (extension) {
    case "php":
      return <DiPhp color="purple" className="icon" />
    default:
      return null
  }
}