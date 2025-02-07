export const StepType = {
    CreateFile: 'CreateFile',
    CreateFolder: 'CreateFolder',
    EditFile: 'EditFile',
    DeleteFile: 'DeleteFile',
    RunScript: 'RunScript'
};
  
  /**
   * Represents a step in the project process.
   * @typedef {Object} Step
   * @property {number} id
   * @property {string} title
   * @property {string} description
   * @property {string} type - One of StepType values
   * @property {'pending' | 'in-progress' | 'completed'} status
   * @property {string} [code]
   * @property {string} [path]
   */
  
  /**
   * Represents a project structure.
   * @typedef {Object} Project
   * @property {string} prompt
   * @property {Step[]} steps
   */
  
  /**
   * Represents a file or folder item.
   * @typedef {Object} FileItem
   * @property {string} name
   * @property {'file' | 'folder'} type
   * @property {FileItem[]} [children]
   * @property {string} [content]
   * @property {string} path
   */
  
  /**
   * Props for a file viewer component.
   * @typedef {Object} FileViewerProps
   * @property {FileItem | null} file
   * @property {Function} onClose
   */
  