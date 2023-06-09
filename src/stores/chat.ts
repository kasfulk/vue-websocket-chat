export const storeChat = (group: string, chats: string) => {
  localStorage.setItem(`chat@${group}`, chats)
}

export const getChat = (group: string) => {
  const chat = localStorage.getItem(`chat@${group}`)
  return JSON.parse(chat as string)
}

export const storeInit = (group: string) => {
  const checkStore = getChat(group)
  if (!checkStore) {
    storeChat(group, '[]')
  }
}
