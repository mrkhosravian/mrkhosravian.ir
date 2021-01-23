import * as React from "react"

export default function SpotifyEmbeddedCode({ src }) {
  return (
    <iframe
      src={src}
      width="300" height="380" frameBorder="0" allowTransparency={true}
      allow="encrypted-media" />
  )
}