import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { getYouTubeId } from 'src/helpers/url'

import VideoForm from 'src/components/Video/VideoForm'


const CREATE_VIDEO_MUTATION = gql`
  mutation CreateVideoMutation($input: CreateVideoInput!) {
    createVideo(input: $input) {
      id
    }
  }
`

const NewVideo = () => {
  const [createVideo, { loading, error }] = useMutation(CREATE_VIDEO_MUTATION, {
    onCompleted: () => {
      toast.success('Video created')
      navigate(routes.videos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = ({ input: { title, url, description, imageUrl} }) => {
    let ytId = getYouTubeId(url)
    const defaultURL = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    let imgUrl = imageUrl || defaultURL
    createVideo({ variables: { input: { title, url, description, imageUrl: imgUrl} } })
  }

  return (
    <div>
      <VideoForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewVideo
