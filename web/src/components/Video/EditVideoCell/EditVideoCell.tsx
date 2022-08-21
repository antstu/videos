import type { EditVideoById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import VideoForm from 'src/components/Video/VideoForm'

export const QUERY = gql`
  query EditVideoById($id: Int!) {
    video: video(id: $id) {
      id
      url
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`
const UPDATE_VIDEO_MUTATION = gql`
  mutation UpdateVideoMutation($id: Int!, $input: UpdateVideoInput!) {
    updateVideo(id: $id, input: $input) {
      id
      url
      title
      description
      imageUrl
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ video }: CellSuccessProps<EditVideoById>) => {
  const [updateVideo, { loading, error }] = useMutation(UPDATE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video updated')
      navigate(routes.video({ id: video.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (variables) => {
    updateVideo({ variables })
  }

  return (
    <div>
      <h1>
        Edit Video <strong>{video.title}</strong>
      </h1>
      <div className="mt-4">
        <VideoForm
          video={video}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
