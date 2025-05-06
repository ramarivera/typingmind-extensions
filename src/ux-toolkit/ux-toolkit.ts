import { SELECTORS } from './selectors';
import userEvent from '@testing-library/user-event';

function getAllChatFolderElements() {
  const chatFolderElements = document.querySelectorAll(
    SELECTORS.SIDEBAR.MIDDLE_PART.FOLDERS.CHAT_FOLDER.CONTAINER
  );

  return Array.from(chatFolderElements).map((element) => {
    const buttonElement = element.querySelector(
      SELECTORS.SIDEBAR.MIDDLE_PART.FOLDERS.CHAT_FOLDER.BUTTON_WITH_NAME
    );

    let name: string | undefined = undefined;
    let count: number | undefined = undefined;

    if (buttonElement?.textContent) {
      // Regex: capture name (greedy, up to last space before '('), then number in parentheses at end
      const match = buttonElement.textContent.match(/^(.*)\s*\((\d+)\)\s*$/);
      if (match) {
        name = match[1].trim();
        count = parseInt(match[2], 10);
      } else {
        name = buttonElement.textContent.trim();
      }
    }

    return {
      container: element,
      name,
      count,
      button: buttonElement,
    };
  });
}

// @ts-ignore
function addEventHandlersToChatFolder(chatFolder) {
  const { container, button } = chatFolder;

  const buttonsContainer = container.querySelector(
    SELECTORS.SIDEBAR.MIDDLE_PART.FOLDERS.CHAT_FOLDER.BUTTONS.CONTAINER
  );

  const editFolderNameButton = buttonsContainer?.querySelector(
    SELECTORS.SIDEBAR.MIDDLE_PART.FOLDERS.CHAT_FOLDER.BUTTONS
      .BUTTON_EDIT_PROJECT_NAME
  );

  const handleRightClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (editFolderNameButton) {
      await userEvent.click(editFolderNameButton);
    }
  };

  if (container) {
    container.addEventListener('contextmenu', handleRightClick);
  }

  if (button) {
    button.addEventListener('contextmenu', handleRightClick);
  }
}

window.tmUxToolkit = {
  getAllChatFolderElements,
  addEventHandlersToChatFolder,
};
