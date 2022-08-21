import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button'
import Reactions from 'src/components/Reactions'
import Time from 'src/components/Time'
import VideoEmbed from 'src/components/VideoEmbed'
import { useIsCurrentUser } from 'src/helpers/hooks'

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideoMutation($id: Int!) {
    deleteVideo(id: $id) {
      id
    }
  }
`

const REACT_TO_VIDEO_MUTATION = gql`
  mutation ReactToVideoMutation($id: Int!, $type: ReactionType!) {
    reactToVideo(id: $id, type: $type) {
      id
      reactions {
        id
        type
        user {
          id
          email
        }
      }
    }
  }
`

const Video = ({ video }) => {
  const isCurrentUser = useIsCurrentUser(video.user)

  const [deleteVideo] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video deleted')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [reactToVideo] = useMutation(REACT_TO_VIDEO_MUTATION)

  const onDeleteClick = (id) => {
    if (confirm(`Are you sure you want to delete video ${id}?`)) {
      deleteVideo({ variables: { id } })
    }
  }

  const onReactionClick = (type) => {
    console.log(type)
    reactToVideo({ variables: { id: video.id, type } })
  }

  return (
    <div>
      <div className="text-xl">{video.title}</div>
      <VideoEmbed video={video} />
      <div>{video.description}</div>
      <div className="text-xs">
        Posted by {video.user.email} on <Time datetime={video.createdAt} />
      </div>
      <Reactions className="mt-4" video={video} onClick={onReactionClick} />
      {isCurrentUser && (
        <div className="mt-4">
          <Button to={routes.editVideo({ id: video.id })}>Edit</Button>
          <Button
            className="ml-2 bg-red-500"
            onClick={() => onDeleteClick(video.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export default Video
