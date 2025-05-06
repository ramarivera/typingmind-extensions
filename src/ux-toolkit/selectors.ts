export const SELECTORS = {
  SIDEBAR: {
    MIDDLE_PART: {
      CONTAINER: '[data-element-id="sidebar-middle-part"]',
      FOLDERS: {
        CHAT_FOLDER: {
          CONTAINER: '[data-element-id="chat-folder"]',
          /**
           * Must be used with the result of the CHAT_FOLDER.CONTAINER selector
           */
          BUTTON_WITH_NAME: 'button:first-of-type',
          BUTTONS: {
            /**
             * Must be used with the result of the CHAT_FOLDER.CONTAINER selector, based on the CHAT_FOLDER.BUTTON_WITH_NAME selector
             */
            CONTAINER: 'div:nth-child(2) > div:has(button:nth-of-type(3))',
            /**
             * Must be used with the result of the BUTTONS.CONTAINER selector
             */
            BUTTON_NEW_CHAT:
              'button[data-tooltip-content="New Chat in Project/Folder"]',
            /**
             * Must be used with the result of the BUTTONS.CONTAINER selector
             */
            BUTTON_EDIT_PROJECT_NAME:
              'button[data-tooltip-content="Edit Project/Folder Name"]',
            /**
             * Must be used with the result of the BUTTONS.CONTAINER selector
             */
            BUTTON_DELETE_PROJECT_FOLDER:
              'button[data-tooltip-content="Delete Project/Folder"]',
          },
        },
      },
    },
  },
} as const;
