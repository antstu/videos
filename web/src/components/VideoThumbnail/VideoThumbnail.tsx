import { getYouTubeId } from 'src/helpers/url'

const VideoThumbnail = ({ width = 480, height = 360, video }) => {
  const { url } = video
  const id = getYouTubeId(url)

  return (
    <div className="bg-black" style={{ width, height }}>
      {id ? (
        <img
          alt={video.title}
          src={video.imageUrl}
        />
      ) : (
        <div>Video url ${video.url} is not supported</div>
      )}
    </div>
  )
}

export default VideoThumbnail
