import classnames from 'classnames'

import { ReactionType as Type } from 'src/helpers/Enums'

export const ReactionEmojis = {
  [Type.ThumbsUp]: '👍',
  [Type.ThumbsDown]: '👎',
  [Type.Joy]: '😂',
  [Type.Smiling]: '😊',
  [Type.Rofl]: '🤣',
  [Type.Barf]: '🤮',
  [Type.Crying]: '😭',
  [Type.Grimace]: '😬',
  [Type.HeartEyes]: '😍',
  [Type.Hearts]: '💕',
  [Type.Thinking]: '🤔',
  [Type.Melting]: '🫠',
  [Type.NoHear]: '🙉',
  [Type.NoSee]: '🙈',
  [Type.NoSpeak]: '🙊',
  [Type.PrayerHands]: '🙏',
  [Type.Rocket]: '🚀',
  [Type.Look] : '👀',
  [Type.Angel] : '😇',
  [Type.Nerd] : '🤓',
  [Type.Yawn] : '🥱'
}

export const ReactionList = Object.keys(ReactionEmojis)

export const ReactionEmoji = ({
  type,
  className = '',
  selected = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={classnames(
        'border-1 mr-1 inline-block rounded p-1',
        { 'bg-blue-500': selected },
        className
      )}
    >
      <button onClick={onClick}>{ReactionEmojis[type]}</button>
    </div>
  )
}
