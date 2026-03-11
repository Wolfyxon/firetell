import { clearChat } from "./chat";

const COMMAND_PREFIX = "/";


export function isCommand(text: string): boolean {
    return text.startsWith(COMMAND_PREFIX);
}

export function execCommand(uid: string, chatId: string, command: string) {
    const split = command.slice(COMMAND_PREFIX.length).split(" ");
    const alias = split[0];
    const args = split.slice(1);

    // TODO: Tidy up if needs expansion

    if(alias == "clear") {
        clearChat(chatId);
    }
}
