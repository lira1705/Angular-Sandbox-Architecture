export interface AnalyticsInterface {
  user: UserInterface
  message: MessageInterface
}

export interface UserInterface {
  total: number
  actived: number
}

export interface MessageInterface {
  received: number
  sent: number
}
